import * as Actions from './actions'
import initialState from '../store/initialState' 

export const StagesReducers = (state=initialState.stages, action) => {
    switch (action.type) {
        case Actions.FETCH_STAGE:
            return {
                ...state,
                stagesAll:[...action.payload]
            }
        default:
            return state
    }
}  