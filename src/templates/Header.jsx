import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const Header = () => {
    const dispatch = useDispatch()
    return (
        <header className="l-header">
            <p onClick={()=>dispatch(push('/'))}>
                TOURdeHDR
            </p>
        </header>
    )
}

export default Header
