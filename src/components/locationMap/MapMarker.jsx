import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {googleMapConfig} from "../../googleMap/config";

const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  const divStyle = {
    background: "white",
    fontSize: 7.5,
  };
  const options = {
    styles:[
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "weight": "2.00"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#9c9c9c"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7b7b7b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8d7d4"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#070707"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        }
    ],
    disableDefaultUI: false,
    // デフォルトUI（衛星写真オプションなど）をキャンセルします。
    zoomControl: true,
  };   
  const center = {
    lat: 35.181451,
    lng: 136.906557,
  };

    const MapMarker = props => {
    const dispatch = useDispatch()
    const key = googleMapConfig.key
    const locations = props.locations
    console.log(locations);
    const [size, setSize] = useState(undefined);
    const infoWindowOptions = {
        pixelOffset: size,
    };
    const createOffsetSize = () => {
        return setSize(new window.google.maps.Size(0, -45));
    };
    return (
        <LoadScript googleMapsApiKey={key} onLoad={() => createOffsetSize()}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={5}
            >
                {locations.length > 0 && (
                    locations.map((location,index)=>(
                        <div key={location.id}>
                            <Marker 
                                position={{
                                    lat: Number(location.position.lat),
                                    lng: Number(location.position.lng),
                                }}
                                label={{
                                    color: "white",
                                    fontFamily: "sans-serif",
                                    fontSize: "15px",
                                    fontWeight: "100",
                                    text: String(index + 1),
                                }}
                                onClick={()=>dispatch(push('/location/detail/' + location.id))}
                            />
                            <InfoWindow 
                                position={{
                                    lat: Number(location.position.lat),
                                    lng: Number(location.position.lng),
                                    }}
                            options={infoWindowOptions}
                            
                            >
                                <div style={divStyle} onClick={()=>dispatch(push('/location/detail/'  + location.id))}>
                                        <p>{location.name}</p>
                                </div>
                            </InfoWindow>
                        </div> 
                    ))
                )}
                {/* <Marker position={positionAkiba} label={markerLabelAkiba}/>
                <Marker position={positionIwamotocho} label={markerLabelIwamotocho}/> */}
            </GoogleMap>
        </LoadScript>
    )
}


export default MapMarker
