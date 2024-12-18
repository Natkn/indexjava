export const commentsData = []
export const commentsContainer = document.getElementById('comments-container')

export function getInitialComments() {
    if (commentsContainer) {
        commentsContainer
            .querySelectorAll('.comment')
            .forEach((commentElement, index) => {
                const text =
                    commentElement.querySelector('.comment-text').textContent
                const author = commentElement.querySelector(
                    '.comment-header div:first-child',
                ).textContent
                const date = commentElement.querySelector(
                    '.comment-header div:last-child',
                ).textContent
                const liked = commentElement
                    .querySelector('.like-button')
                    .classList.contains('-active-like')
                const likesCount = parseInt(
                    commentElement.querySelector('.likes-counter').textContent,
                )
                commentsData.push({
                    author: author,
                    text: text,
                    date: date,
                    liked: liked,
                    likesCount: likesCount,
                })
                commentElement.dataset.commentId = index
            })
    }
}
getInitialComments()
