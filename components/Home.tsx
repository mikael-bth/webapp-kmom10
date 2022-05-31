import { Image, Text, ScrollView } from 'react-native';
import warehouse from './../assets/trafik.jpg';
import { Base, Typography } from './../styles';

export default function Home() {
  return (
      <ScrollView style={Base.base}>
        <Text style={[Typography.header1, {color: '#33c'}]}>Trafik information</Text>
        <Image source={warehouse} style={Base.logo} />
      </ScrollView>
  );
}

