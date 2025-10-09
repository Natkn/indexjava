//import { postTodo } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { getToken } from './api.js'
import { showRegistrationForm } from './renderComments.js'
const input = document.getElementById('new-comment-name')
const newCommentInput = document.getElementById('new-comment')
const commentLoadingMessage = document.getElementById('comment-loading-message')
const formContainer = document.getElementById('comment-form')
export const commentsContainer = document.getElementById('comments-container')
export const button = document.getElementById('add-comment')
export let isCommentLoading = false
export let savedAuthor = ''
let tempNewComment = null

async function initializeApp() {
    try {
        const token = getToken()
        if (token) {
            await fetchAndRenderComments()
        }
    } catch (error) {
        console.error('Ошибка инициализации приложения:', error)
    }
}

initializeApp()

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

button.addEventListener('click', async (e) => {
    e.preventDefault()
    const newCommentText = newCommentInput.value
    const newCommentAuthor = input.value

    input.classList.remove('error')
    if (!validateInput(newCommentAuthor, newCommentText)) {
        return
    }

    tempNewComment = {
        text: newCommentText.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        author: newCommentAuthor,
    }
    button.disabled = false
    button.textContent = 'Написать'
    commentLoadingMessage.classList.add('hidden')
    formContainer.classList.add('visible')
    try {
        await showRegistrationForm(async () => {
            isCommentLoading = true
            button.disabled = false
            button.textContent = 'Написать'
        }, tempNewComment)
        await fetchAndRenderComments()
    } catch (error) {
        console.error('Ошибка при отправке комментария:', error)
        alert('Кажется, у вас сломался интернет, попробуйте позже', error)
    } finally {
        isCommentLoading = false

        commentLoadingMessage.classList.remove('visible')
        formContainer.classList.remove('hidden')
        newCommentInput.value = ''
        input.value = ''
        savedAuthor = ''
        tempNewComment = null
    }
})
