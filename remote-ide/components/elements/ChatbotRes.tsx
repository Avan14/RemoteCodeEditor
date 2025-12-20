
import axios from "axios";

const api_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
const api_KEY = "AIzaSyBCVruyIS0egMeoZOOMiqbexLHOavEau8c"; // Replace with your actual api key

export const fetchAIResponse = async ({ prompt }: { prompt: string }) => {
  console.log("in");
  try {
    const response = await axios.post(
      `${api_URL}?key=${api_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    return response.data.candidates[0].content.parts[0].text;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 429) {
        return "Rate limit reached . Please wait a bit and try again.";
      }

      const apiMessage =
        (error.response?.data as any)?.error?.message ||
        (error.response?.data as any)?.message;
      return `Request failed${status ? ` (${status})` : ""}: ${apiMessage || error.message}`;
    }

    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }

    return "Error: Unknown error occurred.";
  }
};
