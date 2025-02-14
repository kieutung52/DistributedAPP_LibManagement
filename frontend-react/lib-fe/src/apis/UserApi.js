const GATEWAY_URL = "http://localhost:8081";

export async function createUser(username, password, name, address, email) {
    const resp = await fetch(`${GATEWAY_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name, address, email})
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json(); // output:{"status":"success","message":"Đăng ký thành công","data":{"id":5,"username":"testuser1","password":"05022004","name":"KT","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"}}
}

export async function loginUser(username, password) {
    const resp = await fetch(`${GATEWAY_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    const data = await resp.json();
    return data;
}

export async function getAllUser() {
    const resp = await fetch(`${GATEWAY_URL}/user/all`, {
        method: "GET"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json(); 
    /*output: [{"id":1,"username":"kieutung123","password":"05022004","name":"K.Tung","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"},{"id":2,"username":"kieutung","password":"05022004","name":"kieu_tung","address":"Ha noi","email":"kieutungg@gmail.com","role":"admin"},{"id":5,"username":"testuser1","password":"05022004","name":"KT","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"}] */
}

export async function getUserById(userId) {
    const resp = await fetch(`${GATEWAY_URL}/user/${userId}`, {
        method: "GET"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return await resp.json(); // output:{"id":1,"username":"kieutung123","password":"05022004","name":"K.Tung","address":"Ha Noi","email":"kieutungg@gmail.com","role":"user"}
}

export async function editUserById(userId, name, address, email, role) {

    const resp = await fetch(`${GATEWAY_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, address, email, role})
    });

    if (!resp.ok){
        throw new Error(await resp.text());
    }
    return await resp.json();    
}

export async function deleteUserById(userId) {
    const resp = await fetch(`${GATEWAY_URL}/user/${userId}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    return resp; // Không cần .json()
}