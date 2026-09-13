/* 
    Exercise 2: Java Code Generation
    Goal: Generate production-quality Java code. Practice role prompting, few-shot examples, and verifying output correctness.
*/

import { main } from "../main.js";

// Zero-Shot Baseline
main({
    user: "Write a Java method to find duplicate emails in a list of users",
});

// Role + Context, No Examples
main({
    user: `Write a method that takes a List<User> and returns a List<String> containing only the email addresses that appear more than once.
    The User class has: String id, String name, String email.`,
    system: `You are a senior Java developer specialising in Spring Boot applications.
    Write clean, production-ready Java code using Java 17+ features.
    Always handle null inputs.
    Prefer streams over loops for collection operations.`,
});

// Add Few-Shot Examples
const SYSTEM_PROMPT = `You are a senior Java developer specialising in Spring Boot applications. 
    Write clean, production-ready Java 17+ code.
    Always handle null inputs.
    Use streams over loops.

    WHEN REQUIREMENTS ARE AMBIGUOUS:
    - Make reasonable assumptions based on standard Java and Spring Boot practices.
    - Do not invent unnecessary requirements.
    - Clearly state important assumptions or design decisions.
    - Ask for clarification only when the missing information makes a correct implementation impossible.

    OUTPUT FORMAT:
    \`\`\`java
    // Brief comment explaining the approach
    <your code>
    \`\`\`

    COMPLEXITY NOTE: <time and space complexity>
    EDGE CASES HANDLED: <list what you handled>
    ASSUMPTIONS: <any assumptions you made, or "None">

    EXAMPLES OF THE STYLE I WANT:
    Example request: "Filter active users from a list"
    Example output:
    \`\`\`java
    // Filter non-null active users using stream
    public List<User> getActiveUsers(List<User> users) {
        if (users == null || users.isEmpty()) {
            return Collections.emptyList();
        }
        return users.stream()
            .filter(Objects::nonNull)
            .filter(User::isActive)
            .collect(Collectors.toList());
    }
    \`\`\`
    COMPLEXITY NOTE: O(n) time, O(n) space
    EDGE CASES HANDLED: null list, empty list, null elements in list`
;

main({
    user: `Write a method that takes a List<User> and returns a List<String> containing only the email addresses that appear more than once.
    User class: String id, String name, String email (can be null).`,
    system: SYSTEM_PROMPT,
    temperature: 0.2,
});

main({
    user: `Write a method to group users by their email domain.
    User class: String id, String name, String email (can be null).`,
    system: SYSTEM_PROMPT,
    temperature: 0.4,
});

main({
    user: `Write a method to find the most recently updated user.
    User class: String id, String name, String email, LocalDateTime created_at, LocalDateTime updated_at (PrePersist with LocalDateTime.now()).`,
    system: SYSTEM_PROMPT,
    temperature: 0.6,
});

main({
    user: `Write a Spring Boot @Service method that calls a repository and handles EntityNotFoundException`,
    system: SYSTEM_PROMPT,
    temperature: 0.8,
});