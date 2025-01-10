import { fetchAndRenderComments } from './fetchAndRenderComments.js'

export const button = document.getElementById('add-comment')
const input = document.getElementById('new-comment-name')
const newCommentInput = document.getElementById('new-comment')
export const commentsContainer = document.getElementById('comments-container')
const commentForm = document.getElementById('comment-form')
const commentLoadingMessage = document.getElementById('comment-loading-message')

export let isCommentLoading = false
fetchAndRenderComments()

button.addEventListener('click', () => {
    const newCommentText = newCommentInput.value
    const newCommentAuthor = input.value

    input.classList.remove('error')
    if (newCommentAuthor.trim() === '') {
        input.classList.add('error')
        return
    }

    if (newCommentText.trim() !== '' && newCommentAuthor.trim() !== '') {
        isCommentLoading = true
        commentForm.style.display = 'none'
        commentLoadingMessage.style.display = 'block'
        const newTask = {
            text: newCommentText
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            author: newCommentAuthor,
        }

        button.disabled = true
        button.textContent = 'Загружаем...'

        fetch('https://wedev-api.sky.pro/api/todos', {
            method: 'POST',
            body: JSON.stringify(newTask),
        })
            .then(() => {
                return fetchAndRenderComments()
            })
            .then(() => {
                newCommentInput.value = ''
                input.value = ''
            })
            .catch((error) => {
                console.error('Ошибка при отправке комментария:', error)
            })
            .finally(() => {
                isCommentLoading = false
                commentForm.style.display = 'flex'
                commentLoadingMessage.style.display = 'none'
            })
    }
})
