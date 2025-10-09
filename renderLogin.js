import { login, updateToken } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
export const renderLogin = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
<h1>Страница входа</h1>
<div class="form">
<h3 class="form-title">Фopмa вxодa</h3>
<div class="form-row">
<input type="text" id="login-input" class="input" placeholder="Login"
<input
type="text"
id="password-input"
class="input"
placeholder="Пароль"
/>
</div>
<br />
<button class="button" id="login-button">Войти</button>
<button class="button" id="reg-button">Зарегистрироваться</button>
`

    const button = document.getElementById('login-button')
    const loginElement = document.getElementById('login-input')
    const passwordElement = document.getElementById('password-input')

    button.addEventListener('click', () => {
        login({
            login: loginElement.value,
            password: passwordElement.value,
        }).then((responseData) => {
            updateToken(responseData.user.token)
            fetchAndRenderComments()
        })
    })
}
