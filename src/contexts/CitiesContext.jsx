import {
  useEffect,
  createContext,
  useState,
  useContext,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false,cities: action.payload };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity:action.payload
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:{}
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Action not supported`);
  }
}


function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity,setCurrentCity]=useState({});
  const [state, dispatch] = useReducer(reducer,initialState);
  const { cities, isLoading, currentCity } = state;
 

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const data = await fetch("http://localhost:8000/cities");
        const res = await data.json();

        dispatch({ type:"cities/loaded", payload: res });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    if(Number(id)===currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const data = await fetch(`http://localhost:8000/cities/${id}`);
      const res = await data.json();

      dispatch({ type: "city/loaded", payload: res });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const data = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      dispatch({ type: "cities/created", payload: res });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const data = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city",
      });
    }
  }
 

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
