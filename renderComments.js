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
            ? comment.date
            : `${new Date().getDate()}.${
                  new Date().getMonth() + 1
              }.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`

        const commentHTML = `
            <li class="comment" data-comment-id="${index}">
                <div class="comment-header">
                    <div>${comment.author}</div>
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
