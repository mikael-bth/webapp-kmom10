import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography, Delay } from "./../styles"

import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
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
            console.log("reset");
        }
        (async () => {

            await setDelays();

            const markerList = [];
            const markedStation = [];
            delayedStations.map((delayedStation, index) => {
                if (markedStation.indexOf(delayedStation.Geometry.WGS84) != -1) return;
                markedStation.push(delayedStation.Geometry.WGS84);
                const coordinates = delayedStation.Geometry.WGS84.split(" ");
                const lat = parseFloat(coordinates[2].slice(0, -1));
                const lon = parseFloat(coordinates[1].slice(1));
                const stationDelays = delayedStations.filter(delay => delay.Geometry.WGS84 == delayedStation.Geometry.WGS84);
                const delays = stationDelays.map((delay, i) => {
                    if (delay.Canceled) {
                        return <Text key={i} style={Delay.normalMap}>
                            {"Ankomst" + delay.AdvertisedTimeAtLocation + " - Inställd"}
                        </Text>;
                    }
                    return <Text key={i} style={Delay.normalMap}>
                        {"Ankomst " + delay.AdvertisedTimeAtLocation + " + " + delay.Delay.toString()}
                    </Text>;
                });
                markerList.push(
                <Marker key={index} coordinate={{ latitude: lat, longitude: lon }}> 
                    <Callout style={{width: 200}}>
                        <Text style={Delay.headerMap}>{delayedStation.StationName}</Text>
                        {delays}
                    </Callout>
                </Marker>);

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