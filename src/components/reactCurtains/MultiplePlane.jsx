import React, { useState, useRef } from 'react'
import {useCurtainsEvent} from 'react-curtains'
import SinglePlane from "./SinglePlane.jsx";
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    MultiplePlanes: {
        width: '80vw',
        margin: '0 auto',
        padding: '40px 0',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        overflowAnchor: 'none',

        //test
        // width:'auto', 
        // height:'200vh' 
    },
    
    MultiplePlanesWrapper: {
        display: 'flex',
        flexWrap: 'wrap ',
        //test
        // flexDirection:'row'

    },
    
    MultiplePlanesAddPlanes: {
        '-webkit-appearance': 'none',
        border: 0,
        font: 'inherit',
        cursor: 'pointer',
        background: '#ee6557',
        color: 'white',
        display: 'inline-block',
        padding: '0.25em 0.5em',
        '&:hover': {
            background: 'black',
        }
    },
}))
const MultiplePlane = props => {
    const classes = useStyles()
    // keep track of the planes
    const [nbPlanes, setNbPlanes] = useState(4);
    const [planes, setPlanes] = useState([]);

    const planesDeformations = useRef(0);

    useCurtainsEvent(
        "onRender",
        (curtains) => {
          // update our planes deformation
          // increase/decrease the effect
          planesDeformations.current = curtains.lerp(
            planesDeformations.current,
            0,
            0.075
          );
    
          // update planes deformations
          planes.forEach((plane) => {
            plane.uniforms.planeDeformation.value = planesDeformations.current;
          });
        },
        [planes]
      );
    useCurtainsEvent("onScroll", (curtains) => {
        // get scroll deltas to apply the effect on scroll
        const delta = curtains.getScrollDeltas();
    
        // invert value for the effect
        delta.y = -delta.y;
    
        // threshold
        if (delta.y > 60) {
          delta.y = 60;
        } else if (delta.y < -60) { 
          delta.y = -60;
        }
    
        if (Math.abs(delta.y) > Math.abs(planesDeformations.current)) {
          planesDeformations.current = curtains.lerp(
            planesDeformations.current,
            delta.y,
            0.5
          );
        }
      });
    const addPlanes = () => {
        setNbPlanes(nbPlanes + 4);
      };
    
    const onPlaneReady = (plane) => {
        setPlanes((planes) => [...planes, plane]);
      };

    const buildPlane = (index) => {
        return (
            <SinglePlane  
                key={index} 
                index={index} 
                onPlaneReady={onPlaneReady} 
            />
        );
      };
    const allPlanes = [];
    for (let i = 0; i < nbPlanes; i++) {
        allPlanes.push(buildPlane(i));
    }




    return (
        <div className={classes.MultiplePlanes}>
            <div className={classes.MultiplePlanesWrapper}>
                {allPlanes.map((planeEl) => {
                    return planeEl;
                })}
            </div>
            
            <button 
                className={classes.MultiplePlanesAddPlanes} 
                onClick={addPlanes}
            >
                Add more planes
            </button>

        </div>
    )
}


export default MultiplePlane
// react-curtains
// https://www.npmjs.com/package/react-curtains
// https://codesandbox.io/s/react-curtains-multiple-planes-zh9bt?file=/src/components/MultiplePlanes/index.js:1959-1978
// 2021.4.14 removal animation-page 