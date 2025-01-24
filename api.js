const host = -'https://wedev-api.sky.pro/api/v2/todos'
export let token = ''
//const token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'
const authToken = 'https://wedev-api.sky.pro/api/user'

export const updateToken = (newToken) => {
    token = newToken
}

export function getTodos() {
    return fetch('https://wedev-api.sky.pro/api/v2/todos', {
        method: 'GET',
        headers: {
            Authorization: ` Bearer ${token}`,
        },
    }).then((response) => {
        return response.json()
    })
}

export function postTodo({ text }) {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    }).then((response) => {
        return response.json()
    })
}

export function login({ login, password }) {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json()
    })
}

export function registration({ login, password }) {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name: login,
        }),
    }).then((response) => {
        return response.json()
    })
}
