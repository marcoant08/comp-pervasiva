import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import styles from "../assets/global/styles";

const Acelerometro = ({ value, setValue }) => {
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(1000);

    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setValue({
          x: accelerometerData.x.toFixed(3),
          y: accelerometerData.y.toFixed(3),
          z: accelerometerData.z.toFixed(3)
        });
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
        X: {value.x}, Y: {value.y}, Z: {value.z}
      </Text>
    </View>
  );
};

export default Acelerometro;
