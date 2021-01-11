import { createSelector } from 'reselect' 

const stagesSelector = (state) => state.stages

export const getStages = createSelector(
    [stagesSelector],
    state => state.stagesAll
)
