import React,{useState,useEffect,useRef} from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    img: {
        // marginRight:'20%',
        [theme.breakpoints.down('sm')]: {
            width:'128px',
            height:'80px'
        },
        [theme.breakpoints.up('sm')]: {
            width:'200px',
            height:'150px'
        },
        [theme.breakpoints.up('md')]: {
            width:'400px',
            height:'250px'
        },
        [theme.breakpoints.up('lg')]: {
            width:'800px',
            height:'500px'
        },
    },
}))


const HorizontalCarousel = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const positionRef = useRef(); 
    const BoxWidthRef = useRef(); 
    const windowWidthRef = useRef(); 
    const [position,setPosition] = useState(0)
    const [sliderBoxWidth,setSliderBoxWidth] = useState(0)
    const [windowWidth,setWindowWidth] = useState(window.innerWidth)
    const [loaded, setLoaded] = useState(false);
    positionRef.current = position
    BoxWidthRef.current = sliderBoxWidth
    windowWidthRef.current = windowWidth
    const stages = props.stages
    
    const mousewheel = event =>{
        // console.log(typeof(event.deltaY));
        // console.log(event.deltaY);
        if (event.deltaY < 0 && positionRef.current < 0) {
            // console.log('scrolling up');
            setPosition(prevPosition => prevPosition + 30)
        }
        if ((event.deltaY > 0) && ((BoxWidthRef.current + positionRef.current) - windowWidthRef.current > 0)  ) {
            // console.log('scrolling down');
            setPosition(prevPosition => prevPosition - 30) 
        } 
        // console.log(positionRef.current);
        // console.log(BoxWidthRef.current);
        // console.log(windowWidthRef.current);
    }
    const handleResize = event => {
        console.log('handleResize: ');
        // console.log('window.innerWidth: ' + window.innerWidth);
        // console.log('window.innerHeighth: ' + window.innerHeight);
        setWindowWidth(window.innerWidth)
        const clientWidth = document.getElementById('sliderBox').clientWidth
        setSliderBoxWidth(clientWidth)
    }
    const onLoad = () => {
        console.log('loaded');
        setLoaded(true);
        const clientWidth = document.getElementById('sliderBox').clientWidth
        console.log('clientWidth',clientWidth);
        console.log('BoxWidthRef.current',BoxWidthRef.current);
        setSliderBoxWidth(clientWidth)
    }

    useEffect(()=>{
        console.log( 'addEventListener resize');
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousewheel',mousewheel)

        return () => {
            window.addEventListener('mousewheel', mousewheel)
            window.addEventListener('resize', handleResize);
        }
    },[])

    return (

        // <div className="c-horizontalCarousel">
        //     <div className="c-horizontalCarousel-wrapper">
                
                <div id="sliderBox" className="c-horizontalCarousel-box" 
                    style={{transform:`translate(${position}px,-50%)`}}
                    onClick={()=>dispatch(push('/'))}
                >
                        {stages.length > 0 && (
                            stages.map(stage=>(
                                <div className={classes.img} key={stage.id}  >
                                    <img src={stage.images[0].path} 
                                         alt={stage.stage} 
                                         onLoad={() => onLoad()}
                                         className="c-horizontalCarousel-image-size" />
                                    <p>box:{sliderBoxWidth}-pos:{position}-win:{ windowWidth}</p>
                                </div>
                            ))
                        )}
                </div>

        //     </div>
        // </div>
    )
}

export default HorizontalCarousel
