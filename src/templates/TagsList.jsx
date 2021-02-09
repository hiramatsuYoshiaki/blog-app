import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../reducks/tags/seloctors'
import { fetchTags } from '../reducks/tags/operators'
import { TagsCard } from '../components/tags/index'
import Button from '@material-ui/core/Button'
import {push} from 'connected-react-router'

const TagsList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const tags = getTags(selector) 
    useEffect(() => {
        dispatch(fetchTags())
    },[dispatch])
    return (
        <div className="l-container">
            <div className="l-section ">
                <div className="c-admin-wrape">
                <h2>タグリスト</h2>
                    {
                        tags.length > 0 && (
                            tags.map((tag) => (
                                <TagsCard key={tag.id}
                                id={tag.id} name={tag.name} />
                            ))
                        )
                    }
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

export default TagsList 
