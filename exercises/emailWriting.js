/*
    Exercise 4: Email Writing
    Goal: Generate professional emails. Practice tone control via temperature, template variables, and output that humans actually want to use. Compare how robotic the emails sound at low temp vs natural and varied at high temp.
*/

import { main } from "../main.js";

const SYSTEM_PROMPT = `You are a professional business communications specialist helping employees write effective workplace emails.

    TONE GUIDE:
    - formal: senior stakeholder, executive, client communication
    - professional: colleague, manager, partner communication
    - friendly: peer, teammate, casual communication

    RULES:
    - Subject line should be specific and action oriented
    - Opening line should not start with "I hope this email finds you well"
    - Get to the point in the first two sentences
    - One clear call to action at the end of the email
    - No more than 150 words for routine emails

    OUTPUT FORMAT:
    Subject: <subject line>
    Body: <email body>
`;

const USER_PROMPT = `Write a {{tone}} email for this situation:
    Situation: {{situation}}
    Recipient: {{recipient}}
    Key point to convey: {{keyPoint}}
    Desired action: {{desiredAction}}
`;

// Tests for all three tones
const testCases = [
    {
        tone: 'formal',
        situation: 'Requesting a 2-week deadline extension on a project deliverable',
        recipient: 'Client (enterprise banking company)',
        keyPoint: 'Technical complexity was higher than estimated',
        desiredAction: 'Approve the new deadline of March 15th'
    },
    {
        tone: 'professional',
        situation: 'Following up after a job interview that happened 5 days ago',
        recipient: 'Hiring manager at a product company',
        keyPoint: 'Still very interested in the role, checking on timeline',
        desiredAction: 'Get an update on the hiring decision timeline'
    },
    {
        tone: 'friendly',
        situation: 'Asking a teammate to review a pull request by end of day',
        recipient: 'Senior developer on the same team',
        keyPoint: 'PR is blocking another feature from being merged',
        desiredAction: 'Review and approve or comment on PR #247 today'
    }
];

function buildEmailPrompt(testCase) {
    return USER_PROMPT
        .replace("{{tone}}", testCase.tone)
        .replace("{{situation}}", testCase.situation)
        .replace("{{recipient}}", testCase.recipient)
        .replace("{{keyPoint}}", testCase.keyPoint)
        .replace("{{desiredAction}}", testCase.desiredAction)
};

async function generateEmail() {
    for (const testCase of testCases) {
        console.log('\n' + '='.repeat(60));
        console.log('TONE:', testCase.tone.toUpperCase());
        console.log('='.repeat(60));

        await main({
            user: buildEmailPrompt(testCase),
            system: SYSTEM_PROMPT,
            temperature: 1,
            maxTokens: 500,
        });
    }
};

generateEmail();