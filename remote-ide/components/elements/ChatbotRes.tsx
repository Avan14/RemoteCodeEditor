
import axios from "axios";

const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
const API_KEY = "AIzaSyBCVruyIS0egMeoZOOMiqbexLHOavEau8c"; // Replace with your actual API key

export const fetchAIResponse = async ({ prompt }: { prompt: string }) => {
  console.log("in");
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
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
  } catch (error) {
    return error;
  }
};
