import * as Actions from './actions'
import initialState from '../store/initialState' 

export const LocationsReducers = (state=initialState.locations, action) => {
    switch (action.type) {
        case Actions.FETCH_LOCATIONS:
            return {
                ...state,
                locationsAll:[...action.payload]
            }
        case Actions.DELETE_LOCATIONS:
            return {
                ...state,
                locationsAll:[...action.payload]
            }
        default:
            return state
    }
}  