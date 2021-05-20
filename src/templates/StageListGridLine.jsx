import React,{useEffect} from  'react'
import {useDispatch, useSelector} from 'react-redux'
import {push} from 'connected-react-router'
import {fetchStages} from '../reducks/stage/operators'
import {getStages} from '../reducks/stage/selectors'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import{PostsInStage} from '../components/stage/index'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      padding:'8px 0'
    },
    gridList: {
      flexWrap: 'nowrap', 
      width: '100%',
    },
    heading:{
        color:'rgba(0, 0, 0, 0.8)',
    },
    subHeading:{
        color:'rgba(0, 0, 0, 0.5)'
    },
    accordion:{
        width:'100%',
    },
    summary:{
        width:'100%',
        height:'100px',
        display:'flex',
        flexFlow:'row wrape',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'0 .8rem' 
    },
    stageImage:{
        width:'auto',
        height:'100%',
        display:'block',
        marginRight:'1.6rem'
    }
  }));

const StageListGridLine = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const stages = getStages(selector)

    useEffect(()=> {
        dispatch(fetchStages())     
    },[])   

    return ( 
        <div className="l-container ">
            <div className="l-section ">
                    { stages.length > 0 &&(
                        stages.map(stage => (
                            <Accordion className={classes.accordion} key={stage.id}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                >
                                    <div className={classes.summary}>
                                        <div>
                                            <div className={classes.subHeading}>
                                                <span className=".h4">STAGE{stage.stageNo}-</span>
                                                <span className="p">{stage.stageYear}</span>
                                            </div>
                                            <h4 className={classes.heading}>{stage.stage}</h4>
                                        </div>
                                        <img src={stage.images[0].path} alt="" className={classes.stageImage}/>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <PostsInStage stage={stage}/> 
                                </AccordionDetails>
                            </Accordion> 
                        ))
                    )}
            </div>
        </div>
    )
}

export default StageListGridLine 

