export const FETCH_STAGE = "FETCH_STAGE"
export const fetchStagesAction = (stages) => {
    return {
        type: "FETCH_STAGE",
        payload: stages
    }
}

export const DELETE_STAGE = "DELETE_STAGE"
export const deleteStagesAction = (stages) => {
    return {
        type: "DELETE_STAGE",
        payload: stages
    }
}