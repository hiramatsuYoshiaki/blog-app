import { fetchPostsAction, deletePostsAction } from  './actions'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'

const postsRef = db.collection('posts')

export const deletePost = (id) => {
    return async (dispatch, getState) => {
        return postsRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().posts.postsAll
                const nextProducts = prevProducts.filter(post => post.id !== id)
                dispatch(deletePostsAction(nextProducts))
        })
    }
}  

export const fetchPosts = () => {
    return async (dispatch) => {
        return postsRef.orderBy('postDate', 'desc').get()
            .then(snapshots => {
                const postsAll = []
                snapshots.forEach((snapshot) => {
                    const post = snapshot.data()
                    postsAll.push(post)
                })
                dispatch(fetchPostsAction(postsAll))
            }).catch((error) => {
                throw new Error(error)
        })
    }
}

export const savePost = (id, title, article, type, postDate, topImages, postImages, stage, tags, location) => {
    return async (dispatch) => {
        //validation 
        // .........
        const timestamp = FirebaseTimestamp.now()
        const data = {
            title: title,
            article: article, 
            type: type,
            postDate: postDate,
            topImages: topImages,
            postImages: postImages,
            update_at: timestamp,
            stage: stage,
            tags: tags,
            location:location
        }
        if (id === "") {
            //IDを自動裁判
            const ref = postsRef.doc()
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }
        return postsRef.doc(id).set(data, { merge: true })
            .then(() => {
                console.log('save pots data firestore')
                dispatch(push('/post/edit'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}