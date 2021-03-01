import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { saveLocation } from '../reducks/locations/operators'
import { TextInput, PrimaryButton } from '../components/UiKit/index'
// import { ImagesArea } from '../components/post/index'
import { VideoArea, VideoUpload } from '../components/location/index'

import {db} from '../firebase/index'
import GoogleMapReact from 'google-map-react'
import {googleMapConfig} from "../googleMap/config";
import Button from '@material-ui/core/Button'
import {push} from 'connected-react-router'

const LocationEdit = () => {
    
    const dispatch = useDispatch()

    //window.location.pathname                             /location/edit/id 
    //window.location.pathname.split('/location/edit')[1]  /id 
    let id = window.location.pathname.split('/location/edit')[1]
    if (id !== '') {
        id = id.split('/')[1] 
    }

    const key = googleMapConfig.key
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [lat,setLat] = useState(34.661773)
    const [lng,setLng] = useState(133.934675)
    // const [position, setPosition] = useState({ lat: 35.71, lng: 139.72 })
    const [images, setImages] = useState([])

    const inputName = useCallback((e) => {
        setName(e.target.value)
    }, [setName])
    
    const inputAddress = useCallback((e) => {
        setAddress(e.target.value)
    }, [setAddress])
    
    const inputLat = useCallback((e) => {
        setLat(e.target.value)
    },[setLat])
    const inputLng = useCallback((e) => {
        setLng(e.target.value)
    }, [setLng])
    const Marker = ({ text }) => <div>{text}</div>;
    

    useEffect(() => {
        if (id !== "") {
            db.collection('locations').doc(id).get().then(snapshot => {
                const location = snapshot.data()
                setName(location.name)
                setAddress(location.address)
                setImages(location.images)
                setLat(location.position.lat)
                setLng(location.position.lng)
            })
        }
    },[id, setName, setAddress,setImages,setLat,setLng ])
    
    // const pos = { position: { lat: 35.71, lng: 139.72 } }
    // const marker_items = {
    //     marker_items: [
    //         { id: 1, position: { lat: 34.6616, lng: 135.5019 }, title: 'marker_1' }
    //         // { id: 2, position: { lat: 35.76, lng: 139.72 }, title: 'marker_2' },
    //     ]
    // }
    const setLocation = (lanPosition, lonPosition) =>  {
        const position = {
          lat: lanPosition,
          lng: lonPosition
        }
        return position
    }
    return (　
        <div className="l-container">
            <div className="l-section ">
                <div className="c-admin-wrape">
                    <h2>ロケーション新規作成</h2>
                    <h3>Location map</h3>
                    <div className="p-googleMapWrap" >
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: key }}
                        center={{
                            lat: lat,
                            lng: lng
                        }}
                        defaultZoom={15} 
                        >
                            <Marker lat={lat} lng={lng} text="Marker" className="u-marker"/>
                        </GoogleMapReact>
                    </div>

                    <h3>Location address</h3>
                    <TextInput
                        fullWidth={true} label={"名称"} multiline={false} required={true}
                        rows={1} value={name} type={"text"} onChange={inputName}
                    />
                    <TextInput
                        fullWidth={true} label={"住所"} multiline={true} required={true}
                        rows={3} value={address} type={"text"} onChange={inputAddress}
                    />
                    <TextInput
                        fullWidth={true} label={"緯度(latitude)"} multiline={false} required={true}
                        rows={1} value={lat} type={"number"} onChange={inputLat}
                    />
                    <TextInput
                        fullWidth={true} label={"経度(longitude)"} multiline={false} required={true}
                        rows={1} value={lng} type={"number"} onChange={inputLng}
                    />
                    
                    {/* <ImagesArea images={images} setImages={setImages} imageTypes={"グーグルアース"}
                        blobType={blobTypeMp4} accept={"video/mp4"} media={"video"}/>  */}
                    
                    <VideoArea images={images} setImages={setImages}  /> 
                    <VideoUpload images={images} setImages={setImages} />
                    <PrimaryButton
                        label={"新規ロケーション登録"}
                        onClick={() => dispatch(saveLocation(id, name, address, setLocation(lat,lng), images))}
                    />
                    <div>
                        <Button onClick={()=> dispatch(push('/admin'))}>
                            <p>Back to Admin Menu</p>
                        </Button> 
                    </div>
                </div> 
            </div> 
        </div> 
    )
}

export default LocationEdit
