import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import styles from "./styles"

const Giroscopio = ({ value, setValue }) => {
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
    };

    const _fast = () => {
        Gyroscope.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setValue(gyroscopeData);
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
            <Text style={styles.title}>Giroscópio</Text>
            <Text style={styles.text}>X: {value.x.toFixed(2)}, Y: {value.y.toFixed(2)}, Z: {value.z.toFixed(2)}</Text>
        </View>
    );
};

export default Giroscopio;
