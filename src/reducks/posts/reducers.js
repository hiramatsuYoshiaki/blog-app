import * as Actions from './actions'
import initialState from '../store/initialState' 

export const PostsReducers = (state=initialState.posts, action) => {
    switch (action.type) {
        case Actions.FETCH_POSTS:
            return {
                ...state,
                postsAll:[...action.payload]
            }
        case Actions.DELETE_POSTS:
            return {
                ...state,
                postsAll:[...action.payload]
            }
        default:
            return state
    }
}  