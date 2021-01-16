import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../reducks/tags/seloctors'
import { fetchTags } from '../reducks/tags/operators'
import { TagsCard } from '../components/tags/index'

const TagsList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const tags = getTags(selector) 
    console.log(tags)
    useEffect(() => {
        dispatch(fetchTags())
    },[dispatch])
    return (
        <section>
            <div>
                <h1>Tags List</h1>
                {
                    tags.length > 0 && (
                        tags.map((tag) => (
                            <TagsCard key={tag.id}
                            id={tag.id} name={tag.name} />
                        ))
                    )
                }
            </div>
        </section>
    )
}

export default TagsList 
