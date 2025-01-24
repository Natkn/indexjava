import { commentsData } from './comments.js'
import { savedAuthor } from './index.js'
import { token } from './api.js'
import { login, registration, updateToken } from './api.js'
const input = document.getElementById('new-comment-name')
const newCommentInput = document.getElementById('new-comment')
const addCommentButton = document.getElementById('add-comment')

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function renderComments() {
    const commentsContainer = document.getElementById('comments-container')
    commentsContainer.innerHTML = ''

    commentsData.forEach((comment, index) => {
        const dateString = comment.date
            ? comment.date
            : `${new Date().getDate()}.${
                  new Date().getMonth() + 1
              }.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`

        const commentHTML = `
            <li class="comment" data-comment-id="${index}">
                <div class="comment-header">
                    <div>${savedAuthor ? savedAuthor : ''}</div>
                    <div>${dateString}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text" data-edit-comment-id="${index}">${comment.text}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likesCount}</span>
                        <button class="like-button ${
                            comment.liked ? 'liked' : ''
                        }" data-comment-id="${index}"></button>
                    </div>
                </div>
            </li>
        `
        commentsContainer.innerHTML += commentHTML
    })
    addLikeEventListeners()
    addCommentClickListeners()
}

function addLikeEventListeners() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', () => {
            const commentId = parseInt(likeButton.dataset.commentId)
            likeButton.classList.add('loading-like')

            delay(2000)
                .then(() => {
                    if (commentsData[commentId].liked === true) {
                        commentsData[commentId].liked = false
                        commentsData[commentId].likesCount -= 1
                    } else {
                        commentsData[commentId].liked = true
                        commentsData[commentId].likesCount += 1
                    }
                    renderComments()
                })
                .finally(() => {
                    likeButton.classList.remove('loading-like')
                })
        })
    })
}

function addCommentClickListeners() {
    const commentTexts = document.querySelectorAll('.comment-text')
    commentTexts.forEach((commentTextElement) => {
        commentTextElement.addEventListener('click', () => {})
    })
}

function showRegistrationForm() {
    const app = document.getElementById('app')
    const registrationModal = document.createElement('div')
    registrationModal.id = 'registration-form'
    registrationModal.className = 'registration-form-wrapper'

    registrationModal.innerHTML = `
        <div id="registration-form">
            <h1>Страница входа</h1>
            <div class="form">
                <h3 class="form-title">Фopмa вxодa</h3>
                <div class="form-row">
                    <input type="text" id="login-input" class="input" placeholder="Login">
                    <input type="password" id="password-input" class="input" placeholder="Пароль">
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
                <button class="button" id="reg-button">Зарегистрироваться</button>
            </div>
        </div> 
        `
    app.appendChild(registrationModal)
    const loginButton = document.getElementById('login-button')
    const regButton = document.getElementById('reg-button')

    loginButton.addEventListener('click', async () => {
        const loginValue = document.getElementById('login-input').value
        const passwordValue = document.getElementById('password-input').value

        try {
            const data = await login({
                login: loginValue,
                password: passwordValue,
            })

            if (data.error) {
                throw new Error(data.error)
            }
            updateToken(data.token)
            alert('Вход выполнен')

            await fetchAndRenderComments()
            registrationModal.remove()
        } catch (error) {
            alert('Ошибка входа: ' + error.message)
        }
    })

    regButton.addEventListener('click', async () => {
        const loginValue = document.getElementById('login-input').value
        const passwordValue = document.getElementById('password-input').value

        try {
            const data = await registration({
                login: loginValue,
                password: passwordValue,
            })

            if (data.error) {
                throw new Error(data.error)
            }
            updateToken(data.token)
            alert('Регистрация прошла')

            await fetchAndRenderComments()
            registrationModal.remove()
        } catch (error) {
            alert('Ошибка регистрации: ' + error.message)
        }
    })

    const closeButton = document.createElement('span')
    closeButton.className = 'close-button'
    closeButton.innerHTML = '&times;'

    registrationModal.appendChild(closeButton)

    closeButton.addEventListener('click', () => {
        registrationModal.remove()
    })

    async function fetchAndRenderComments() {
        const newCommentText = newCommentInput.value
        const newCommentAuthor = input.value
        const newTask = {
            text: newCommentText
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            author: newCommentAuthor,
        }

        try {
            const response = fetch('https://wedev-api.sky.pro/api/v2/todos', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            })

            if (!response.ok) {
                throw new Error('Ошибка при отправке комментария')
            }
            await fetchAndRenderComments()
            newCommentInput.value = ''
            input.value = ''
        } catch (error) {
            alert('Ошибка: ' + error.message)
        }
    }
}

addCommentButton.addEventListener('click', () => {
    showRegistrationForm()
})
