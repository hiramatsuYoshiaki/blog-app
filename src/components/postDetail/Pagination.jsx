import React from 'react'
import {RoundPaginations} from '../UiKit/index'

const Pagination = props => {
    return (
        <div className="l-container-fluid c-paginations">
            <div className="l-section-fluid" >
                <div className="c-locationarea-body" >
                    <h1 style={{color:'white'}}>Pagination</h1>
                    <RoundPaginations posts={props.posts} id={props.id}/>  
                </div>
            </div>
        </div>
    )
}

export default Pagination
