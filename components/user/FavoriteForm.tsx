import { useState, useEffect } from 'react';
import { ScrollView, Text, Button, Pressable, Platform, View } from "react-native";
import { Base, Typography, Forms } from '../../styles';
import { Picker } from '@react-native-picker/picker';
import AuthModel from './../../models/user';
import StationModel from './../../models/stations';

export default function FavoriteForm({ navigation, setFavoriteStations }) {
    const [station, setStation] = useState({});

    async function addFavorite() {
        const newFavorite = {
            artefact: station.StationName
        };

        await AuthModel.addFavorite(newFavorite)

        const favoriteStations = await AuthModel.getFavorites();
        setFavoriteStations(favoriteStations);

        navigation.navigate("Dina Favoriter", {reload: true});
    }

    return (
        <View style={[Base.base, {justifyContent: "space-between"}]}>
            <Text style={[Typography.header2, {textAlign: "center", marginTop: 20}]}>Lägg till favorite</Text>

            <StationDropDown
                station={station}
                setStation={setStation}
            />

            <Pressable
                style={Forms.button}
                onPress={() => {
                    addFavorite();
                }}
            >
                <Text style={Forms.buttonText}>Lägg till</Text>
            </Pressable>
        </View>
    );
};

function StationDropDown(props) {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        async function updateStations() {
            const stations = await StationModel.getStations();
            setStations(stations);
        }
        updateStations();
    }, []);


    const stationList = stations.map((station, index) => {
        return <Picker.Item key={index} label={station.AdvertisedLocationName} value={station.AdvertisedLocationName} />;

        return
    });

    return (
        <Picker
            selectedValue={props.station?.StationName}
            onValueChange={(itemValue) => {
                props.setStation({ ...props.station, StationName: itemValue });
            }}>
            {stationList}
        </Picker>
    );
}