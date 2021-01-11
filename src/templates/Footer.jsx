import React from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'


const Footer = () => {
    const dispatch = useDispatch()
    return (
        <footer className="l-footer">
            <p onClick={() => dispatch(push('/signin'))} >ログイン</p>
            <p onClick={() => dispatch(push('/admin'))}>管理</p>
        </footer>
    )
}

export default Footer
