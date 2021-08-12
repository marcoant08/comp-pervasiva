import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from "./styles"

const Acelerometro = ({ value, setValue }) => {
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Accelerometer.setUpdateInterval(1000);
    };

    const _fast = () => {
        Accelerometer.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setValue(accelerometerData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _slow();
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acelerômetro</Text>
            <Text style={styles.text}>X: {value.x.toFixed(2)}, Y: {value.y.toFixed(2)}, Z: {value.z.toFixed(2)}</Text>
        </View>
    );
}

export default Acelerometro;
