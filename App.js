import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
} from "react-native";
import Search from "./Search";
import SearchButton from "./SearchButton";
import Display from "./Display";
import * as Location from "expo-location";

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    // Request location permission
    Location.requestForegroundPermissionsAsync().then((status) => {
      if (status.granted) {
        // Get the user's location
        Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Make a request to the OpenWeatherMap API to get the current weather
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=16909a97489bed275d13dbdea4e01f59`
            )
              .then((response) => response.json())
              .then((data) => {
                // Set the temperature state with the temperature from the API response
                setTemperature(data.main.temp);
                setLocation(data.name);
                setWeather(data.weather[0].description);
                console.log(data);
              });
          }
        );
      }
    });
  }, []);

  return (
    <View>
      {temperature && location && weather ? (
        <>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 130,
              fontSize: 40,
            }}
          >
            {location}
          </Text>
          <Text style={{ alignSelf: "center", fontSize: 20, marginTop:10, }}>{weather[0].toUpperCase()+weather.slice(1)}</Text>
          <Text
            style={{
              margin: 100,
              marginTop: 20,
              alignSelf:'center',
              fontSize: 60,
            }}
          >
            {temperature}°
          </Text>
        </>
      ) : (
        <Text>Loading temperature...</Text>
      )}
      {clicked ? <Search /> : <SearchButton setClicked={setClicked} />}
    </View>
  );
};

export default App;
