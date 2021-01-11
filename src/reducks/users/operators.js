import { auth } from '../../firebase/index';
import { push } from 'connected-react-router'
import { signInAction } from './actions'

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid
                dispatch(signInAction({
                    isSignIn: true,
                    role: 'admin',
                    uid: uid,
                    username:'admin' 
                }))
                // db.collection('users').doc(uid).get()
                //         .then(snapshot => {
                //             const data = snapshot.data()
                //             dispatch(signInAction({
                //                 isSignIn: true,
                //                 role: data.role,
                //                 uid: uid,
                //                 username:data.username
                //             }))
                //         })
            } else {
                dispatch(push('/'))
            }
        })
    }
} 
export const signIn = (email, password) => {
    return async (dispatch) => {
        if (email === "" || password === "") {
            return false
        }
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if (user) {
                    const uid = user.uid
                    console.log(user.uid)
                    dispatch(signInAction({
                        isSignIn: true,
                        role:"admin",
                        uid: uid,
                        username:"admin"
                    }))
                    dispatch(push('/admin'))
                } else {
                    console.log(user.uid)
                    dispatch(push('/'))
                }
            }).catch((error) => {
                //  throw new Error(error)
                dispatch(push('/'))
           }) 
    }
    
}
export const signOut = () => {
    return async (dispatch) => {
        return auth.signOut().then(() => {
            dispatch(signInAction({
                isSignIn: false,
                role:"",
                uid: "",
                username:""
            }))
            dispatch(push('/'))
        }).catch((error) => {
            console.log('error')
        })
    }
}