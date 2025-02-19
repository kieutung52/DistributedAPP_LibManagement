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

export async function createTransaction(userId, bookId, startDate, dueDate, status, borrowStatus) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, bookId, startDate, dueDate, status, borrowStatus})
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to create transaction: " + error.message);
    }
}

export async function getAllTransaction() {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/all`, {
            method: "GET"
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to get all transaction: " + error.message);
    }
}

export async function getTransactionById(transactionId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}`, {
            method: "GET"
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to get transaction by ID: " + error.message);
    }
}

export async function editTransactionById(transactionId, userId, bookId, startDate, dueDate,  status, borrowStatus) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, bookId, startDate, dueDate, status, borrowStatus})
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to edit transaction: " + error.message);
    }
}

export async function deleteTransactionById(transactionId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}`, {
            method: "DELETE"
        });
        return resp;
    } catch (error) {
        throw new Error("Failed to delete transaction: " + error.message);
    }
}

export async function acceptTransaction(transactionId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}/accept`, {
            method: "PUT"
        });
        return resp;
    } catch (error) {
        throw new Error("Failed to accept transaction: " + error.message);
    }
}

export async function cancelTransaction(transactionId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}/cancel`, {
            method: "PUT"
        });
        return resp;
    } catch (error) {
        throw new Error("Failed to cancel transaction: " + error.message);
    }
}

export async function returnBook(transactionId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/transaction/${transactionId}/returnbook`, {
            method: "PUT"
        });
        return resp;
    } catch (error) {
        throw new Error("Failed to return transaction: " + error.message);
    }
}