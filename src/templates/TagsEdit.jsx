import React,{useState, useCallback} from 'react'
import { TextInput, PrimaryButton } from '../components/UiKit/index'
import { useDispatch } from 'react-redux'
import { saveTag } from '../reducks/tags/operators'

const TagsEdit = () => {
    const dispatch = useDispatch()
    let id = ""
    const [name, setName] = useState('')
    const inputName = useCallback((e) => {
        setName(e.target.value)
    },[setName])
    return (
        <div>
            <h2>Tags Edit/Add/Delete</h2>
            <TextInput
                fullWidth={true} label={"タグ"} multiline={false} required={true}
                rows={1} value={name} type={"text"} onChange={inputName}
            />
            <PrimaryButton 
                label={"タグを追加"}
                onClick={() => dispatch(saveTag(id, name))}
            />
        </div>
    )
}

export default TagsEdit
