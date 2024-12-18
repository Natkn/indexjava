import { renderComments } from './renderComments.js'
import { commentsData } from './comments.js'

renderComments()

document.getElementById('add-comment').addEventListener('click', () => {
    const newCommentText = document.getElementById('new-comment').value
    const newCommentAuthor = document.getElementById('new-comment-name').value
    if (newCommentText.trim() !== '' && newCommentAuthor.trim() !== '') {
        commentsData.push({
            text: newCommentText,
            author: newCommentAuthor,
            liked: false,
            likesCount: 0,
        })
        document.getElementById('new-comment').value = ''
        document.getElementById('new-comment-name').value = ''
        renderComments()
    }
})

renderComments()
