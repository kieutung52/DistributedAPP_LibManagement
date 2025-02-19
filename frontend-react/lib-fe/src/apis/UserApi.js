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

export async function createUser(username, password, name, address, email) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, name, address, email})
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to create user: " + error.message);
    }
}

export async function loginUser(username, password) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to login: " + error.message);
    }
}

export async function getAllUser() {
    try {
        const resp = await fetch(`${GATEWAY_URL}/user/all`, {
            method: "GET"
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to get all user: " + error.message);
    }
    /*output: [{"id":1,"username":"kieutung123","password":"05022004","name":"K.Tung","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"},{"id":2,"username":"kieutung","password":"05022004","name":"kieu_tung","address":"Ha noi","email":"kieutungg@gmail.com","role":"admin"},{"id":5,"username":"testuser1","password":"05022004","name":"KT","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"}] */
}

export async function getUserById(userId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/user/${userId}`, {
            method: "GET"
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to get user by ID: " + error.message);
    }
    // output:{"id":1,"username":"kieutung123","password":"05022004","name":"K.Tung","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"}
}

export async function editUserById(userId, name, address, email, role) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, address, email, role})
        });
        return handleResponse(resp);
    } catch (error) {
        throw new Error("Failed to edit user: " + error.message);
    }  
}

export async function deleteUserById(userId) {
    try {
        const resp = await fetch(`${GATEWAY_URL}/user/${userId}`, {
            method: "DELETE"
        });
        return resp;
    } catch (error) {
        throw new Error("Failed to delete user: " + error.message);
    }
}