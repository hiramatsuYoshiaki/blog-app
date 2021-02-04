import React from 'react'
import Button from '@material-ui/core/Button';

const FilterPosts = props => {

    const stageNewFilter = () => {
        const stages = props.stages
        const id = stages[stages.length - 1].id
        console.log(id)
        props.setFilter({type:'stage', key:id})
        props.setVolume(1)
    }

    const postsNewFilter = () => {
        props.setFilter({type:'post', key:''})
        props.setVolume(1)
    }
    return (
        <div className='l-container-fluid c-filter-posts'>
            <div className='l-section'>
                <div className="c-filter-posts-element">
                    <Button variant="contained" size="small" 
                    // onClick={() => props.setFilter({type:'post', key:''})} >New Post</Button>
                    onClick={() => postsNewFilter() } >New Post</Button>
                    <Button variant="contained" size="small"
                    onClick={() => stageNewFilter()} >New Stage</Button>
                    {/* <Button variant="contained" size="small">Location</Button>
                    <Button variant="contained" size="small">Tags</Button> */}
                    {/* <Button variant="contained" size="small">Date</Button> */}
                </div>
            </div>
        </div>
    )
}

export default FilterPosts