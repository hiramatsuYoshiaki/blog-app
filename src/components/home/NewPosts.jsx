import React from 'react';
import {NewPostsArea} from './index'

const NewPosts = (props) => {
    const posts = props.posts
    console.log('NewPosts posts', posts);
    return (
        <div className='l-container-fluid'>
            <div className='l-section'>
                <div  className="c-new-post-wrape">
                    {posts.length > 0 && (
                        posts.map(post =>(
                            <NewPostsArea post={post} key={post.id}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewPosts
