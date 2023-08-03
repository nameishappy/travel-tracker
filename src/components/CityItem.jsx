import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const {currentCity,isLoading,deleteCity}=useCities();
  const { cityName, emoji, date,position,id } = city;

  function handleClick(e){
    e.preventDefault();
    deleteCity(id);
  }
 
  return (
    <div >
      <ul>
        <li>
          <Link className={`${styles.cityItem} ${(id===currentCity.id)?styles["cityItem--active"]:''}`} to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
