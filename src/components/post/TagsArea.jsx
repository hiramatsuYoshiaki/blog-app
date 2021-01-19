import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultipleSelect } from '../UiKit/index'
import { getTags } from '../../reducks/tags/seloctors'
import { fetchTags } from '../../reducks/tags/operators'

const TagsArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const tags = getTags(selector)
    
    // const [selectedId, setSelectedId] = useState([])
    // const [selected, setSelected] = useState([])
    
    const handleChange = (selectTtags) => {
        // const selectedTags = []
        // const selectedTagsId = []
        // selectTtags.map((selectTtag) => {
        //     const founds = tags.find(findTag => findTag.id === selectTtag)
        //     if (founds) {
        //         selectedTags.push(founds)
        //         selectedTagsId.push(founds.id)
        //     }
        // })
        // setSelectedId(selectedTagsId)
        // setSelected(selectedTags)
        props.setTgas(selectTtags)
    }
    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch]) 
    return (
        <div>
            <h3>TagsArea</h3>
            <p>タグを選択してください</p>
            <MultipleSelect
                label={"タグ"}
                // value={selectedId}
                value={props.tags || ''}
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
