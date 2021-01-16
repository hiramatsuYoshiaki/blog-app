import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocatins } from '../reducks/locations/operators'
import { getLocations } from '../reducks/locations/selectors'
import { LocationCard } from '../components/location/index'

const LocationList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const locations = getLocations(selector)
    console.log(locations);
    useEffect(() => {
        dispatch(fetchLocatins())
    },[dispatch]) 
    return (
        <section className="c-section-wrapin">
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
    )
}

export default LocationList
