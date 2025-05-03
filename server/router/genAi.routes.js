import { GoogleGenAI } from "@google/genai";

export const genAi = async (req, res) => {

    const {question} = req.body //get the question from the req.body

    const ai = new GoogleGenAI({ apiKey: process.env.GENAIAPIKEY });
    async function main() {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: question
        });

        return res.status(201).send({
            Answer: response.text
        })
    }

    await main();


}


/*
Source: https://ai.google.dev/gemini-api/docs/text-generation?lang=node

Get Gemini API Key
Source: https://aistudio.google.com/

How to Create a Project in Google
Source: https://console.cloud.google.com

create the project, get the API, check the curl if it is working or not, then import the genAI libreray and then copy paste
the sourse code into the nodejs API and then get the response.
*/