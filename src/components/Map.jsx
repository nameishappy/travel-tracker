import { React, useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import  {useGeolocation} from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map = () => {

  const { cities } = useCities();
  
  const [mapPosition, setMapPosition] = useState([20.5937, 78.9629]);
  const [mapLat,mapLng]=useUrlPosition();
  const {isLoading:isLoadingGeolocation,position:geoLocationPosition,getPosition}=useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  },[geoLocationPosition])
  
  return (
    <div className={styles.mapContainer}>
      {<Button type="position" onClick={getPosition} disabled={isLoadingGeolocation}>
       { !isLoadingGeolocation?"Use your position":"Loading..."}
      </Button>}
      <div className={styles.map}>
        <MapContainer
          // center={[mapLat,mapLng]}
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => {
            
            return (
              <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                  {city.cityName}
                  <br /> {city.country}
                </Popup>
              </Marker>
            );
          })}
          <DetectClick/>
          <ChangeCenter position={mapPosition} />
        </MapContainer>
      </div>
    </div>
  );
};

function ChangeCenter({position}){
  const map=useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate=useNavigate();
  useMapEvent(
    {click:(e)=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}
  )
}


export default Map;
