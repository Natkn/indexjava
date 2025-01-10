import { renderComments } from './renderComments.js'
import { updateTasks } from './comments.js'
import { button } from './index.js'
import { commentsContainer } from './index.js'

let isInitialLoading = true
export function fetchAndRenderComments() {
    if (isInitialLoading) {
        commentsContainer.innerHTML = 'Подождите, комментарии загружаются...'
    }
    return fetch('https://wedev-api.sky.pro/api/todos')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data && data.todos) {
                updateTasks(
                    data.todos.map((todo) => ({
                        id: todo.id,
                        author: todo.author || 'User',
                        text: todo.text,
                        liked: false,
                        likesCount: 0,
                    })),
                )
                button.disabled = false
                button.textContent = 'Написать'
                renderComments()
                isInitialLoading = false
            }
        })
        .catch((error) => {
            console.error('Ошибка при загрузке комментариев:', error)
        })
}
