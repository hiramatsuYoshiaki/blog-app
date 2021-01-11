import React from 'react'

const Recent = (props) => {
    return (
        <div>
            <h1>最近の投稿</h1>
            <h3>{props.post.title}</h3>
            <h3>{props.post.article}</h3>
            <h3>{props.post.type}</h3>
            <h3>{props.post.postDate}</h3> 
        </div>
    )
} 

export default Recent
