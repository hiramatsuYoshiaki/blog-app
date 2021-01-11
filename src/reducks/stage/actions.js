export const FETCH_STAGE = "FETCH_STAGE"
export const fetchStagesAction = (stages) => {
    return {
        type: "FETCH_STAGE",
        payload: stages
    }
}