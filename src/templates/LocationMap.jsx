import React,{useState,useCallback,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getLocations} from '../reducks/locations/selectors'
import {fetchLocatins} from '../reducks/locations/operators'
import {MapArea} from '../components/locationMap/index'
import {MapMarker} from '../components/locationMap/index'

const LocationMap = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)

    useEffect(()=>{
        dispatch(fetchLocatins())
    },[])
    return (
        // <MapArea locations={locations}/>
        <MapMarker locations={locations}/>
        // <h1>locationMap</h1>
    )
}

export default LocationMap
