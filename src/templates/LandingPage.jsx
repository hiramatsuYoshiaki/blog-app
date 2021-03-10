import React,{useState,useEffect} from 'react'
import image from '../assets/img/img4121_flat.jpg'

const LandingPage = () => {
  const [horizontalPosition, setHorizontalPosition] = useState(0)
  // const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [bodyOffset, setBodyOffset] = useState(
  //   document.body.getBoundingClientRect()
  // );
  // const [scrollY, setScrollY] = useState(bodyOffset.top);
  // const [scrollX, setScrollX] = useState(bodyOffset.left);
  // const [scrollDirection, setScrollDirection] = useState();
  
  const listener = event => {
        console.log('listener scroll');
        console.log('event' + event);
        // setBodyOffset(document.body.getBoundingClientRect());
        // setScrollY(-bodyOffset.top);
        // setScrollX(bodyOffset.left);
        // setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
        // setLastScrollTop(-bodyOffset.top);

        // console.log(bodyOffset.top);
        // console.log(bodyOffset.left);
        // console.log('window.innerWidth: ' + window.innerWidth);
        // console.log('window.innerHeight: ' + window.innerHeight);

        console.log('window.pageXOffset: ' + window.pageXOffset);
        console.log('window.pageYOffset: ' + window.pageYOffset);

        console.log('window.scrollX: ' + window.scrollX);
        console.log('window.scrollY: ' + window.scrollY);

        console.log('document.documentElement.scrollTop: ' + document.documentElement.scrollTop);
        console.log('document.body.scrollTop: ' + document.body.scrollTop);


       
       
      };
    const mousewheel = event => {
      console.log('mousewheel: ');
        console.log('event.deltaY: ' + event.deltaY);
        const pos = horizontalPosition + event.deltaY
        setHorizontalPosition(pos)
        console.log(pos);
        if (event.deltaY < 0) {
            console.log('scrolling up');
        // this.back_page();
            // setHorizontalPosition(horizontalPosition - 100)
        }
        if (event.deltaY > 0) {
            console.log('scrolling down');
            // this.next_page();
            // setHorizontalPosition(horizontalPosition + 100)
          } 
          // getheight();
    }
    const handleResize = event => {
        console.log('handleResize: ');
        console.log('window.innerWidth: ' + window.innerWidth);
        console.log('window.innerHeighth: ' + window.innerHeight);
    }
    // const getheight = event => {
    //     console.log('getheight');
    //     const boxlist = document.getElementByClass('.box');
    // }
    useEffect(() => {
        console.log('useEffect listener');
        window.addEventListener('scroll', listener);
        return () => {
          window.removeEventListener('scroll', listener);
          
        };
      },[]);
    useEffect(() => {
        console.log('useEffect mousewheel');
        window.addEventListener('mousewheel', mousewheel);
        return () => {
          window.removeEventListener('mousewheel',mousewheel);
        };
      },[]);
    useEffect(() => {
        console.log('useEffect handleResize');
        window.addEventListener('resize', handleResize);
        return () => {
          window.addEventListener('resize', handleResize);
        };
      },[]); 
    return (
        <div className='c-landingpage-wrapper'>
            <div className='c-landingpage-horizontal-box' 
              id="horizonBox" 
              style={{transform:`translatex(${horizontalPosition}px)`}}>

                <div className="c-landingpage-image-wrapper">
                        <img src={image} alt="img" />
                </div>
                {/* <div className="c-landingpage-image-wrapper">
                        <img src={image} alt="img" />
                </div>
                <div className="c-landingpage-image-wrapper">
                        <img src={image} alt="img" />
                </div>
                <div className="c-landingpage-image-wrapper">
                        <img src={image} alt="img" />
                </div>
                <div className="c-landingpage-image-wrapper">
                        <img src={image} alt="img" />
                </div> */}
                <div style={{color:'white'}}>{horizontalPosition}</div>
            </div>
            
            {/* <div className='c-landingpage-virtical-box' id="virticalBox">
                <p>scroll:{horizontalPosition}</p>
                <h1>virtical scroll box1</h1>
                <h1>virtical scroll box2</h1>
                <h1>virtical scroll box3</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
                <h1>virtical scroll box4</h1>
            </div> */}
        </div>
       
    )
}

export default LandingPage
