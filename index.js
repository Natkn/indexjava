import { renderComments } from './renderComments.js'
import { commentsData } from './comments.js'
import { updateTasks } from './comments.js'

const button = document.getElementById('add-comment')
const input = document.getElementById('new-comment-name')

document.getElementById('add-comment').addEventListener('click', () => {
    const newCommentText = document.getElementById('new-comment').value
    const newCommentAuthor = document.getElementById('new-comment-name').value
    if (newCommentText.trim() !== '' && newCommentAuthor.trim() !== '') {
        commentsData.push({
            text: newCommentText,
            author: newCommentAuthor,
            liked: false,
            likesCount: 0,
        })
        document.getElementById('new-comment').value = ''
        document.getElementById('new-comment-name').value = ''
        renderComments()
    }
})

const newTask = {
    text: input.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
}

function fetchAndRenderComments() {
    fetch('https://wedev-api.sky.pro/api/todos')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data) {
                updateTasks({
                    id: data.id,
                    author: 'User',
                    text: data.text,
                    liked: false,
                    likesCount: 0,
                })
            }
            renderComments()
        })
        .catch((error) => {
            console.error('Ошибка при загрузке комментариев:', error)
        })
}

button.addEventListener('click', function () {
    input.classList.remove('error')
    if (input.value.trim() === '') {
        input.classList.add('error')
        return
    }
})
fetch('https://wedev-api.sky.pro/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTask),
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if (data) {
            updateTasks({
                id: data.id,
                author: 'User',
                text: data.text,
                liked: false,
                likesCount: 0,
            })
        }
        renderComments()
    })
    .catch((error) => {
        console.error('Ошибка при отправке комментария:', error)
    })
input.value = ''

fetchAndRenderComments()
