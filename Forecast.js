import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";

const Forecast = ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState(false);
  const [list, setList] = useState([]);
  const [isclicked, setIsclicked] = useState([false]);

  const array = new Array(7).fill(false);

  const handlePress = (idx) => {
    array[idx] = true;
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

    return (
      <View style={{alignItems:'center',height:40, justifyContent:'center'}}>
         <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            paddingStart: 10,
            paddingEnd: 10,
            zIndex:0,
            borderColor:'black',
            borderWidth:2,
            borderRadius:10,
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
        <View style={{
            height:50, opacity: 0.1, width: "100%",top:10, zIndex:1, position:'absolute' }}>
          <Button title="button" onPress={() => handlePress(idx)}></Button>
        </View>

        {isclicked[idx] ? (
            <View>
              <Text>It is clicked!</Text>
            </View>
          ) : null}

      </View>
    );
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=16909a97489bed275d13dbdea4e01f59`
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
