// src/executor.ts
export interface FilePayload {
  content: string;
}

export interface ExecuteRequest {
  language: string;
  version: string;
  files: FilePayload[];
}

/**
 * Stub: execute the given code payload.
 * Replace with real remote‑execution logic.
 */
export async function executeCode(req: ExecuteRequest): Promise<{
  stdout: string;
  stderr: string;
  exitCode: number;
}> {
  // Example dummy implementation:
  return {
    stdout: `Received ${req.files.length} file(s) for ${req.language}@${req.version}`,
    stderr: "",
    exitCode: 0,
  };
}
