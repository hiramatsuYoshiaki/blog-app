import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIsSignedIn } from './reducks/users/selectors'
import {listenAuthState} from './reducks/users/operators'


const Auth = ({ children }) => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)
    useEffect(() => {
        // console.log("auth useEffect");
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    },[dispatch,isSignedIn])
    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }
}

export default Auth
