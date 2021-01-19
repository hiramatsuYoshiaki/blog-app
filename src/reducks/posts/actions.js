export const FETCH_POSTS = "FETCH_POSTS"
export const fetchPostsAction = (posts) => {
    return {
        type: "FETCH_POSTS",
        payload:posts
    }
}
export const DELETE_POSTS = "DELETE_POSTS"
export const deletePostsAction = (posts) => {
    return {
        type: "DELETE_POSTS",
        payload:posts
    }
}
