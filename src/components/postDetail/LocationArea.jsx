import React,{useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {googleMapConfig} from "../../googleMap/config";
const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const divStyle = {
    color: "black",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "500",
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
  
const LocationArea = props => {
    const key = googleMapConfig.key
    const [lat,setLat] = useState(0)
    const [lng,setLng] = useState(0)
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [size, setSize] = useState(undefined);
    const infoWindowOptions = {
        pixelOffset: size,
    };
    const createOffsetSize = () => {
        return setSize(new window.google.maps.Size(0, -45));
    };
    const center = {
        lat: lat,
        lng: lng,
      };
   

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
                        <LoadScript googleMapsApiKey={key} onLoad={() => createOffsetSize()}>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                options={options}
                                center={center}
                                zoom={15}
                            >
                                <Marker 
                                    position={{
                                        lat: Number(lat),
                                        lng: Number(lng),
                                    }}
                                    label={{
                                        color: "blue",
                                        fontFamily: "sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        text:name,
                                    }}
                                />
                                <InfoWindow 
                                    position={{
                                        lat: Number(lat),
                                        lng: Number(lng),
                                        }}
                                options={infoWindowOptions}
                                
                                >
                                    <div style={divStyle} >
                                            <p>{address}</p>
                                    </div>
                                </InfoWindow>
                            </GoogleMap>
                        </LoadScript>
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
