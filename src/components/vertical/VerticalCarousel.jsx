import React,{useState,useEffect,useRef} from 'react'

const VerticalCarousel = props => {
    const stages = props.stages
    const positionRef = useRef()
    const sliderBoxHeightRef = useRef()
    const [position, setPosition] = useState(0)
    const [sliderBoxHeight, setSliderBoxHeight] = useState(0)
    positionRef.current = position
    sliderBoxHeightRef.current = sliderBoxHeight
    const mousewheel = event =>{
        console.log('mousewheel');
        // console.log(positionRef.current);
        if (event.deltaY < 0 && positionRef.current < 0) {
            console.log('scrolling up');
            console.log(positionRef.current);
            setPosition(prevPosition => prevPosition + 16)
        }
        if ((event.deltaY > 0) && ((sliderBoxHeightRef.current + positionRef.current) > 0)  ) {
            console.log('scrolling down');
            console.log(positionRef.current);
            console.log(sliderBoxHeightRef.current);
            console.log(sliderBoxHeightRef.current + positionRef.current);
            setPosition(prevPosition => prevPosition - 16) 
        } 
        // if (event.deltaY < 0  ) {
        //     console.log('scrolling up');
        //     setPosition(prevPosition => prevPosition + 50)
        // }
        // if ((event.deltaY > 0)  ) {
        //     console.log('scrolling down');
        //     setPosition(prevPosition => prevPosition - 50) 
        // } 
       
    }
    useEffect(()=>{
        window.addEventListener('mousewheel',mousewheel)

        return () => {
            window.addEventListener('mousewheel',mousewheel)
        }
    },[])
    useEffect(()=>{
        // console.log('useEffect clientHeight');
        const clientHeight = document.getElementById('sliderBoxv').clientHeight
        setSliderBoxHeight(clientHeight)
        // console.log(clientHeight);
    })
    return (
        <div className='c-verticalCarousel-box'
        id="sliderBoxv"
            style={{transform:`translate( -50%, calc(${position}px - 5rem)  )`}}
        >
            {stages.length > 0 && (
                stages.map(stage=>(
                    <div key={stage.id} className="c-verticalCarousel-element">
                        {/* {stage.stage}---Pos:{position} Height:{sliderBoxHeight} */}
                        <div className="c-verticalCarousel-title">
                            <div>{stage.stage}:{sliderBoxHeight}</div> 
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default VerticalCarousel
