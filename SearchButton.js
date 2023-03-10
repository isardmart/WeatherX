import { StyleSheet, Button } from "react-native";
import React from 'react';



const SearchButton = ({ setClicked }) => {
    const styles = {
        button: {
          backgroundColor: "grey",
          padding: 10,
          borderRadius: 10,
        },
        buttonText: {
          color: "white",
          fontSize: 20,
          textAlign: "center",
        },
      };
  return (
    <Button
      title="search"
      style={styles.button}
      onPress={() => {
        setClicked(true);
      }}
    >
    </Button>
  );
};



export default SearchButton;
