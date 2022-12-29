import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Search = ({ setLatitude, setLongitude, setRender }) => {
  const [location, setLocation] = useState("");

  const fetchLatLon = () => {
    const API_ENDPOINT = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=16909a97489bed275d13dbdea4e01f59`;
    fetch(API_ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod !== "400") {
            console.log("new fetched",data);
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);
            setRender(true);
          }
        });
  };

  return (
    <View>
      <View
        style={{
          height: 400,
          position: "relative",
          top: 40,
          borderColor: "black",
          borderRadius: 10,
          borderWidth: 2,
          zIndex: 20,
          backgroundColor: "grey",
          opacity: 0.9,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            setLocation(data.description);
            fetchLatLon();
          }}
          query={{
            key: "AIzaSyB5zTrtbU5i5CKHiK8HWGEPLtjB_ApPmCo",
            language: "en",
          }}
        />
      </View>
    </View>
  );
};

export default Search;
