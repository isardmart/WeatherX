import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import Search from "./Search";
import SearchButton from "./SearchButton";
import * as Location from "expo-location";
import Forecast from "./Forecast";
import { GOOG_API_KEY, WEATHER_API_KEY } from '@env';



const App = () => {
  const [clicked, setClicked] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [render,setRender]=useState(true);

  const askLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      let position = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      if (position.coords) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setRender(false);
      } else {
        Alert.alert("Please enable your phone location");
      }
    }
  };
  const fetchMain = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== "400") {
          setTemperature(data.main.temp);
          setLocation(data.name);
          setWeather(data.weather[0].description);
        }
      });
  };
  const renderMain=()=>{
    return(<View>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 180,
          fontSize: 40,
        }}
      >
        {location}
      </Text>
      <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 10 }}>
        {weather[0].toUpperCase() + weather.slice(1)}
      </Text>
      <Text
        style={{
          margin: 100,
          marginTop: 20,
          alignSelf: "center",
          fontSize: 60,
        }}
      >
        {temperature}°
      </Text>
      <Forecast render={render} WEATHER_API_KEY={WEATHER_API_KEY} longitude={longitude} latitude={latitude} />
    </View>)
  }
  useEffect(() => {
    askLocation();
  }, []);

  useEffect(() => {
    fetchMain();
  }, [render]);
  useEffect(()=>{
    setRender(!render);
  },[latitude && longitude])

  return (
    <View>
      <View>
        {clicked ? (
          <View
            style={{
              top: 0,
              width: "90%",
              height: 80,
              position: "absolute",
              right: "5%",
              zIndex: 20,
            }}
          >
            <Search setLatitude={setLatitude} setLongitude={setLongitude} setRender={setRender} />
          </View>
        ) : (
          <View
            style={{
              top: 50,
              width: 80,
              height: 80,
              position: "absolute",
              right: 20,
            }}
          >
            <SearchButton setClicked={setClicked} />
          </View>
        )}
      </View>
      {temperature && weather && location ? (
        renderMain()
      ) : (
        <Text>Loading temperature...</Text>
      )}
    </View>
  );
};

export default App;
