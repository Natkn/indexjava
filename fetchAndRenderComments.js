import { renderComments } from './renderComments.js'
import { commentsData } from './comments.js'

const host = 'https://wedev-api.sky.pro/api/v2/todos'

export async function fetchAndRenderComments() {
    try {
        const response = await fetch(host, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            return
        }
        const data = await response.json()
        console.log('Fetched comments:', data)
        commentsData.length = 0
        data.todos.forEach((comment) => {
            commentsData.push({
                text: comment.text,
                author: comment.user ? comment.user.name : '',
                date: comment.createdAt,
                likesCount: 0,
                liked: false,
            })
        })
        renderComments()
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error)
    }
}
