import { commentsData } from './comments.js'
import { addLikeEventListeners } from './initList.js'
import { addCommentClickListeners } from './newComm.js'

export function renderComments() {
    const commentsContainer = document.getElementById('comments-container')
    commentsContainer.innerHTML = ''
    commentsData.forEach((comment, index) => {
        const commentDiv = document.createElement('li')
        commentDiv.dataset.commentId = index
        commentDiv.classList.add('comment')

        const commentHeader = document.createElement('div')
        commentHeader.classList.add('comment-header')
        const authorDiv = document.createElement('div')
        authorDiv.textContent = comment.author
        commentHeader.appendChild(authorDiv)

        const dateDiv = document.createElement('div')
        if (comment.date) {
            dateDiv.textContent = comment.date
        } else {
            const now = new Date()
            const dateString = `${now.getDate()}.${
                now.getMonth() + 1
            }.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
            dateDiv.textContent = dateString
        }
        commentHeader.appendChild(dateDiv)
        commentDiv.appendChild(commentHeader)

        const commentBody = document.createElement('div')
        commentBody.classList.add('comment-body')
        const p = document.createElement('div')
        p.classList.add('comment-text')
        p.textContent = comment.text
        commentBody.appendChild(p)
        commentDiv.appendChild(commentBody)

        const commentFooter = document.createElement('div')
        commentFooter.classList.add('comment-footer')
        const likesDiv = document.createElement('div')
        likesDiv.classList.add('likes')

        const likeCount = document.createElement('span')
        likeCount.classList.add('likes-counter')
        likeCount.textContent = comment.likesCount
        likesDiv.appendChild(likeCount)

        const likeButton = document.createElement('button')
        likeButton.classList.add('like-button')
        if (comment.liked) {
            likeButton.classList.add('liked')
        }
        likeButton.dataset.commentId = index

        likesDiv.appendChild(likeButton)
        commentFooter.appendChild(likesDiv)

        commentDiv.appendChild(commentFooter)
        commentsContainer.appendChild(commentDiv)
    })

    addLikeEventListeners()

    addCommentClickListeners()
}
