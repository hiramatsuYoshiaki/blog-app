import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocatins } from '../reducks/locations/operators'
import { getLocations } from '../reducks/locations/selectors'
import { LocationCard } from '../components/location/index'
import Button from '@material-ui/core/Button'
import {push} from 'connected-react-router'

const LocationList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)
    useEffect(() => {
        dispatch(fetchLocatins())
    },[dispatch])  
    return (
        <div className="l-container">
            <div className="l-section ">
                <div className="c-admin-wrape">
                    <section className="c-section-wrapin">
                        <h2>ロケーションリスト</h2>
                        <div className="p-grid__row"> 
                            {
                                locations.length > 0 && (
                                    locations.map(location => (
                                        <div key={location.id}>
                                            <LocationCard
                                                id={location.id}
                                                name={location.name}
                                                position={location.position}
                                                images={location.images}
                                            />
                                            {/* <LocationCard
                                                name={location.name} address={location.address}
                                                position={location.position} images={location.images}
                                            /> */}
                                        </div>
                                        
                                        // <ProductCard key={product.id}
                                        //     id={product.id} images={product.images}
                                        //     price={product.price} name={product.name}/>
                                    ))
                                )
                            }
                        
                        </div>
                    </section >
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

export default LocationList
