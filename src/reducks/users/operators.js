import { auth } from '../../firebase/index';
import { push } from 'connected-react-router'
import { signInAction,signOutAction } from './actions'


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
        alert(email + password)
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if (user) {
                    const uid = user.uid
                    dispatch(signInAction({
                        isSignIn: true,
                        role:"admin",
                        uid: uid,
                        username:"admin"
                    }))
                    dispatch(push('/'))
                } else {
                    dispatch(push('/'))
                }
            }).catch((error) => {
                alert('管理者以外はログインできません')
                // console.log('login error',error)
                dispatch(push('/'))
           }) 
    }
    
}
export const signOut = () => {
    alert('signout')
    return async (dispatch) => {
        return auth.signOut().then(() => {
            dispatch(signOutAction({
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