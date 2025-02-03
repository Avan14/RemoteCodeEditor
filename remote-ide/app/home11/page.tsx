"use client";
import { useState } from "react";
import axios from "axios";

const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
const API_KEY = "AIzaSyBCVruyIS0egMeoZOOMiqbexLHOavEau8c"; // Replace with your actual API key

const Home = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async () => {
    console.log("in");
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: "Explain how AI works" }],
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

      setResponse(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchAIResponse} disabled={loading}>
        {loading ? "Loading..." : "Get AI Response"}
      </button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default Home;
