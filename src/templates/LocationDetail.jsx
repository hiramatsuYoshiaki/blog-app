import React,{useEffect,useState,useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getLocations} from  '../reducks/locations/selectors'
import {getStages} from '../reducks/stage/selectors'
import {fetchLocatins} from '../reducks/locations/operators'
import {LocationInPosts} from '../components/locationMap/index'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    accordion:{
        width:'100%',
    },
    summary:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexFlow:'row wrape',
        alignItems:'center',
        padding:'0 .8rem',
        [theme.breakpoints.down('sm')]:{
            justifyContent:'flex-start',
            flexDirection:'column'
        },
        [theme.breakpoints.up('sm')]:{
            justifyContent:'space-between',
            flexDirection:'row'
        }
    },
    stageImage:{
        width:'auto',
        height:'100%',
        display:'block',
        marginRight:'1.6rem'
    },
    heading:{
        color:'rgba(0, 0, 0, 0.8)',
    },
    subHeading:{
        color:'rgba(0, 0, 0, 0.5)'
    },
    video:{
        width:'300px',
        height:'200px',
        overflow:'hidden'
    }
}))

const LocationDetail = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)
    
    let id = window.location.pathname.split('/location/detail')[1]
    if(id !== ''){
        id = id.split('/')[1]
    }
    const selectLocationsById = useCallback((id)=>{
        if(id !==''){
            return locations.filter(location=> location.id === id)
        } else{
            return locations
        }
    },[id])
    
    useEffect(()=>{
        dispatch(fetchLocatins()) 
    },[])
    return (
        <div className="l-container">
            <div className="l-section">
                {selectLocationsById(id).map(selectLocation=>(
                    <Accordion className={classes.accordion} key={selectLocation.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {/* <div>
                                <h1>{selectLocation.name}</h1>
                                <p>{selectLocation.address}</p>
                            </div> */}
                            <div className={classes.summary}>
                                <div>
                                    <h4 className={classes.heading}>{selectLocation.name}</h4>
                                    <div className={classes.subHeading}>
                                        <span classNmae=".h4">住所：{selectLocation.address}</span>
                                    </div>
                                </div>
                                <div>
                                    <video  muted controls className={classes.video}>
                                        <source src={selectLocation.images[0].path} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                           <LocationInPosts id={selectLocation.id} />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default LocationDetail
