import { callModel } from "./callModel.js";

async function main() {
    try {
        const response = await callModel({
            user: "Explain what prompt engineering is in two sentences.",
            system: "You are a helpful assistant that provides clear and concise explanations."
        });

        console.log(response);

    } catch (error) {
        console.error("Error:", error.message);
    }
};

main();