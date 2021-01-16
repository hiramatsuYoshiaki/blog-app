export const FETCH_LOCATIONS = "FETCH_LOCATIONS"
export const fetchLocationAction = (locations) => {
    return {
        type: "FETCH_LOCATIONS",
        payload:locations
    }
}
export const DELETE_LOCATIONS = "DELETE_LOCATIONS"
export const deleteLocationsAction = (locations) => {
    return {
        type: "DELETE_LOCATIONS",
        payload:locations
    }
}
