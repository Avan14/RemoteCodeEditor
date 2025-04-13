"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = executeCode;
/**
 * Stub: execute the given code payload.
 * Replace with real remote‑execution logic.
 */
async function executeCode(req) {
    // Example dummy implementation:
    return {
        stdout: `Received ${req.files.length} file(s) for ${req.language}@${req.version}`,
        stderr: "",
        exitCode: 0,
    };
}
