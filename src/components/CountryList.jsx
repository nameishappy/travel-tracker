import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const {cities,isLoading}=useCities();
  if (isLoading) {
    return <Spinner />;
  }
 if(!cities.length){
  return <Message message={"Add your first city by clicking on the map"}/>;
 }
 
 const countries = cities.reduce((countries, city) => {
    if (!countries.includes(city.country)) {
      countries.push(city.country);
    }
    return countries;
  }, []);;


  console.log(cities);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country} />
      ))} 
    </ul>
  );
};

export default CountryList;
