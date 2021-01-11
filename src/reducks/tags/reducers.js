import * as Actions from './actions'
import initialState from '../store/initialState' 

export const TagsReducers = (state=initialState.tags, action) => {
    switch (action.type) {
        case Actions.FETCH_TAGS:
            return {
                ...state,
                tagsAll:[...action.payload]
            }
        default:
            return state
    }
}  