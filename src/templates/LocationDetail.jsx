import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    accordion:{
        width:'100%',
    },
}))

const LocationDetail = () => {
    const classes = useStyles()
    let id = window.location.pathname.split('/location/detail')[1]
    if(id !== ''){
        id = id.split('/')[1]
    }
    console.log(id);
    return (
        <div className="l-container">
            <div className="l-section">
                <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div>
                            <h1>Accordion Location List</h1>
                            <p>{id}</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>detailes</p>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default LocationDetail
