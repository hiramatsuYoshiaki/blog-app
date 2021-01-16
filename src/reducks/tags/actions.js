export const FETCH_TAGS = "FETCH_TAGS"
export const fetchTagsAction = (tags) => {
    return {
        type: "FETCH_TAGS",
        payload: tags
    }
}

export const DELETE_TAGS = "DELETE_TAGS"
export const deleteTagsAction = (tags) => {
    return {
        type: "DELETE_TAGS",
        payload: tags
    }
}