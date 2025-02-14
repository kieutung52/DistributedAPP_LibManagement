const GATEWAY_URL = "http://localhost:8081";

export async function createBook(isbn, title, author, publisher, year, quantity) {
    const resp = await fetch(`${GATEWAY_URL}/book/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({isbn, title, author, publisher, year, quantity})
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function getAllBook() {
    const resp = await fetch(`${GATEWAY_URL}/book/all`, {
        method: "GET"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function getBookById(bookId) {
    const resp = await fetch(`${GATEWAY_URL}/book/${bookId}`, {
        method: "GET"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}
export async function editBookById(bookId, isbn, title, author, publisher,  year, quantity) {
    const resp = await fetch(`${GATEWAY_URL}/book/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({isbn, title, author, publisher, year, quantity})
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function deleteBookById(bookId) {
    const resp = await fetch(`${GATEWAY_URL}/book/${bookId}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return resp;
}