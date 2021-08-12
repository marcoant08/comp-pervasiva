import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import styles from "./styles";

// const Acelerometro = () => {
const Acelerometro = ({ value, setValue }) => {
  const [subscription, setSubscription] = useState(null);
  //   const [value, setValue] = useState({ x: 0.0, y: 0.0, z: 0.0 });

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(800);

    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setValue(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acelerômetro</Text>
      <Text style={styles.text}>
        X: {value.x.toFixed(2)}, Y: {value.y.toFixed(2)}, Z:{" "}
        {value.z.toFixed(2)}
      </Text>
    </View>
  );
};

export default Acelerometro;
