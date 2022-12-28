import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import Search from "./Search";
import SearchButton from "./SearchButton";
import Display from "./Display";
import * as Location from "expo-location";
import Forecast from "./Forecast";

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const askLocation=async()=>{

    const { granted } = await Location.requestForegroundPermissionsAsync();
    console.log(granted);
    if (granted) {
      let position = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      if (position.coords){
      const latitude=position.coords.latitude;
      const longitude=position.coords.latitude;
      setLatitude(latitude);
      setLongitude(longitude);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=16909a97489bed275d13dbdea4e01f59`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod !== "400") {
            setTemperature(data.main.temp);
            setLocation(data.name);
            setWeather(data.weather[0].description);
          }
        });
    }else{
      Alert.alert('Please enable your phone location')
    }
  }
  }
  useEffect(() => {
    askLocation();
  }, []);

  return (
    <View >
      {temperature && location && weather ? (
        <View >
          <Text
            style={{
              alignSelf: "center",
              marginTop: 130,
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
          <Forecast longitude={longitude} latitude={latitude} />
        </View>
      ) : (
        <Text>Loading temperature...</Text>
      )}
      {clicked ? <Search /> : <SearchButton setClicked={setClicked} />}
    </View>
  );
};

export default App;
