import { db, FirebaseTimestamp } from '../../firebase/index'
import { fetchStagesAction, deleteStagesAction } from  './actions'

const stagesRef = db.collection('stages')

export const deleteStage = (id) => {
    return async (dispatch, getState) => {
        return stagesRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().stages.stagesAll
                const nextProducts = prevProducts.filter(stage => stage.id !== id)
                dispatch(deleteStagesAction(nextProducts))
        })
    }
}   

export const fetchStages = () => {
    return async (dispatch) => {
        return stagesRef.orderBy('sort').get()
            .then(snapshots => {
                const stageList = []
                snapshots.forEach((snapshot) => {
                    const stage = snapshot.data()
                    stageList.push(stage)
                })
                dispatch(fetchStagesAction(stageList))
               
        })
    }
}

export const addStage = (id, stageYear, stageNo, stage, images) => {
    return async (dispatch) => {
        if (stage === "" ) {
            alert('error stage' + stage)
            return false
        }
        if ( stageNo < 1 ) {
            alert('error stageNo' + stageNo)
            return false
        }
        if ( stageYear < 2021) {
            alert('error stegeYear' + stageYear)
            return false
        }
       
        const timestamp = FirebaseTimestamp.now()
        const data = {
            stageYear: stageYear,
            stageNo: stageNo,
            stage: stage,
            images:images,
            update_at: timestamp,
            sort: stageYear+stageNo
        }
        if (id === "") {
            //IDを自動裁判
            const ref = stagesRef.doc()
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }
        return stagesRef.doc(id).set(data, { merge: true })
            .then(() => {
                console.log('save stage data firestore')
            }).catch((error) => {
                throw new Error(error)
            })
    }
}