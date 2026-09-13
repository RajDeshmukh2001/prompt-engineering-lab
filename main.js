import { callModel } from "./callModel.js";

export async function main({ user, system = "", temperature = 0.7, maxTokens = 1000 }) {
    try {
        const response = await callModel({
            user,
            system,
            temperature,
            maxTokens,
        });

        console.log(response);

    } catch (error) {
        console.error("Error:", error.message);
    }
};