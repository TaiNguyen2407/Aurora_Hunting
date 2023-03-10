import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Avatar} from 'react-native-paper';
import Upload from '../views/Upload';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Comment from '../views/Comment';
import Home from '../views/Home';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';
import Modify from '../views/Modify';
import LocationMap from '../views/LocationMap';
import EditProfile from '../views/EditProfile';
import Search from '../views/Search';
import Weather from '../views/Weather';
import Tags from '../views/Tags';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1c211e',
          borderTopColor: '#8aac73',
          borderTopWidth: 3,
        },
        tabBarActiveTintColor: '#b3d56c',
        headerShown: false,
        tabBarLabelStyle: {
          marginBottom: 3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={35}
              icon="home"
              color={color}
              backgroundColor="transparent"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={35}
              icon="magnify"
              color={color}
              backgroundColor="transparent"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: () => (
            <Avatar.Image
              style={{
                position: 'relative',
                bottom: 25,
                borderRadius: 68,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/aurora_bottom.png')}
              backgroundColor="transparent"
              size={100}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tags"
        component={Tags}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={35}
              icon="tag-multiple"
              color={color}
              backgroundColor="transparent"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={35}
              icon="account"
              color={color}
              backgroundColor="transparent"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Aurora Hunting" component={TabScreen} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen
            name="Single"
            component={Single}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#121212',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Modify"
            component={Modify}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#121212',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen name="LocationMap" component={LocationMap} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="Search" component={Search} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        ></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
