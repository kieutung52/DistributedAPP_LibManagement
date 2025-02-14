const GATEWAY_URL = "http://localhost:8081";

export async function createTransaction(userId, bookId, startDate, dueDate, status, borrowStatus) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId, bookId, startDate, dueDate, status, borrowStatus})
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function getAllTransaction() {
    const resp = await fetch(`${GATEWAY_URL}/transaction/all`, {
        method: "GET"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function getTransactionById(transactionId) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}`, {
        method: "GET"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function editTransactionById(transactionId, userId, bookId, startDate, dueDate,  status, borrowStatus) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId, bookId, startDate, dueDate, status, borrowStatus})
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json();
}

export async function deleteTransactionById(transactionId) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return resp;
}

export async function acceptTransaction(transactionId) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}/accept`, {
        method: "PUT"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp;
}

export async function cancelTransaction(transactionId) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}/cancel`, {
        method: "PUT"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp;
}

export async function returnBook(transactionId) {
    const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}/returnbook`, {
        method: "PUT"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp;
}