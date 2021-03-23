import React,{useState} from 'react'
import ChildrenTest from '../components/transition/ChildrenTest.jsx'
const ComponentTransitionTest = () => {
    const [isVisible, setIsVisible] = useState(false)
    const toggleEnterStart = () => {
        setIsVisible(!isVisible)
    }
    return (
        <div style={{margin:'10px'}}>
            <button 
                onClick={()=>toggleEnterStart()}
                style={{backgroundColor:'green',color:'white', overflow:'hidden'}}>
                toggle Conponent View
            </button>
            <ChildrenTest in={isVisible}/>
        </div>
    )
}

export default ComponentTransitionTest

