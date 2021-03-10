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
import Link from '@material-ui/core/Link';
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
const histories = [
    {id:'200901',date:'2009',name:'TOURdeHDR First generation',variant:'default', color:'primary',link:'http://tourdehrd.blog62.fc2.com/'},
    {id:'201301',date:'2013',name:'TOURdeHDR+ Second generation',variant:'default', color:'primary', link:'http://tourdehdr.sakuratan.com/site2/'},
    {id:'201501',date:'2013-15',name:'TOURdeHDR+ Gallery 2013-15',variant:'default', color:'primary', link:'http://tourdehdr.sakura.ne.jp/web3/tourdehdr_web3/'},
    {id:'201601',date:'2016',name:'TOURdeHDR+ Gallery',variant:'outlined', color:'default', link:'http://tourdehdr.sakura.ne.jp/web3/cyber-shot-gallery/'},
    {id:'201602',date:'2016',name:'TOURdeHDR+ AWARD 2016',variant:'outlined', color:'secondary', link:'http://tourdehdr.sakura.ne.jp/web3/cyber-shot-gallery/nomi.html'},
    {id:'201701',date:'2017',name:'TOURdeHDR+ Gallery',variant:'outlined', color:'default', link:'http://tourdehdr.sakura.ne.jp/web3/tourdehdr-gallery2017/index.html'},
    {id:'201702',date:'2017',name:'TOURdeHDR+ AWARD 2017',variant:'outlined', color:'secondary', link:'http://tourdehdr.sakura.ne.jp/web3/digest2017/#/'},
    {id:'201801',date:'2018',name:'TOURdeHDR+ AWARD Gallery',variant:'outlined', color:'secondary', link:'http://tourdehdr.sakura.ne.jp/web3/bgvideo-2018/#/'},
    {id:'202001',date:'2020',name:'h-works Third generation',variant:'default', color:'primary', link:'https://tourdehdr3.netlify.app/'},
    {id:'202101',date:'2021',name:'h-works 4th generation',variant:'default', color:'primary', link:'https://blog-app-4302d.web.app/'},
]

const TimelineSection = props => {
    const classes = useStyles()
    return (
        <div className="c-timeline-wraper">
            <h5>HISTORY</h5>
            <Timeline align="alternate">
                {histories.map(history=>(
                    <TimelineItem key={history.id}>
                        <TimelineOppositeContent>
                            <Typography >{history.date}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot variant={history.variant} color={history.color}/>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent >
                            <Typography>
                                <Link href={history.link}  target="_blank" color="inherit">
                                    {history.name} 
                                </Link>
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    )
}


export default TimelineSection
