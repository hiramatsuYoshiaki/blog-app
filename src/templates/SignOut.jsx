import React from 'react'
import { useDispatch} from 'react-redux'
import { signOut } from '../reducks/users/operators'
import { PrimaryButton } from '../components/UiKit/index'
import { push } from 'connected-react-router'


const SignOut = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <PrimaryButton
                    label="サインアウトする"
                    onClick={() => dispatch(signOut())}
            />
            <PrimaryButton
                    label="キャンセル"
                    onClick={()=>dispatch(push('/'))}
            />
        </div>
    )
}

export default SignOut
