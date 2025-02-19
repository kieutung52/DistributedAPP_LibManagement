const GATEWAY_URL = "http://localhost:8081";

async function handleResponse(resp) {
    if (!resp.ok) {
      let errorMessage = "An unexpected error occurred.";
      try {
          const errorText = await resp.text();
          errorMessage = errorText || errorMessage;
      } catch (parseError) {
      }
      throw new Error(errorMessage);
    }
    return resp.json();
}

export async function createBook(isbn, title, author, publisher, year, quantity) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/book/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isbn, title, author, publisher, year, quantity})
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to create book: " + error.message);
    }
}

export async function getAllBook() {
    try {
        const resp = await fetch(`${GATEWAY_URL}/book/all`, {
            method: "GET"
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to get all book: " + error.message);
    }
}

export async function getBookById(bookId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/book/${bookId}`, {
            method: "GET"
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to get book by ID: " + error.message);
    }
}
export async function editBookById(bookId, isbn, title, author, publisher,  year, quantity) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/book/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isbn, title, author, publisher, year, quantity})
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to edit book: " + error.message);
    }
}

export async function deleteBookById(bookId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/book/${bookId}`, {
            method: "DELETE"
        });
        return resp;
    } catch (error) {
        throw new Error("Failed to delete book: " + error.message);
    }
}