## PUT /api/products/{id}

**Programming Language:** Java (Spring Boot)

**Description:** Updates an existing product's details in the local memory store based on the provided product ID.

---

### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Long | Yes | The unique identifier of the product to update. |
| updatedProduct | Object | Yes | The JSON body containing the new product data. |

---

### Request Example
```json
{
  "id": 1,
  "name": "Gaming Laptop",
  "price": 1299.99
}
```

### Response Examples

**200 OK**
```json
"Product updated successfully!"
```

**404 Not Found**
```json
"Product not found."
```

---

### Business Rules
- The update operation replaces the entire product object at the specified index with the object provided in the request body.
- If the provided ID does not match any existing product in the `productList`, the system returns a 404 status.
- This operation modifies an in-memory list; changes are not persisted to a database and will be lost if the application restarts.