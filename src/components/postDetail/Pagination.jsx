import React from 'react'
import {RoundPaginations} from '../UiKit/index'

const Pagination = props => {
    return (
        <div className="l-container-fluid c-paginations">
            <div className="l-section-fluid" >
                <div className="c-locationarea-body" >
                    <RoundPaginations />
                </div>
            </div>
        </div>
    )
}

export default Pagination
