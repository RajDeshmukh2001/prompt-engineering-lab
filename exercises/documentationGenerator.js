/*
    Exercise 5: Documentation Generation
    Goal: Generate clear developer documentation from code. Practice structured output, technical accuracy, and format consistency.
*/

import { main } from "../main.js";

const SYSTEM_PROMPT = `You are a technical writer creating developer documentation for backend REST APIs.

    DOCUMENTATION STANDARDS:
    - Use clear and concise language suitable for developers.
    - List all parameters with their types, descriptions, and whether required or optional
    - Show a realistic request example (use realistic data, not "string" or "123")
    - Show response examples for both success and error cases
    - Note any important business rules or side effects
    - Document only the HTTP status codes that are actually returned by the provided code snippet.
    - Document only behavior supported by the provided code.
    - Do not invent validation rules, authentication requirements, parameters, or business rules.
    - If required information cannot be determined from the code, explicitly state the assumption.
    
    OUTPUT FORMAT: Markdown, this exact structure:
    ## HTTP_METHOD /endpoint

    **Programming Language:** <programming language used in the code snippet>

    **Description:** <one liner>

    ---

    ### Parameters (If any)
    | Name | Type | Required | Description |
    |------|------|----------|-------------|

    ---

    ### Request Example
    \`\`\`json
    ...
    \`\`\`

    ### Response Examples

    **status code**
    \`\`\`json
    ...
    \`\`\`

    **status code**
    \`\`\`json
    ...
    \`\`\`

    ---

    ### Business Rules
    - <rule 1>
    - <rule 2>
`;

const USER_PROMPT = `Generate API documentation for this Spring Boot controller method:

    \`\`\`java
    @RestController
    @RequestMapping("/api/products")
    public class ProductController {
        private final List<Product> productList = new ArrayList<>();

        public ProductController() {
            productList.add(new Product(1L, "Laptop", 999.99));
            productList.add(new Product(2L, "Smartphone", 499.99));
        }

        // PUT - Update an existing product
        @PutMapping("/{id}")
        public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
            for (int i = 0; i < productList.size(); i++) {
                if (productList.get(i).id().equals(id)) {
                    productList.set(i, updatedProduct);
                    return ResponseEntity.ok("Product updated successfully!");
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        }
    }
    \`\`\`
`;

main({
    user: USER_PROMPT,
    system: SYSTEM_PROMPT,
});