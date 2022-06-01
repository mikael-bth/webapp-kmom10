import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import FavoriteList from './FavoriteList';
import FavoriteStation from './FavoriteStation';
import FavoriteForm from './FavoriteForm';

const Stack = createNativeStackNavigator();

const headerStyle = {
    headerTintColor: '#141414'
}

export default function Favorites({delayedStations, setDelayedStations}) {
    const [favoriteStations, setFavoriteStations] = useState([]);
    return (
        <Stack.Navigator initialRouteName="Favorites" screenOptions={headerStyle}>
            <Stack.Screen name="Dina Favoriter">
                {(screenProps) => <FavoriteList {...screenProps} favoriteStations={favoriteStations} setFavoriteStations={setFavoriteStations}/>}
            </Stack.Screen>
            <Stack.Screen name="Station">
                {(screenProps) => <FavoriteStation {...screenProps} setFavoriteStations={setFavoriteStations} delayedStations={delayedStations} setDelayedStations={setDelayedStations} />}
            </Stack.Screen>
            <Stack.Screen name="Ny Favorit">
                {(screenProps) => <FavoriteForm {...screenProps} setFavoriteStations={setFavoriteStations} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}