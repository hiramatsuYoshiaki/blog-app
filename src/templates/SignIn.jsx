import React, {useState, useCallback} from 'react'
import { TextInput, PrimaryButton } from '../components/UiKit/index'
import { useDispatch } from 'react-redux'
import { signIn } from '../reducks/users/operators'
import { push } from 'connected-react-router'


const SignIn = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState(""),
          [password, setPassword] = useState("");
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword])


    return ( 
        <div className="l-container">
            <div className="l-section ">
                <div className="c-section-wrape">
                    <section className="c-signin-section">
                        <TextInput
                                    fullWidth={true}
                                    label={'メールアドレス'}
                                    nultiline={false}
                                    required={true}
                                    rows={1}
                                    value={email}
                                    type={'email'}
                                    onChange={inputEmail}
                        />
                        <TextInput
                                    fullWidth={true}
                                    label={'パスワード（半角英数字で6文字以上）'}
                                    nultiline={false}
                                    required={true}
                                    rows={1}
                                    value={password}
                                    type={'password'}
                                    onChange={inputPassword}
                        />
                        <div className="u-spacer--16" />
                        <div>
                            <PrimaryButton
                                    label="サインインする"
                                    onClick={() => dispatch(signIn(email, password))}
                            />
                        </div>
                        <div>
                            <PrimaryButton
                                        label="キャンセル"
                                        onClick={()=>dispatch(push('/'))}
                                />
                        </div>
                        
                    </section>
                </div>
            </div>
         </div>
    )
}

export default SignIn
