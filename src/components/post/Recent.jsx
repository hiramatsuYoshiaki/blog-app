import React from 'react'
import {useDispatch} from 'react-redux'
import { push } from 'connected-react-router'

const Recent = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            <h1>最近の投稿</h1>
            <h3>{props.post.id}</h3>
            <h3>{props.post.title}</h3>
            <h3>{props.post.article}</h3>
            <h3>{props.post.type}</h3>
            <h3>{props.post.postDate}</h3>  
            <div onClick={() => dispatch(push('/post/detail/' + props.post.id))}>この投稿を見る</div>
        </div>
    )
} 

export default Recent
