import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "./../styles"

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import DelayModel from './../models/delays';

export default function DelayMap({delayedStations, setDelayedStations}) {
    const [markers, setMarkers] = useState([]);
    const [locationMarker, setLocationMarker] = useState(null);

    const [startPos, setStartPos] = useState({
        latitude: 56.1612,
        longitude: 15.5869
    });

    useEffect(() => {
        async function setDelays() {
            const delayedStations = await DelayModel.getDelayedStation();
            setDelayedStations(delayedStations);
            
        }
        (async () => {

            await setDelays();

            const markerList = [];
            delayedStations.map((delayedStation, index) => {
                const coordinates = delayedStation.Geometry.WGS84.split(" ");
                const lat = parseFloat(coordinates[2].slice(0, -1));
                const lon = parseFloat(coordinates[1].slice(1));
                let delayString = "Ankomst " + delayedStation.AdvertisedTimeAtLocation + " + " + delayedStation.Delay.toString();
                if (delayedStation.Canceled) {
                    delayString = "Ankomst " + delayedStation.AdvertisedTimeAtLocation + " - Inställd"
                }
                markerList.push(<Marker key={index} coordinate={{ latitude: lat, longitude: lon }}
                title={delayedStation.StationName} description={delayString}
                />)
            });
            setMarkers(markerList);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);

            setStartPos({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            });

        })();
    }, []);


    return (
        <View style={Base.base}>
            <Text style={[Typography.header2, {textAlign: "center", paddingTop: 10}]}>Förseningar i Sverige</Text>
            <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                region={{
                    latitude: startPos.latitude,
                    longitude: startPos.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                >
                {markers}
                {locationMarker}
            </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});