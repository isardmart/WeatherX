import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

const Forecast = ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState(false);
  const [list, setList] = useState([]);

  const handleDay = (value) => {
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
    return (
      <>
        <Text>
          {day}
          <Image source={{ uri: iconUrl }} style={{ width: 20, height: 20 }} />
        </Text>
      </>
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
        <>
          {list.map((value, idx) => {
            return <Text key={idx}>{handleDay(value)}</Text>;
          })}
        </>
      ) : (
        <Text>Loading forecast...</Text>
      )}
    </View>
  );
};

export default Forecast;
