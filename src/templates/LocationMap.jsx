import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getLocations} from '../reducks/locations/selectors'
import {fetchLocatins} from '../reducks/locations/operators'
import {MapMarker} from '../components/locationMap/index'

const LocationMap = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)

    useEffect(()=>{
        dispatch(fetchLocatins())
    },[])
    return (
        <MapMarker locations={locations}/>
    )
}

export default LocationMap
