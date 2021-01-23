import React,{useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import {googleMapConfig} from "../../googleMap/config";
import { SelectBoxLocations } from '../UiKit';

const LocationArea = props => {
    const key = googleMapConfig.key
    const [lat,setLat] = useState(0)
    const [lng,setLng] = useState(0)
   
    const Marker = ({ text }) => <div>{text}</div>;

    useEffect(()=>{
        setLat(Number(props.locationLat))
        setLng(Number(props.locationLng))
    },[props.locationLat,props.locationLng])

    return (
        <div className="l-container-fluid c-locationarea">
            <div className="l-section-fluid" >
                <h1 className="c-locationarea-header">LOCATION</h1>
                <div className="c-locationarea-body" >
                    <div className="c-locationarea-section-element ">
                    {/* <p>{props.locationName}</p>
                    <p>{props.locationAddress}</p> */}
                    {/* <p>{props.locationLat}</p>
                    <p>{props.locationLng}</p>
                    <p>{lat}</p>
                    <p>{lng}</p> */}
                   
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
                                text="Marker" 
                                className="u-marker"
                            />
                        </GoogleMapReact>
                    </div>

                    </div>
                    <div className="c-locationarea-section-element ">
                    {props.locationImages.length > 0 && (
                        props.locationImages.map(image => (
                            <div key={image.id} className="c-locationarea-section-video ">
                                <video  muted autoplay controls>
                                    <source src={image.path} type="video/mp4" />
                                </video>
                            </div>
                        ))
                    )}
                    </div>
                </div>
                
                    

                    {/* <p>{locationName}</p>
                    <p>{locationAddress}</p>
                    <p>{locationLat}</p>
                    <p>{locationLng}</p>
                    {locationImages.length > 0 && (
                        locationImages.map(image => (
                            <div key={image.id}>
                                <video  muted className="p-imagePreview__img">
                                    <source src={image.path} type="video/mp4" />
                                </video>
                            </div>
                        ))
                    )} */}
            </div>
        </div>
    )
}

export default LocationArea
