import { View, Text, Pressable } from 'react-native';
import { Base, Typography, Forms } from './../../styles';
import AuthModel from '../../models/user';

export default function Logout({navigation, setIsLoggedIn}) {
  return (
    <View style={[Base.base, {alignItems: "center"}]}>
        <Text style={[Typography.header2, {marginTop: 20}]}>Vill du logga ut?</Text>
        <Pressable
                style={[Forms.button, {width: 150}]}
                onPress={() => {
                    AuthModel.logout();
                    setIsLoggedIn(false);
                    navigation.navigate('Start');
                }}
            >
            <Text style={Forms.buttonText}>Ja</Text>
        </Pressable>
        <Pressable
                style={[Forms.button, {width: 150}]}
                onPress={() => {
                    navigation.navigate('Start');
                }}
            >
            <Text style={Forms.buttonText}>Nej</Text>
        </Pressable>
    </View>
  );
}