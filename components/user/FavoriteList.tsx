import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from "react-native";
import AuthModel from "./../../models/user";
import { Base, Typography, Forms } from './../../styles';

export default function FavoriteList({route, navigation, favoriteStations, setFavoriteStations}) {
    let { reload } = route.params || false;

    if (reload) {
        setFavorites();
        reload = false;
    }

    async function setFavorites() {
        const favoriteStations = await AuthModel.getFavorites();
        setFavoriteStations(favoriteStations);
    }

    useEffect(() => {
        setFavorites();
    }, []);

    const listOfFavorites = favoriteStations
        .map((station, index) => {
            return (
            <Pressable
                key={index}
                style={Forms.station}
                onPress={() => {
                    navigation.navigate('Station', {
                        station: station
                    });
                }}
            >
                <Text style={Forms.buttonText}>{station.artefact}</Text>
            </Pressable>
            );
        });

    if (listOfFavorites.length == 0) {
        listOfFavorites.push(<Text key={0} style={[Typography.header2, {marginTop: 20, textAlign: "center"}]}>Inga favoriter</Text>)
    }

    return (
        <View style={[Base.base, {alignContent: "center", justifyContent:"space-between"}]}>
            <ScrollView>
                {listOfFavorites}
            </ScrollView>
            <Pressable
                style={[Forms.button]}
                onPress={() => {
                    navigation.navigate('Ny Favorit');
                }}
            >
                <Text style={Forms.buttonText}>Lägg till</Text>
            </Pressable>
        </View>
    );
}