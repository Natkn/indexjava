import { savedAuthor } from './index.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { getToken, login, registration, updateToken, postTodo } from './api.js'
import { commentsData } from './comments.js'

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
            ? comment.date.slice(0, 19).replace('T', ' ')
            : `${new Date().getDate()}.${
                  new Date().getMonth() + 1
              }.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`

        const commentHTML = `
            <li class="comment" data-comment-id="${index}">
                <div class="comment-header">
                    <div>${comment.author ? comment.author : ''}</div>
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
async function sendComment(callback, newTask) {
    try {
        if (newTask) {
            await postTodo({ ...newTask, author: savedAuthor })
        }
        await fetchAndRenderComments()
        if (callback) {
            return await callback()
        }
    } catch (error) {
        alert('Ошибка: ' + error.message)
    }
}
export function showRegistrationForm(callback, newTask) {
    const app = document.getElementById('app')
    const registrationModal = document.createElement('div')
    registrationModal.id = 'registration-form'
    registrationModal.className = 'registration-form-wrapper'

    registrationModal.innerHTML = `
        <div id="registration-form">
            <h1>Страница входа</h1>
            <div class="form">
                <h3 class="form-title">Фopмa вxодa</h3>
                <form id="auth-form">
                    <div class="form-row">
                        <input type="text" id="login-input" class="input" placeholder="Login" autocomplete="username">
                        <input type="password" id="password-input" class="input" placeholder="Пароль" autocomplete="current-password">
                    </div>
                </form>
                <br />
                <button class="button" id="login-button">Войти</button>
                <button class="button" id="reg-button">Зарегистрироваться</button>
            </div>
        </div> 
        `
    const closeButton = document.createElement('span')
    closeButton.className = 'close-button'
    closeButton.innerHTML = '&times;'
    registrationModal.appendChild(closeButton)

    closeButton.addEventListener('click', () => {
        registrationModal.remove()
    })
    app.appendChild(registrationModal)
    const authForm = document.getElementById('auth-form')

    authForm.addEventListener('submit', (event) => {
        event.preventDefault()
    })
    const loginButton = document.getElementById('login-button')
    const regButton = document.getElementById('reg-button')

    loginButton.addEventListener('click', async () => {
        const loginValue = document.getElementById('login-input').value
        const passwordValue = document.getElementById('password-input').value
        registrationModal.remove()
        try {
            const data = await login({
                login: loginValue,
                password: passwordValue,
            })

            if (data.error) {
                throw new Error(data.error)
            }
            await updateToken(data.user.token)
            console.log('Token after await updateToken in login', getToken())
            return await sendComment(callback, newTask)
        } catch (error) {
            alert('Ошибка входа: ' + error.message)
        }
    })

    regButton.addEventListener('click', async () => {
        const loginValue = document.getElementById('login-input').value
        const passwordValue = document.getElementById('password-input').value
        registrationModal.remove()
        try {
            const data = await registration({
                login: loginValue,
                password: passwordValue,
            })

            if (data.error) {
                throw new Error(data.error)
            }
            await updateToken(data.user.token)
            console.log(
                'Token after await updateToken in registration',
                getToken(),
            )
            return await sendComment(callback, newTask)
        } catch (error) {
            alert('Ошибка регистрации: ' + error.message)
        }
    })
    app.appendChild(registrationModal)
}
