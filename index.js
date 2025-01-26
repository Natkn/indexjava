//import { postTodo } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { getToken } from './api.js'

const input = document.getElementById('new-comment-name')
const newCommentInput = document.getElementById('new-comment')
const commentLoadingMessage = document.getElementById('comment-loading-message')
const formContainer = document.getElementById('comment-form')
export const commentsContainer = document.getElementById('comments-container')
export const button = document.getElementById('add-comment')
export let isCommentLoading = false
export let savedAuthor = ''

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
    isCommentLoading = true
    commentLoadingMessage.classList.add('visible')
    formContainer.classList.add('hidden')

    const newTask = {
        text: newCommentText.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        author: newCommentAuthor,
    }

    button.disabled = true
    button.textContent = 'Загружаем...'

    try {
        await fetchAndRenderComments(newTask)
    } catch (error) {
        console.error('Ошибка при отправке комментария:', error)
    } finally {
        newCommentInput.value = ''
        input.value = ''
        savedAuthor = ''
        isCommentLoading = false
        button.disabled = false
        button.textContent = 'Написать'
        commentLoadingMessage.classList.remove('visible')
        formContainer.classList.remove('hidden')
    }
})
