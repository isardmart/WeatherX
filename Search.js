import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";
import Display from "./Display";

const Search = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Barcelona");

  const fetchWeather = async () => {
    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16909a97489bed275d13dbdea4e01f59`;
    try {
      const response = await axios.get(API_ENDPOINT);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderWeatherData = () => {
    if (weatherData) {
        return (<Display weatherData={weatherData} />)
    }
    return <Text>Enter a location to see the weather.</Text>;
  };

  return (
    <View>
      <TextInput style={{
          marginTop: 50,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}  placeholder="location" onChangeText={setLocation} />
      <Button title="Get Weather" onPress={fetchWeather} />
      {renderWeatherData()}
    </View>
  );
};

export default Search;
