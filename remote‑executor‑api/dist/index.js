"use strict";
// index.js
const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const app = express();
app.use(express.json());
/**
 * Map file extension to the shell command.
 * Extend this as needed.
 */
function getInterpreter(ext) {
    switch (ext) {
        case 'js': return 'node';
        case 'py': return 'python3';
        case 'sh': return 'bash';
        case 'rb': return 'ruby';
        // add more languages here…
        default:
            throw new Error(`Unsupported extension: .${ext}`);
    }
}
app.post('/execute', (req, res) => {
    const { extension, content } = req.body;
    if (!extension || typeof content !== 'string') {
        return res.status(400).json({ error: '`extension` and `content` are required.' });
    }
    const scriptName = `script.${extension}`;
    const logName = `output.${extension}`;
    try {
        // 1) Write the script file
        fs.writeFileSync(scriptName, content, 'utf8');
        // 2) Build the command
        const interpreter = getInterpreter(extension);
        const cmd = `${interpreter} ${scriptName}`;
        // 3) Execute
        exec(cmd, (err, stdout, stderr) => {
            // 4) Write logs
            const combined = [
                '=== STDOUT ===',
                stdout,
                '=== STDERR ===',
                stderr
            ].join('\n');
            fs.writeFileSync(logName, combined, 'utf8');
            // 5) Return JSON
            res.json({
                script: scriptName,
                log: logName,
                stdout,
                stderr,
                error: err ? err.message : null
            });
        });
    }
    catch (e) {
        console.error(e);
        //@ts-ignore
        res.status(500).json({ error: e.message || " " });
    }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Listening on port ${PORT}`);
});
