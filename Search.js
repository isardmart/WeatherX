import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Search = ({ setLatitude, setLongitude, setClicked }) => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchLatLon();
  }, [location]);

  const fetchLatLon = () => {
    const API_ENDPOINT = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=16909a97489bed275d13dbdea4e01f59`;
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== "400") {
          setLatitude(data[0].lat);
          setLongitude(data[0].lon);
        }
      });
  };
  const closeTab = () => {
    setClicked(false);
  };

  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        top: 40,
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          setLocation(data.description);
          setTimeout(() => {
            closeTab();
            console.log("newlocation");
          }, 1000);
        }}
        query={{
          key: "AIzaSyB5zTrtbU5i5CKHiK8HWGEPLtjB_ApPmCo",
          language: "en",
        }}
        styles={{
            loader: {
            backgroundColor:'grey',
          },
          textInputContainer: {
            backgroundColor: "grey",
            borderColor: "black",
            borderRadius: 5,
            borderWidth: 1,
          },
          textInput: {
            height: 38,
            color: "black",
            fontSize: 16,
          },
          description: {
            color: "white",
          },
          row: {
            backgroundColor: "grey",
            borderColor: "black",
            borderRadius: 5,
            borderWidth: 1,
          },
        }}
      />
    </View>
  );
};

export default Search;
