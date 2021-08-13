import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { Barometer } from "expo-sensors";
import styles from "./styles";

const Barometro = ({ value, setValue }) => {
  const [subscription, setSubscription] = useState(null);
  const [data, setData] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Barometer.addListener((barometerData) => {
        setValue(barometerData);
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
      <Text style={styles.title}>Barômetro</Text>
      <Text style={styles.text}>Pressure: {value.pressure * 100} Pa</Text>
      <Text style={styles.text}>
        Relative Altitude:{" "}
        {Platform.OS === "ios"
          ? `${value.relativeAltitude.toFixed(2)} m`
          : `Only available on iOS`}
      </Text>
    </View>
  );
};

export default Barometro;
