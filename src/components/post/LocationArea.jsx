import React,{useState,  useEffect} from 'react'
import { push } from 'connected-react-router' 
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocatins } from '../../reducks/locations/operators'
import { getLocations } from '../../reducks/locations/selectors'
import { SelectBoxLocations } from '../UiKit/index'

const LocationArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)
    console.log('locationArea locationds',locations)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [position, setPosition] = useState({})
    const [images, setImages] = useState([])
    const handleChange = (selectedId) => {
        locations.forEach((location) => {
            if (location.id === selectedId) {
                console.log(location)
                setName(location.name)
                setAddress(location.address)
                setPosition(location.position)
                setImages(location.images)
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
                value={name}
            />
            <div>
                <p>{name}</p>
                <p>{address}</p>
                <p>
                    <span>経度：{position.lat}</span>
                    <span>緯度：{position.lng}</span>
                </p>
                {images.map((locationImage) => {
                return (
                    // <div key={locationImage.id}>
                    //     <img src={locationImage.path} alt="location title image" className="u-imageMini__test" />
                    //     <div>id:{locationImage.id}</div>
                    // </div>
                    <div key={locationImage.id}>
                        <video muted controls>
                        <source src={locationImage.path} type="video/mp4" />
                    </video>
                    </div> 
               )
            })}
            </div>
           
            <p onClick={() => dispatch(push('/location/edit'))}>ロケーションを追加します。</p>
        </div>
    )
}

export default LocationArea
