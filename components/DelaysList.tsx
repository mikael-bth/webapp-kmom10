import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Delay } from './../styles';
import DelayModel from './../models/delays';

export default function DelaysList() {

    const [delayedStations, setDelayedStations] = useState([]);

    useEffect(() => {
        async function reloadDelays() {
            const delayedStations = await DelayModel.getDelayedStation();
            setDelayedStations(delayedStations);
        }
        reloadDelays();
    }, []);

    

    const listOfDStations = delayedStations
        .map((delayedStation, index) => {
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
                        <Text style={ Delay.delay }>
                            Inställd
                        </Text>
                    </Text> : 
                    <Text style={ Delay.normal }>
                        Ankomst: { delayedStation.AdvertisedTimeAtLocation } +
                        <Text style={ Delay.delay }>
                            { " " + delayedStation.Delay }
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