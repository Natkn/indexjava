import { commentsData } from './comments.js'
import { addLikeEventListeners } from './initList.js'

import { addCommentClickListeners } from './newComm.js'

const likedImage = 'https://cdn-icons-png.flaticon.com/512/2228/2228051.png'
const unlikedImage = 'https://cdn-icons-png.flaticon.com/512/2228/2228016.png'

export function renderComments() {
    const commentsContainer = document.getElementById('comments-container')
    commentsContainer.innerHTML = ''

    commentsData.forEach((comment, index) => {
        const commentDiv = document.createElement('div')
        commentDiv.dataset.commentId = index
        commentDiv.classList.add('comment')

        const p = document.createElement('p')
        p.textContent = comment.text
        commentDiv.appendChild(p)

        const likeImage = document.createElement('img')
        likeImage.src = comment.liked ? likedImage : unlikedImage
        likeImage.alt = 'Лайк'
        likeImage.classList.add('like-button')
        likeImage.dataset.commentId = commentsData.indexOf(comment)
        commentDiv.appendChild(likeImage)

        const likeCount = document.createElement('span')
        likeCount.classList.add('like-count')
        likeCount.textContent = comment.likesCount
        commentDiv.appendChild(likeCount)

        commentsContainer.appendChild(commentDiv)
    })

    addLikeEventListeners()

    addCommentClickListeners()
}
