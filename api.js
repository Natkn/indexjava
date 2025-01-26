const host = 'https://wedev-api.sky.pro/api/v2/todos'
const authLogin = 'https://wedev-api.sky.pro/api/user/login'
const authToken = 'https://wedev-api.sky.pro/api/user'

let token = localStorage.getItem('token') || ''

export const getToken = () => token
export const updateToken = (newToken) => {
    token = newToken
    localStorage.setItem('token', newToken)
}

export function getTodos() {
    return fetch(host, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => response.json())
}

export async function login({ login, password }) {
    try {
        const response = await fetch(authLogin, {
            method: 'POST',
            body: JSON.stringify({ login, password }),
        })
        if (!response.ok) {
            const errorData = await response.json()
            console.error('Ошибка при авторизации:', errorData)
            throw new Error(errorData.message || 'Ошибка при авторизации')
        }
        const data = await response.json()
        updateToken(data.token)
        return data
    } catch (error) {
        console.error('Ошибка при авторизации:', error)
        throw error
    }
}

export async function registration({ login, password }) {
    try {
        const response = await fetch(authToken, {
            method: 'POST',
            body: JSON.stringify({ login, password, name: login }),
        })
        if (!response.ok) {
            const errorData = await response.json()
            console.error('Ошибка при регистрации:', errorData)
            throw new Error(errorData.message || 'Ошибка при регистрации')
        }
        const data = await response.json()
        updateToken(data.token)
        return data
    } catch (error) {
        console.error('Ошибка при регистрации:', error)
        throw error
    }
}

export async function postTodo({ text, author }) {
    const token = getToken()

    try {
        const response = await fetch(host, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text: text, author }),
        })
        if (!response.ok) {
            let errorMessage = 'Ошибка при отправке комментария'
            try {
                const errorData = await response.json()
                if (errorData && errorData.error) {
                    errorMessage = errorData.error
                } else if (errorData && errorData.message) {
                    errorMessage = errorData.message
                }
            } catch (jsonError) {
                console.error('Ошибка парсинга JSON ответа:', jsonError)
            }
            console.error('Ошибка при отправке комментария:', errorMessage)
            throw new Error(errorMessage)
        }
        const data = await response.json()

        return data
    } catch (error) {
        console.error('Ошибка в postTodo:', error)
        throw error
    }
}

export async function fetchAndRenderComments() {
    try {
        const response = await fetch(host, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
        if (!response.ok) {
            const errorData = await response.json()
            let errorMessage = 'Ошибка при получении комментариев: '
            if (errorData && errorData.message) {
                errorMessage += errorData.message
            } else {
                errorMessage += 'Неизвестная ошибка'
            }
            alert(errorMessage)
        }
        const data = await response.json()

        return data
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error)
    }
}
