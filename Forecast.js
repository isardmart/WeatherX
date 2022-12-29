import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";


const Forecast = ({ latitude, longitude,WEATHER_API_KEY }) => {
  const [forecast, setForecast] = useState(false);
  const [list, setList] = useState([]);
  const [isclicked, setIsclicked] = useState([false]);

  const array = new Array(7).fill(false);

  const handlePress = (idx) => {
    if (isclicked[idx]){
      array[idx] = false;
    } else{
    array[idx] = true;
    }
    return setIsclicked(array);
  };

  const handleDay = (value, idx) => {
    const dt = value.dt;

    const date = new Date(dt * 1000); // Convert to milliseconds
    const dayOfWeek = date.getDay(); // Get the day of the week (0-6)

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[dayOfWeek];
    const iconCode = value.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const maxtemp = value.temp.max - 273.15;
    const mintemp = value.temp.min - 273.15;

    const humidity = value.humidity;

    const pressure = value.pressure;

    const windspeed = value.speed;

    const rainprob = value.pop;

    return (
      <View
        style={{ alignItems: "center", height: 40, justifyContent: "center",position:'relative' }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            paddingStart: 10,
            paddingEnd: 10,
            zIndex: 0,
          }}
        >
          <Text style={{ width: 80 }}>{day}</Text>
          <Image
            source={{ uri: iconUrl }}
            style={{ width: 30, height: 20, alignItems: "center" }}
          />
          <Text
            style={{ paddingHorizontal: 10, width: 50, textAlign: "center" }}
          >
            {Math.round(maxtemp)}
          </Text>
          <Text style={{ color: "grey", width: 40, textAlign: "center" }}>
            {Math.round(mintemp)}
          </Text>
        </View>
        {isclicked[idx] ? (
          <View style={{ display: "flex", flexDirection: "row", justifyContent:'space-around', marginBottom:10, }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text>Humidity: {humidity}%</Text>
              <Text>Rain probability: {rainprob}%   </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text>Wind speed: {windspeed}m/s</Text>
              <Text>Pressure: {pressure}hPa </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            height: 50,
            opacity: 0,
            width: "100%",
            top: 10,
            zIndex: 1,
            position: "absolute",
          }}
        >
          <Button title="button" onPress={() => handlePress(idx)}></Button>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data.list);
        setForecast(true);
      });
  }, []);

  return (
    <View>
      {forecast ? (
        <View style={{ paddingHorizontal: 3 }}>
          {list.map((value, idx) => {
            return (
              <View style={{ width: "100%" }} key={idx}>
                {handleDay(value, idx)}
              </View>
            );
          })}
        </View>
      ) : (
        <Text>Loading forecast...</Text>
      )}
    </View>
  );
};

export default Forecast;
