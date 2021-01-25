import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: 8,
        height: 16,
        width: 16
    }
  })); 

const PostArea = props => {
    const classes = useStyles();
    return (
        <div className="l-container c-postarea">
            <div className="l-section" >

                <div className="c-postarea-header">
                    <h3 className="c-postarea-header-stage">
                        <span>STAGE</span>
                        <span>{props.stageNo}</span>
                        <span>/</span>
                        <span>{props.stageYear}</span>
                    </h3>
                    <p  className="c-postarea-header-stagetitle">
                        
                        <span>{props.stage}</span> 
                    </p>
                </div>

                {props.postImages.length > 0 && (
                    props.postImages.map(image => (
                        <div key={image.id} className="c-postarea-body-image">
                            <div className="c-postarae-image">
                                <img src={image.path} alt={image.description}  />
                            </div>
                            <div className="c-postarae-description">
                                {image.description}  
                            </div>
                        </div>
                    ))
                )}
                
                <div className="c-postarea-body">
                    <div className="c-postarea-body-article">
                        <div>
                            <LabelIcon className={classes.icon}/>
                            {props.stage}
                        </div>
                        <div>{props.article}</div>
                        <div>
                            <CalendarTodayIcon className={classes.icon} />
                            {props.postDate.split('T')[0] }
                        </div>
                    </div>
                    <div className="c-postarea-body-location">
                        <div>
                            <LocationOnIcon className={classes.icon}/>
                            ロケーション
                        </div>
                        <div>
                            {props.locationName }
                        </div>
                        <div>
                            {props.locationAddress }
                        </div>
                    </div>
                    
                    <div className="c-postarea-body-tags">
                        <div className="c-postarea-body-tags-title">
                            <LocalOfferIcon  className={classes.icon}/> TAG
                        </div>
                        
                        {props.tags.length > 0 && (
                            props.tags.map(tag => (
                                <span key={tag.id}>
                                    <span className="c-tag">
                                        {tag.name}
                                        </span>
                                </span>
                            ))
                        )} 
                    </div>
                </div>
                
               
            </div>
        </div>
    )
}

export default PostArea
