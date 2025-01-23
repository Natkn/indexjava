import { renderComments } from './renderComments.js'
import { updateTasks } from './comments.js'
import { commentsContainer } from './index.js'
//import { token } from './api.js'
const token = 'asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'
let isInitialLoading = true

export function fetchAndRenderComments() {
    if (isInitialLoading) {
        commentsContainer.innerHTML = 'Подождите, комментарии загружаются...'
    }
    return fetch('https://wedev-api.sky.pro/api/v2/todos', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Wrong Authorization')
            }
            return response.json()
        })
        .then((data) => {
            if (data && data.todos) {
                updateTasks(
                    data.todos.map((todo) => ({
                        id: todo.id,
                        author: '',
                        text: todo.text,
                        liked: false,
                        likesCount: 0,
                    })),
                )
                renderComments()
                isInitialLoading = false
            }
        })
        .catch((error) => {
            console.error('Ошибка при загрузке комментариев', error)
        })
}
