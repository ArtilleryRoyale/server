// Start this script with:
// `./node_modules/.bin/tsc --lib ESNext importDebugSymbols.ts && node importDebugSymbols.js ../code/Assets/Scripts/Common/MethodIdentifier.cs`
import 'fs';
import { readFile, writeFile } from 'fs';
import { argv, exit } from 'process';
import { promisify } from 'util';

if (argv.length != 3) {
    console.log("Usage: " + argv[1] + " MethodIdentifier.cs");
    exit(1);
}

function GENERATE_debugIntToMethod(methods: string[]) : string {
    let generate = `
export function debugIntToMethod(i: number) : string {
    switch(i) {
        case -1: return "METHOD_DESTROY";
`;
    for (let line of methods) {
        let s = line.split('=');
        let name = s[0].trim();
        let value = s[1].trim();
        generate += `        case ${value}: return "${name}";\n`;
    }
    return generate + `        default: return "‼️⁉️ (" + i + ")";
    }
}
`;
}

function GENERATE_debugIntToObject(objects: string[]) : string {
    let generate = `
export function debugIntToObject(i: number) : string {
    switch (i) {
`;
    for (let line of objects) {
        let s = line.split('=');
        let name = s[0].trim();
        let value = s[1].trim();
        generate += `        case ${value}: return "${name}";\n`;
    }
    return generate + `        default: return "NetworkObject id: " + i;
    }
}
`;
}

function GENERATE_debugStringToMessage(messages: string[]) : string {
    let generate = `
export function debugStringToMessage(s: string) : string {
`;
    for (let line of messages) {
        let s = line.split('=');
        let name = s[0].trim();
        let value = s[1].trim();
        generate += `    if (s == ${value}) return "${name}";\n`;
    }
    return generate + `    return s;
}
`;
}

async function main() {

    let MethodIdentifierFile = argv[2];
    let fileContent = await promisify(readFile)(MethodIdentifierFile, "utf8");
    let NetworkMessage = /protected const string (NETWORK_MESSAGE_.*);/i;
    let NetworkIdentifier = /protected const int (NETWORK_IDENTIFIER_.*);/i;
    let MethodIdentifier = /public const int (Method_.*);/i;
    let NetworkMessages : string[] = [];
    let NetworkIdentifiers : string[] = [];
    let MethodIdentifiers : string[] = [];
    for (let line of fileContent.split("\n")) {
        let result = null;
        if ((result = NetworkMessage.exec(line)) !== null) {
            let capture = result[1];
            NetworkMessages.push(capture);
        } else if ((result = NetworkIdentifier.exec(line)) !== null) {
            let capture = result[1];
            NetworkIdentifiers.push(capture);
        } else if ((result = MethodIdentifier.exec(line)) !== null) {
            let capture = result[1];
            MethodIdentifiers.push(capture);
        }
    }
    await promisify(writeFile)('MethodIdentifier.ts',
        GENERATE_debugStringToMessage(NetworkMessages) +
        GENERATE_debugIntToMethod(MethodIdentifiers) +
        GENERATE_debugIntToObject(NetworkIdentifiers)
    );
    console.log("The file has been generated :)");
    exit(0);
}

main();
