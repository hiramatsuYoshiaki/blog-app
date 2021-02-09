import React,{useState, useCallback, useEffect} from 'react'
import { TextInput, PrimaryButton } from '../components/UiKit/index'
import { useDispatch } from 'react-redux'
import { saveTag } from '../reducks/tags/operators' 
import {db} from '../firebase/index'
import Button from '@material-ui/core/Button'
import {push} from 'connected-react-router'


const TagsEdit = () => {
    const dispatch = useDispatch()
    let id = window.location.pathname.split('/tags/edit')[1]
    if (id !== '') {
        id = id.split('/')[1]
    }
    const [name, setName] = useState('')
    const inputName = useCallback((e) => {
        setName(e.target.value)
    }, [setName])
    useEffect(() => {
        if (id !== "") {
            db.collection('tags').doc(id).get().then(snapshot => {
                const tag = snapshot.data()
                setName(tag.name)
            })
        }
    },[id])
    return (
        <div className="l-container">
            <div className="l-section ">
                <div className="c-admin-wrape">
                <h2>タグ新規作成</h2>
                    <TextInput
                        fullWidth={true} label={"タグ"} multiline={false} required={true}
                        rows={1} value={name} type={"text"} onChange={inputName}
                    />
                    <PrimaryButton 
                        label={"タグを追加"}
                        onClick={() => dispatch(saveTag(id, name))}
                    />
                    <div>
                        <Button onClick={()=> dispatch(push('/admin'))}>
                            <p>Back to Admin Menu</p>
                        </Button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagsEdit
