import { db, FirebaseTimestamp } from '../../firebase/index'
// import { push } from 'connected-react-router'
import { fetchTagsAction, deleteTagsAction } from './actions'

const tagsRef = db.collection('tags') 

export const fetchTags = () => {
    return async (dispatch) => {
        return tagsRef.orderBy('name').get()
            .then(snapshots => {
                const tagsList = []
                snapshots.forEach((snapshot) => {
                    const tag = snapshot.data()
                    tagsList.push(tag)
                })
                dispatch(fetchTagsAction(tagsList))
            })
    }
}

export const saveTag = (id, name) => {
    return async (dispatch) => {
        if (name === "") {
            alert('タグ名は必須です')
            return false
        }
        const timestamp = FirebaseTimestamp.now()
        const data = {
            name:name
        }
        if (id === "") {
            const ref = tagsRef.doc()
            id = ref.id
            data.id = id 
            data.created_id = timestamp
        }
        return tagsRef.doc(id).set(data, { merge: true })
            .then(() => {
                console.log('save tag data firestore')
            }).catch((error) => {
            throw new Error(error)
        })
    }
}
export const deleteTags = (id) => {
    console.log(id)
    return async (dispatch, getState) => {
        return tagsRef.doc(id).delete()
            .then(() => {
                console.log('tagsRef delete')
                const prevProducts = getState().tags.tagsAll
                const nextProducts = prevProducts.filter(tag => tag.id !== id)
                dispatch(deleteTagsAction(nextProducts)) 
            }).catch((error) => {
                console.log('tagsRef delete')
                throw new Error(error)
        })
    }
} 