const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function getATSScore(resumeText) {
  const contents = `
    You are an ATS system. Analyze this resume and:
    1. Infer the most likely job role this resume applies to.
    2. Compare the resume to typical job requirements for that role.
    3. Return a single ATS score (0-100) indicating how well the resume is optimized.

    Resume:
    ${resumeText}

    Only return a number as the ATS score:
    eg- 45
`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });

  const text = result.candidates[0].content.parts[0].text;

  const scoreMatch = text.match(/ATS Score[\s\S]*?(\d{1,3})/i);
  console.log(scoreMatch);
  return scoreMatch[1];
}

async function filterData(text) {
  const contents = `
    send clean text of the below text
    ${text}
  `;

  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });

  const ftext = result.candidates[0].content.parts[0].text;
  return ftext;
}

module.exports = { getATSScore, genAI, filterData };
