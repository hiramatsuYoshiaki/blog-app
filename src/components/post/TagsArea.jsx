import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { MultipleSelect } from '../UiKit/index'
import { getTags } from '../../reducks/tags/seloctors'
import { fetchTags } from '../../reducks/tags/operators'

const TagsArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const tags = getTags(selector)
    // console.log('tagsrea tags', tags)
    
    const [selected, setSelected] = useState([])
    
    // const handleChange = useCallback((tag) => {
    //     setSelected(tag)
    // }, [setSelected])
    const handleChange = (tags) => {
        // console.log('tagsArea handleChenge');
        // console.log('tags', tags);
        const selectedTags = []
        tags.map((tag) => {
            // console.log('tag', tag);
            selectedTags.push(tag)
        })
        setSelected(selectedTags)
        props.setTgas(selectedTags)
        // setSelected(tags)
        // console.log('selected',selected)
    }
    // const tags = [
    //     {id:"0001", name:"Landscape"},
    //     {id:"0002", name:"Cityscape"},
    //     {id:"0003", name:"Night"},
    //     {id:"0004", name:"Twilite"},
    //     {id:"0005", name:"Morning"},
    //     {id:"0006", name:"Afternoon"}
    // ]
    useEffect(() => {
        // console.log('useEffect fetch tag data');
        dispatch(fetchTags())
    }, [dispatch])
    return (
        <div>
            <h3>TagsArea</h3>
            <p>タグを選択してください</p>
            {/* <SelectBoxMulti
                label={"タグ"}
                options={tags}
                required={true}
                select={handleChangeMultiple}
                value={selectTagMulti}
            /> */}
            <MultipleSelect
                value={selected}
                handleChange={handleChange}
                options={tags}
            />
            <div>
                {/* {selected[0]}
                {selected[1]} */}
                {selected.map((tag, index) => {
                    return(
                        <div key={tag}>
                            <p>{tag }</p>
                        </div>
                    )
                })}
            </div>

            <p onClick={() => dispatch(push('/tags/edit'))}>新規タグを追加します。</p>
        </div>
    )
}

export default TagsArea
