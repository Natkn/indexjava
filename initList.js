import { renderComments } from './renderComments.js'

import { commentsData } from './comments.js'

export function addLikeEventListeners() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', handleLikeClick)
    })
}

export function handleLikeClick(event) {
    const commentId = parseInt(event.target.dataset.commentId)
    commentsData[commentId].liked = !commentsData[commentId].liked
    commentsData[commentId].likesCount = commentsData[commentId].liked
        ? commentsData[commentId].likesCount + 1
        : commentsData[commentId].likesCount - 1
    renderComments()
}
