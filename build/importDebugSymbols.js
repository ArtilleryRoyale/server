"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Start this script with:
// `./node_modules/.bin/tsc --lib ESNext importDebugSymbols.ts && node importDebugSymbols.js ../code/Assets/Scripts/Common/MethodIdentifier.cs`
require("fs");
const fs_1 = require("fs");
const process_1 = require("process");
const util_1 = require("util");
if (process_1.argv.length != 3) {
    console.log("Usage: " + process_1.argv[1] + " MethodIdentifier.cs");
    process_1.exit(1);
}
function GENERATE_debugIntToMethod(methods) {
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
function GENERATE_debugIntToObject(objects) {
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
function GENERATE_debugStringToMessage(messages) {
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
    let MethodIdentifierFile = process_1.argv[2];
    let fileContent = await util_1.promisify(fs_1.readFile)(MethodIdentifierFile, "utf8");
    let NetworkMessage = /protected const string (NETWORK_MESSAGE_.*);/i;
    let NetworkIdentifier = /protected const int (NETWORK_IDENTIFIER_.*);/i;
    let MethodIdentifier = /public const int (Method_.*);/i;
    let NetworkMessages = [];
    let NetworkIdentifiers = [];
    let MethodIdentifiers = [];
    for (let line of fileContent.split("\n")) {
        let result = null;
        if ((result = NetworkMessage.exec(line)) !== null) {
            let capture = result[1];
            NetworkMessages.push(capture);
        }
        else if ((result = NetworkIdentifier.exec(line)) !== null) {
            let capture = result[1];
            NetworkIdentifiers.push(capture);
        }
        else if ((result = MethodIdentifier.exec(line)) !== null) {
            let capture = result[1];
            MethodIdentifiers.push(capture);
        }
    }
    await util_1.promisify(fs_1.writeFile)('MethodIdentifier.ts', GENERATE_debugStringToMessage(NetworkMessages) +
        GENERATE_debugIntToMethod(MethodIdentifiers) +
        GENERATE_debugIntToObject(NetworkIdentifiers));
    console.log("The file has been generated :)");
    process_1.exit(0);
}
main();
