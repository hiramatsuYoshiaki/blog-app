import React,{useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import {googleMapConfig} from "../../googleMap/config";
import IconButton from "@material-ui/core/IconButton";
import LocationOnIcon from '@material-ui/icons/LocationOn'
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles((theme) => ({
    icon:{
        height:48,
        width:48,
        color:' #f50057',
    }
}))
const LocationArea = props => {
    const classes = useStyles()
    const key = googleMapConfig.key
    const [lat,setLat] = useState(0)
    const [lng,setLng] = useState(0)
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
   
    const Marker = ({ name }) => (
        <div className='c-location-marke-wrapin'> 
            <IconButton className={classes.icon}>
                <LocationOnIcon style={{ fontSize: 32 }}/>
            </IconButton>
            <div className="c-location-marker-text">
                <h3>{name.name}</h3>
                {/* <p>{name.address}</p> */}
            </div>
        </div>)

    useEffect(()=>{
        setLat(Number(props.locationLat))
        setLng(Number(props.locationLng))
        setName(props.locationName)
        setAddress(props.locationAddress)
    },[props.locationLat,props.locationLng,props.locationName,props.locationAddress])

    return (
        <div className="l-container-fluid c-locationarea">
            <div className="l-section-fluid" >
                <h1 className="c-locationarea-header">LOCATION</h1>
                <div className="c-locationarea-body" >
                    <div className="c-locationarea-section-element ">
                        <div className="c-locationarea-googlemap" >
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: key }}
                                center={{
                                    // lat: 34.661773,
                                    // lng: 133.934675
                                    lat: lat,
                                    lng: lng
                                }}
                                defaultZoom={15}
                            >
                                <Marker 
                                    lat={lat} 
                                    lng={lng} 
                                    name={{
                                        name:name,
                                        address:address
                                    }}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div className="c-locationarea-section-element ">
                        {props.locationImages.length > 0 && (
                            props.locationImages.map(image => (
                                <div key={image.id} className="c-locationarea-section-video ">
                                    <video  muted controls>
                                        <source src={image.path} type="video/mp4" />
                                    </video>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationArea
