"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Start this script with:
// `./node_modules/.bin/tsc --lib ESNext importDebugSymbols.ts && node importDebugSymbols.js ../code/Assets/Scripts/Common/MethodIdentifier.cs`
require("fs");
var fs_1 = require("fs");
var process_1 = require("process");
var util_1 = require("util");
if (process_1.argv.length != 3) {
    console.log("Usage: " + process_1.argv[1] + " MethodIdentifier.cs");
    process_1.exit(1);
}
function GENERATE_debugIntToMethod(methods) {
    var generate = "\nexport function debugIntToMethod(i: number) : string {\n    switch(i) {\n        case -1: return \"METHOD_DESTROY\";\n";
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var line = methods_1[_i];
        var s = line.split('=');
        var name = s[0].trim();
        var value = s[1].trim();
        generate += "        case " + value + ": return \"" + name + "\";\n";
    }
    return generate + "        default: return \"\u203C\uFE0F\u2049\uFE0F (\" + i + \")\";\n    }\n}\n";
}
function GENERATE_debugIntToObject(objects) {
    var generate = "\nexport function debugIntToObject(i: number) : string {\n    switch (i) {\n";
    for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
        var line = objects_1[_i];
        var s = line.split('=');
        var name = s[0].trim();
        var value = s[1].trim();
        generate += "        case " + value + ": return \"" + name + "\";\n";
    }
    return generate + "        default: return \"NetworkObject id: \" + i;\n    }\n}\n";
}
function GENERATE_debugStringToMessage(messages) {
    var generate = "\nexport function debugStringToMessage(s: string) : string {\n";
    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
        var line = messages_1[_i];
        var s = line.split('=');
        var name = s[0].trim();
        var value = s[1].trim();
        generate += "    if (s == " + value + ") return \"" + name + "\";\n";
    }
    return generate + "    return s;\n}\n";
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var MethodIdentifierFile, fileContent, NetworkMessage, NetworkIdentifier, MethodIdentifier, NetworkMessages, NetworkIdentifiers, MethodIdentifiers, _i, _a, line, result, capture, capture, capture;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    MethodIdentifierFile = process_1.argv[2];
                    return [4 /*yield*/, util_1.promisify(fs_1.readFile)(MethodIdentifierFile, "utf8")];
                case 1:
                    fileContent = _b.sent();
                    NetworkMessage = /protected const string (NETWORK_MESSAGE_.*);/i;
                    NetworkIdentifier = /protected const int (NETWORK_IDENTIFIER_.*);/i;
                    MethodIdentifier = /public const int (Method_.*);/i;
                    NetworkMessages = [];
                    NetworkIdentifiers = [];
                    MethodIdentifiers = [];
                    for (_i = 0, _a = fileContent.split("\n"); _i < _a.length; _i++) {
                        line = _a[_i];
                        result = null;
                        if ((result = NetworkMessage.exec(line)) !== null) {
                            capture = result[1];
                            NetworkMessages.push(capture);
                        }
                        else if ((result = NetworkIdentifier.exec(line)) !== null) {
                            capture = result[1];
                            NetworkIdentifiers.push(capture);
                        }
                        else if ((result = MethodIdentifier.exec(line)) !== null) {
                            capture = result[1];
                            MethodIdentifiers.push(capture);
                        }
                    }
                    return [4 /*yield*/, util_1.promisify(fs_1.writeFile)('MethodIdentifier.ts', GENERATE_debugStringToMessage(NetworkMessages) +
                            GENERATE_debugIntToMethod(MethodIdentifiers) +
                            GENERATE_debugIntToObject(NetworkIdentifiers))];
                case 2:
                    _b.sent();
                    console.log("The file has been generated :)");
                    process_1.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
main();
