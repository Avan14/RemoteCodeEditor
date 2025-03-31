import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const ExecuteCodeAPI = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

type Language = keyof typeof LANGUAGE_VERSIONS;

export const ExecuteCode = async (
  language: Language,
  SourceCode: string,
  seterror: any
) => {
  try {
    if (!LANGUAGE_VERSIONS[language]) {
      throw new Error("Unsupported language selected.");
    }

    const response = await ExecuteCodeAPI.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: SourceCode }],
    });
    return response.data.run.stdout || response.data.run.stderr || "No output.";
  } catch (error: any) {
    return `Error: ${error.response?.data?.message || error.message}`;
  }
};
