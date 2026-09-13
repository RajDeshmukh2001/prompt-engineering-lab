/*
    Exercise 3: React Component Generation
    Goal: Generate React + TypeScript components. Practice output format control and testing that generated code actually works.
    Test the follow-ups in the same conversation and observe: 
    - Does the model maintain consistency across turns? 
    - Does each iteration break something the previous one got right? 
    - Context window and conversation history affects multi-turn code generation.
*/

import { callModel } from "../callModel.js";

const SYSTEM_PROMPT = `You are a senior React developer
    Uses TypeScript and Tailwind CSS. 
    Write production-quality functional components using hooks.

    STANDARDS:
    - TypeScript interfaces for all props
    - Proper loading, error, and empty states
    - Accessible HTML (correct aria labels, semantic tags)
    - Tailwind for all styling — no inline styles, no CSS files
    - Components must be self-contained — no external dependencies beyond React and Tailwind

    OUTPUT FORMAT:
    \`\`\`tsx
    <complete component code>
    \`\`\`

    USAGE EXAMPLE:
    \`\`\`tsx
    <how to use this component>
    \`\`\`
`;

let previousInteractionId;

const response = await callModel({
    user: `Create a UserCard component that displays:
    - User avatar (first letter of name if no image)
    - User name and email
    - A status badge (active = green, inactive = grey)
    - A "View Profile" button

    Props: name, email, status ('active' | 'inactive'), avatarUrl? (optional)`,

    system: SYSTEM_PROMPT,
    temperature: 0.2,
    maxTokens: 1000
});

console.log("\nTURN 1: CREATE COMPONENT");
console.log(response.text);

previousInteractionId = response.interactionId;