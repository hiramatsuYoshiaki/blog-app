import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultipleSelect } from '../UiKit/index'
import { getTags } from '../../reducks/tags/seloctors'
import { fetchTags } from '../../reducks/tags/operators'

const TagsArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const tags = getTags(selector)
    

    const handleChange = (selectedTags) => {
        const selectedValue = []
        if(selectedTags.length > 0 ){
            selectedTags.forEach(selectedTag => {
                const found = tags.find(tag => tag.id === selectedTag)
                if (found){
                    selectedValue.push(found)
                }
            })
        }
        props.setTgas(selectedValue)
    }
    const valueTags = (pTags) => {
        if(pTags === []){
            return []
        }
        const valueTags = []
        pTags.forEach(pTag=>{
            console.log(pTag.id);
            console.log(pTag.name);
            valueTags.push(pTag.id)
        })
        return valueTags
    } 

    useEffect(() => {
        dispatch(fetchTags())
    }, [])  
    
    return (
        <div>
            <h3>TagsArea</h3>
            <p>タグを選択してください</p>
            <MultipleSelect
                label={"タグ"}
                // value={props.tags || []}
                value={valueTags(props.tags)}
                handleChange={handleChange}
                options={tags}
                required={true}
            />
            {/* <h1>tag name</h1>
            {selected.length > 0 && (
                selected.map(value => {
                    <h1>value.name</h1>
                })
            )} */}
        </div>
    )
}

export default TagsArea
