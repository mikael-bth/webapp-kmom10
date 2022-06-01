import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Delay } from './../styles';
import DelayModel from './../models/delays';

export default function DelaysList({delayedStations, setDelayedStations}) {
    useEffect(() => {
        async function setDelays() {
            const delayedStations = await DelayModel.getDelayedStation();
            setDelayedStations(delayedStations);
        }
        setDelays();
    }, []);

    const listOfDStations = delayedStations
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
                            { " " + delayedStation.Delay.toString() }
                        </Text>
                    </Text>
                }
            </View>
            );
        })
    return (
      <View>
          {listOfDStations}
      </View>
    );
  }