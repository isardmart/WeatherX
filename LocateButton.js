import { StyleSheet, Button } from "react-native";
import React from 'react';



const LocateButton = ({ reset, setReset }) => {
    const styles = {
        button: {
          backgroundColor: "red",
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
      title="Reset"
      style={[styles.button]}
      titleStyle={styles.buttonText}
      onPress={() => {
        setReset(!reset);
      }}
    >
    </Button>
  );
};



export default LocateButton;
