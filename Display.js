import React from "react";
import { View, Text, TextInput, Button } from "react-native";


 const Display=({weatherData})=> {
  const { main, name } = weatherData;
  return (
    <View
      style={{
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
      }} 
    >
      <Text>Location: {name}</Text>
      <Text>Temperature: {Math.round(main.temp - 273.15)}ºC</Text>
      <Text>Humidity: {main.humidity}%</Text>
    </View>
  );
}

export default Display;