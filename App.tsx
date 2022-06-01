import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Base } from './styles';
import Home from './components/Home';
import Latest from './components/Latest';
import DelayMap from './components/DelayMap';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Start": "home",
  "Senaste": "list",
  "Karta": "navigate-circle"
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#757474'
  }
}

export default function App() {
  const [delayedStations, setDelayedStations] = useState([]);

  return (
    <SafeAreaView style={[Base.container]}>
      <NavigationContainer theme={navTheme}>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
          },
            tabBarActiveTintColor: '#ffa200',
            tabBarInactiveTintColor: '#d4d4d4',
          })}
        >
          <Tab.Screen name="Start">
            {() => <Home/>}
          </Tab.Screen>
          <Tab.Screen name="Senaste">
            {() => <Latest delayedStations={delayedStations} setDelayedStations={setDelayedStations} />}
          </Tab.Screen>
          <Tab.Screen name="Karta">
            {() => <DelayMap delayedStations={delayedStations} setDelayedStations={setDelayedStations} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

