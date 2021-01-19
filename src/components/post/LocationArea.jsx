import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocatins } from '../../reducks/locations/operators'
import { getLocations } from '../../reducks/locations/selectors'
import { SelectBoxLocations } from '../UiKit/index'

const LocationArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)
    
    const handleChange = (selectedId) => {
        locations.forEach((location) => {
            if (location.id === selectedId) {
                props.setLocation(location)
            }
        })
    }

    useEffect(() => {
        dispatch(fetchLocatins())
    },[dispatch])
    return (
        <div>
            <h3>Location Area</h3>
            <p>ロケーションを選択してください</p>
            <SelectBoxLocations
                label={"ロケーション"}
                options={locations}
                required={true}
                select={handleChange}
                value={props.location.id || ''}
            />
            {/* <div>
                <p>{name}</p>
                <p>{address}</p>
                <p>
                    <span>経度：{position.lat}</span>
                    <span>緯度：{position.lng}</span>
                </p>
                {images.map((locationImage) => {
                return (
                    <div key={locationImage.id} >
                        <video muted controls className="p-videoPreview__img">
                            <source src={locationImage.path} type="video/mp4" />
                        </video>
                    </div> 
               )
            })}
            </div> */}
           
        </div>
    )
}

export default LocationArea
