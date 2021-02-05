import React from 'react'
import Button from '@material-ui/core/Button';

const FilterPosts = props => {

    const stageNewFilter = () => {
        //投稿表示エリアのフィルターするキーを設定する
        const stages = props.stages
        const id = stages[stages.length - 1].id
        console.log(id)
        props.setFilter({type:'stage', key:id})
        props.setVolume(props.defaultVolume)
    }

    const postsNewFilter = () => {
        //投稿表示エリアのフィルターするキーを設定する
        props.setFilter({type:'post', key:''})
        props.setVolume(props.defaultVolume)
    }
    return (
        <div className='l-container-fluid c-filter-posts'>
            <div className='l-section'>
                <div className="c-filter-posts-element">
                    <Button variant="contained" size="small" 
                    onClick={() => postsNewFilter() } >New Post</Button>
                    <Button variant="contained" size="small"
                    onClick={() => stageNewFilter()} >New Stage</Button>
                </div>
            </div>
        </div>
    )
}

export default FilterPosts
