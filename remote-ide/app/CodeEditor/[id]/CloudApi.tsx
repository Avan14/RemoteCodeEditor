import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

// const BASE_URL = process.env.CLOUD_URL as string;

type Language = keyof typeof LANGUAGE_VERSIONS;

  const ExecuteCode = async (
  language: Language,
  SourceCode: string,
) => {
    console.log("hi");
    // console.log(BASE_URL);
  try {
    console.log(SourceCode);
    const response = await axios.post( "http://143.110.245.12:3000/run", {
        code: SourceCode,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

    return response.data.output || response.data.error || "No output.";
  } catch (error: any) {
    return `Error: ${error.response?.data?.message || error.message}`;
  }
};
 

 export default  ExecuteCode;