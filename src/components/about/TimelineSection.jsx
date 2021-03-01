import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    // paper: {
    //   padding: '6px 16px',
    // },
    // secondaryTail: {
    //   backgroundColor: theme.palette.secondary.main,
    // },
    dateColor:{
        color:'grey'
    }
  }));
const timelineDate = [
    {id:'2009',date:'2009',name:'TOURdeHDR First generation',dotType:'default', color:'default'},
    {id:'2013',date:'2013',name:'TOURdeHDR+ Second generation',dotType:'default', color:'primary'},
    {id:'2017',date:'2017',name:'h-works Special Site Collections',dotType:'outlined', color:'secondary'},
    {id:'2017',date:'2017',name:'h-works Special Site Collections',dotType:'outlined', color:'secondary'},
    {id:'2021',date:'2021',name:'h-works Third generation',dotType:'default', color:'default'},
]

const TimelineSection = props => {
    const classes = useStyles()
    return (
        <div className="c-timeline-wraper">
            <h5>Timeline</h5>
            <Timeline align="alternate">
                <TimelineItem>
                <TimelineOppositeContent>
                    <Typography >2009</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent >
                    <Typography>TOURdeHDR First generation</Typography>
                </TimelineContent>
                </TimelineItem>
                {/* ------------------------------------------------------ */}
                <TimelineItem>
                <TimelineOppositeContent>
                    <Typography >2013</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography>TOURdeHDR+ Second generation</Typography>
                </TimelineContent>
                </TimelineItem>
                {/* ------------------------------------------------------ */}
                <TimelineItem>
                <TimelineOppositeContent>
                    <Typography >2018</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="secondary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography>h-works Special Site Collections</Typography>
                </TimelineContent>
                </TimelineItem>
                {/* ------------------------------------------------------ */}
                <TimelineItem>
                <TimelineOppositeContent>
                    <Typography >2017</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="secondary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography>h-works Special Site Collections</Typography>
                </TimelineContent>
                </TimelineItem>
                {/* ------------------------------------------------------ */}
                <TimelineItem>
                <TimelineOppositeContent>
                    <Typography >2021</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography>h-works Third generation</Typography>
                </TimelineContent>
                </TimelineItem>
                {/* ------------------------------------------------------ */}
            </Timeline>
        </div>
    )
}


export default TimelineSection
