import React from 'react'
import { PostImageCard } from './index'
import { useDispatch } from 'react-redux'
import {push} from 'connected-react-router'
 
const Newest = (props) => {
    const dispatch = useDispatch()
    const postDate = props.post.postDate.split('T') 
    const postImages = props.post.postImages
    return (
        <div>
            <h1> 最新の投稿</h1>
            <h3>{props.post.title}</h3>
            {props.post.topImages.length > 0 && (
                <div>
                    <img className="p-topImage"
                    src={props.post.topImages[0].path}
                    alt={props.post.title}
                    />
                    <p>{props.post.topImages[0].description }</p>
                </div>
                
             )} 
            <h5>{props.post.article}</h5>
            <p>{postDate[0]}</p> 
            {/* <div> 
                {
                    postImages.map((postImage) => (
                        <PostImageCard
                            id={postImage.id}
                            path={postImage.path}
                            description={postImage.description}
                            key={postImage.id} />
                    ))
                }
            </div> */}
            <div onClick={() => dispatch(push('/post/detail/' + props.post.id))}>この投稿を見る</div>
            {/* <h1>data-----------------</h1>
            <p>title--{props.post.title}</p>
            <p>article--{props.post.article}</p>
            <p>type--{props.post.type}</p>
            <p>postDate--{props.post.postDate}</p> 
            <p>topImages--{props.post.topImages[0].path}</p> 
            <p>postImages--{props.post.postImages[0].path}</p> 
            <p>postImages--{props.post.postImages[1].path}</p>  */}
               
        </div>
    )
}

export default Newest
