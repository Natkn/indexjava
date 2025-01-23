import { postTodo } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
//const token = 'asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'
const input = document.getElementById('new-comment-name')
const newCommentInput = document.getElementById('new-comment')
const commentLoadingMessage = document.getElementById('comment-loading-message')
const formContainer = document.getElementById('comment-form')
export const commentsContainer = document.getElementById('comments-container')
export const button = document.getElementById('add-comment')
export let isCommentLoading = false
export let savedAuthor = ''
fetchAndRenderComments()

input.addEventListener('input', (e) => {
    savedAuthor = e.target.value
})

function validateInput(author, text) {
    if (author.trim() === '') {
        input.classList.add('error')
        return false
    }
    if (author.length < 3 || text.length < 3) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        return false
    }
    return true
}
button.addEventListener('click', (e) => {
    e.preventDefault()
    const newCommentText = newCommentInput.value
    const newCommentAuthor = input.value

    input.classList.remove('error')
    if (!validateInput(newCommentAuthor, newCommentText)) {
        return
    }
    isCommentLoading = true
    commentLoadingMessage.classList.add('visible')
    formContainer.classList.add('hidden')

    const newTask = {
        text: newCommentText.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        author: newCommentAuthor,
        forceError: true,
    }

    button.disabled = true
    button.textContent = 'Загружаем...'

    postTodo(newTask)
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже')
                }
                if (response.status === 400) {
                    throw new Error(' You made mistake')
                }
                throw new Error(' Something went wrong')
            }
        })

        .then(() => {
            return fetchAndRenderComments()
        })
        .then(() => {
            newCommentInput.value = ''
            input.value = ''
            savedAuthor = ''
        })
        .catch((error) => {
            alert('Кажется, у вас сломался интернет, попробуйте позже', error)
        })
        .finally(() => {
            isCommentLoading = false
            button.disabled = false
            button.textContent = 'Написать'
            commentLoadingMessage.classList.remove('visible')
            formContainer.classList.remove('hidden')
        })
})
