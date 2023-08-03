import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import ButtonBack from "./Button";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity, getCity ,isLoading} = useCities();

  useEffect(
    function () {
      getCity(id);
      console.log(id);
      console.log(currentCity)
    },
    [id]
    
  );
 
  const {cityName, emoji, date, notes}=currentCity; // Declare variables in the outer scope

  
  const [search, setSearchParams] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");


 if(isLoading){
  return <Spinner/>
 }
 else{

   return (
     <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {/* <span>{emoji}</span> */}
           {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton/>
      </div>
    </div>
  );
}
}

export default City;
