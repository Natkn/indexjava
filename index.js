import { renderComments } from './renderComments.js'
import { updateTasks } from './comments.js'

const button = document.getElementById('add-comment')
const input = document.getElementById('new-comment-name')
const newCommentInput = document.getElementById('new-comment')

button.addEventListener('click', () => {
    const newCommentText = newCommentInput.value
    const newCommentAuthor = input.value

    input.classList.remove('error')
    if (newCommentAuthor.trim() === '') {
        input.classList.add('error')
        return
    }

    if (newCommentText.trim() !== '' && newCommentAuthor.trim() !== '') {
        const newTask = {
            // newTask создается внутри слушателя
            text: newCommentText
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            author: newCommentAuthor,
        }

        fetch('https://wedev-api.sky.pro/api/todos', {
            // fetch POST внутри слушателя
            method: 'POST',
            body: JSON.stringify(newTask),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data) {
                    fetchAndRenderComments()
                    newCommentInput.value = ''
                    input.value = ''
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке комментария:', error)
            })
    }
})
function fetchAndRenderComments() {
    fetch('https://wedev-api.sky.pro/api/todos')
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
                renderComments()
            }
        })
        .catch((error) => {
            console.error('Ошибка при загрузке комментариев:', error)
        })
}
fetchAndRenderComments()
