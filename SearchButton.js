import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from 'react';


const SearchButton = ({ setClicked }) => {
    const styles = StyleSheet.create({
        button: {
          backgroundColor: "#3498db",
          padding: 10,
          borderRadius: 5,
        },
        buttonText: {
          color: "white",
          fontSize: 20,
          textAlign: "center",
        },
      });
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setClicked(true);
      }}
    >
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  );
};



export default SearchButton;
