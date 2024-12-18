import { commentsData } from './comments.js'

export function addCommentClickListeners() {
    const commentElements = document.querySelectorAll('.comment')
    commentElements.forEach((commentElement) => {
        commentElement.addEventListener('click', (event) => {
            if (!event.target.closest('.like-button')) {
                const commentId = parseInt(commentElement.dataset.commentId)
                if (commentId >= 0 && commentId < commentsData.length) {
                    const commentText = commentsData[commentId].text
                    const author = commentsData[commentId].author
                    document.getElementById('new-comment').value =
                        `> ${commentText} (${author})\n`
                    event.stopPropagation()
                }
            }
        })
    })
}
