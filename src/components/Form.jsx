// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
  .toUpperCase()
  .split("")
  .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const {createCity,isLoading}=useCities();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState(null);
  const navigate=useNavigate();
  useEffect(
    function () {
      if (!lat || !lng) {
        return;
      }
      async function fetchData() {
        setGeocodingError(null);
        try {
          setIsGeocodingLoading(true);
          const data = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const res = await data.json();

          if (res.countryCode === "") {
            throw new Error(
              "That doesn't seems to be a country. Click somewhere else"
            );
          }
          setCityName(res.city || res.locality || "");
          setCountry(res.countryName || "");
          setEmoji(convertToEmoji(res.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsGeocodingLoading(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

 async function handleSubmit(e) {
    e.preventDefault();
    if(!cityName || !date) return;
    const newCity = { 
       cityName,
       country,
       emoji,
       date,
       notes,
       position: { lat, lng } 
      };
     await createCity(newCity);
     navigate("/app/cities")
    
  }

  if (!lat || !lng) {
    return <Message message="Click on the map to select a location" />;
  }

  if (isGeocodingLoading) {
    return <Spinner />;
  }
  if (geocodingError) {
    return <Message message={geocodingError} />;
  }
  return (
    <form className={`${styles.form} ${isLoading?styles.loading : ""} `} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
