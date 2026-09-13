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

    MULTI-TURN REQUIREMENTS:
    - Treat follow-up requests as modifications to the previously generated component.
    - Preserve all existing functionality unless explicitly asked to change or remove it.
    - Return the complete updated component after every modification.
    - Never replace existing code with placeholders, ellipses, or comments such as "...existing logic".
    - Re-check previous requirements before generating each updated version.

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

const secondResponse = await callModel({
    user: `Add a loading skeleton state that shows while the user data loads.`,
    system: SYSTEM_PROMPT,
    previousInteractionId,
    temperature: 0.2,
    maxTokens: 1500
});

console.log("TURN 2: ADD LOADING STATE");
console.log(secondResponse.text);

previousInteractionId = secondResponse.interactionId;

const thirdResponse = await callModel({
    user: `Make the card clickable — the whole card should be a link, not just the button`,
    system: SYSTEM_PROMPT,
    previousInteractionId,
    temperature: 0.2,
    maxTokens: 1500,
});

console.log("TURN 3: MAKE CARD CLICKABLE");
console.log(thirdResponse.text);

previousInteractionId = thirdResponse.interactionId;

const fourthResponse = await callModel({
    user: `Add an onDelete callback prop that shows a confirmation before deleting.
    Preserve all existing functionality and accessibility.`,
    system: SYSTEM_PROMPT,
    previousInteractionId,
    temperature: 0.2,
    maxTokens: 2000
});

console.log("TURN 4: ADD DELETE FUNCTIONALITY");
console.log(fourthResponse.text);