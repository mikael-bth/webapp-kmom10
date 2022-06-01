import { View, ScrollView, Text, Pressable } from "react-native";
import { useEffect } from 'react';
import { showMessage } from "react-native-flash-message";
import AuthModel from './../../models/user'
import DelayModel from './../../models/delays'
import { Typography, Base, Forms, Delay } from './../../styles';


export default function FavoriteStation({ route, navigation, setFavoriteStations, delayedStations, setDelayedStations }) {
    const { station } = route.params;

    async function removeFavorite() {
        const deletedFavorite = {
            id: station.id
        } 
        AuthModel.deleteFavorite(deletedFavorite);
        const favoriteStations = await AuthModel.getFavorites()
        setFavoriteStations(favoriteStations);
        navigation.navigate('Dina Favoriter', {reload: true});
    }
    
    useEffect(() => {
        async function setDelays() {
            const delayedStations = await DelayModel.getDelayedStation();
            setDelayedStations(delayedStations);
        }
        setDelays();
    }, []);

    console.log(delayedStations);
    const delays = delayedStations.filter(delay => delay.StationName == station.artefact);
    console.log(delays);
    const stationDelays = delays
        .map((delayedStation, index) => {
            let delayColor;
            if (delayedStation.Delay <= 10) {
                delayColor = Delay.lowDelay;
            } else if (delayedStation.Delay <= 30) {
                delayColor = Delay.midDelay;
            } else {
                delayColor = Delay.highDelay;
            }
            return (
            <View key={index} style={Delay.delayContainer}>
                <Text style={ Delay.header }>
                    { delayedStation.StationName }
                </Text>
                {delayedStation.Canceled ? 
                    <Text style={ Delay.normal }>
                        Ankomst:
                        <Text style={ Delay.canceled }>
                            { " " + delayedStation.AdvertisedTimeAtLocation + " "}
                        </Text>
                        <Text style={ Delay.highDelay }>
                            Inställd
                        </Text>
                    </Text> : 
                    <Text style={ Delay.normal }>
                        Ankomst: { delayedStation.AdvertisedTimeAtLocation } +
                        <Text style={ delayColor}>
                            { DelayModel.getInHoursAndMinutes(delayedStation.Delay) }
                        </Text>
                    </Text>
                }
            </View>
            );
        });
    
    if (stationDelays.length == 0) {
        stationDelays.push(<Text key={0} style={[Typography.header2, {marginTop: 20, textAlign: "center"}]}>Inga förseningar</Text>)
    }

    return (
        <View style={[Base.base, {alignItems: "center"}]}>
            <ScrollView style={{width: "100%", marginTop: 10}}>
            {stationDelays}
            </ScrollView>
            <Pressable style={Forms.button} onPress={removeFavorite}>
                <Text style={Forms.buttonText}>Ta bort favorit</Text>
            </Pressable>
        </View>
    )
};