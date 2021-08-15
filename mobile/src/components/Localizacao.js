import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import styles from "../assets/global/styles";

export default function App({ value, setValue }) {
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ distanceInterval: 1, timeInterval: 2000 });
            setValue(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Localização</Text>
            {!value ?
                <Text style={styles.text}>{text}</Text>
                :
                <>
                    <Text style={styles.text}>Latitude: {value.coords.latitude}</Text>
                    <Text style={styles.text}>Longitude: {value.coords.longitude}</Text>
                </>
            }
        </View>
    );
}