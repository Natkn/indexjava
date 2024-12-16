import { renderComments } from './renderComments.js'
import { commentsData } from './comments.js'

renderComments()

document.getElementById('add-comment').addEventListener('click', () => {
    const newCommentText = document.getElementById('new-comment').value
    if (newCommentText.trim() !== '') {
        commentsData.push({ text: newCommentText, liked: false, likesCount: 0 })
        document.getElementById('new-comment').value = ''
        renderComments()
    }
})
