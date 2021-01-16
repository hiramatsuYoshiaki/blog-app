import { db, FirebaseTimestamp } from '../../firebase/index'
import { fetchLocationAction, deleteLocationsAction } from  './actions'

const locationsRef = db.collection('locations')

export const deleteLocation = (id) => {
    return async (dispatch, getState) => {
        return locationsRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().locations.locationsAll
                const nextProducts = prevProducts.filter(location => location.id !== id)
                dispatch(deleteLocationsAction(nextProducts))
        })
    }
} 

export const fetchLocatins = () => {
    return async (dispatch) => {
        return locationsRef.orderBy('update_at', 'desc').get()
            .then(snapshots => {
                const LocationList = []
                snapshots.forEach((snapshot) =>{
                    const location = snapshot.data()
                    LocationList.push(location)
                })
                // console.log(LocationList)
                dispatch(fetchLocationAction(LocationList))
        })
    }
}

export const saveLocation = (id, name, address, position, images) => {
    return async (dispatch) => {
        if (name === "") {
            alert("名称は必須です。")
            return false
        }
        if (address === "") {
            alert("住所は必須です。")
            return false
        }
        if (position === {}) {
            alert("経度、緯度は必須です。")
            return false
        }
        if (images.length === 0) {
            alert("グーグルアースは必須です。")
            return false
        }
        console.log('saveLocation')
        console.log('id',id)
        console.log('name',name)
        console.log('address',address)
        console.log('position',position)
        console.log('address', images)
        const timestamp = FirebaseTimestamp.now()
        const data = {
            name: name,
            address: address,
            position:position,
            images:images,
            update_at: timestamp,
        }
        if (id === "") {
            //IDを自動裁判
            const ref = locationsRef.doc()
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }
        return locationsRef.doc(id).set(data, { merge: true })
            .then(() => {
                console.log('save locations data firestore')
            }).catch((error) => {
                throw new Error(error)
            })
    }
}