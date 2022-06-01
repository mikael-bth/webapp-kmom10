import { Text, ScrollView, View } from 'react-native';
import { Delay, Typography } from './../styles';
import DelaysList from './DelaysList';

export default function Latest({delayedStations, setDelayedStations}) {
  return (
      <ScrollView style={Delay.container}>
        <View style={{borderBottomWidth: 2, marginBottom: 20, marginTop: 10}}>
            <Text style={[Typography.header1, {textAlign: "center"}]}>Förseningar</Text>
        </View>
        <DelaysList delayedStations={delayedStations} setDelayedStations={setDelayedStations}/>
      </ScrollView>
  );
}