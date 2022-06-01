import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';

import { Base } from './styles';

import Home from './components/Home';
import Latest from './components/Latest';
import DelayMap from './components/DelayMap';
import Auth from './components/auth/Auth';
import Logout from './components/auth/Logout';
import Favorites from './components/user/Favorites';

import AuthModel from './models/user';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Start": "home",
  "Senaste": "list",
  "Karta": "navigate-circle",
  "Logga in": "log-in",
  "Logga ut": "log-out",
  "Favoriter": "heart"
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

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  
  useEffect(() => {
    async function getLoggedIn() {
      const loggedIn = await AuthModel.loggedIn();
      setIsLoggedIn(loggedIn);
    }
    getLoggedIn();
  }, []);

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
          {isLoggedIn ?
            <Tab.Screen name="Favoriter">
              {() => <Favorites  delayedStations={delayedStations} setDelayedStations={setDelayedStations} />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
          {isLoggedIn &&
            <Tab.Screen name="Logga ut">
              {(screenProps) => <Logout {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

