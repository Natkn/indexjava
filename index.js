import { renderComments } from './renderComments.js'
import { commentsData } from './comments.js'
import { updateTasks } from './comments.js'

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

fetch('https://wedev-api.sky.pro/api/todos')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateTasks(data.todos)
        renderComments()
    })

fetch('https://wedev-api.sky.pro/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTask),
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateTasks(data.todos)
        renderComments()
    })
