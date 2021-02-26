import React,{useCallback} from 'react'
import GoogleMapReact from 'google-map-react'
import {googleMapConfig} from "../../googleMap/config";

const MapArea = props => {
    const key = googleMapConfig.key
    const locations = props.locations
    console.log('MapArea');
    console.log(locations);

    const defaultLatLng = {
        lat: 34.661773,
        lng: 133.934675,
      };
    const items = [
        {
          lat: 35.7022589,
          lng: 139.7744733,
        },
        {
          lat: 34.7022589,
          lng: 139.7744733,
        },
        {
          lat: 36.7022589,
          lng: 139.7744733,
        },
      ];
    //マーカーが1個
    //   const handleApiLoaded = ({ map, maps }) => {
    //     new maps.Marker({
    //       map,
    //       position: defaultLatLng,
    //     });
    //   };
    
    //マーカー複数で範囲内に表示
    const handleApiLoaded = ({ map, maps }) => {
        const bounds = new maps.LatLngBounds();
        items().forEach((item) => {
            const marker = new maps.Marker({
              position: {
                lat:item.lat,
                lng:item.lng,
              },
              map,
              title: "Hello World!",
            });
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
      };

    const handleApiLoadedSet = useCallback(({ map, maps })=>{
        const bounds = new maps.LatLngBounds();
        console.log(locations);
        console.log('handleApiLoadedSet ');

        locations.forEach((location) => {
            const marker = new maps.Marker({
              position: {
                lat:location.position.lat,
                lng:location.position.lng,
              },
              map,
              title: "Hello World!",
            });
            bounds.extend(marker.position);
        });
        return map.fitBounds(bounds);
    })
   
   
    return (
        <div className="c-locationarea-map-googlemap" >
            <GoogleMapReact
                bootstrapURLKeys={{ key: key }}
                defaultCenter={defaultLatLng}
                defaultZoom={5}
                onGoogleApiLoaded={({ map, maps } )=>handleApiLoadedSet({ map, maps })}
                yesIWantToUseGoogleMapApiInternals
            >
            </GoogleMapReact>
        </div>
    )
}


export default MapArea

