import React, { useContext, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../Contexts/AuthContext'; 
import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const { userToken, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.push('/login');
    }
  }, [userToken, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Display a loading spinner
  }

  if (!userToken) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#008CBA', // Active tab color
          tabBarInactiveTintColor: '#b0b0b0', // Inactive tab color
          tabBarStyle: {
            backgroundColor: '#fff', // Tab bar background
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0', // Light border for tab bar
            height: 60, // Reduced height for less space
            paddingBottom: 5, // Less padding at the bottom
            paddingTop: 5, // Reduced padding at the top
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5, // Adding a shadow for the tab bar
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            headerShown: false,
            title: 'Shop',
            tabBarIcon: ({ color, focused }) => (
              <Feather name={focused ? 'shopping-cart' : 'shopping-cart'} color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            title: 'NSO AI',
            tabBarIcon: ({ color, focused }) => (
              <Feather name={focused ? 'message-square' : 'message-square'} color={color} size={30} />
            ),
            tabBarStyle: { display: 'none' }, // Hide tab bar on the chat screen
          }}
        />
        <Tabs.Screen
          name="lectures"
          options={{
            headerShown: false,
            title: 'Lectures',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'book-open-page-variant' : 'book-open-page-variant-outline'}
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="culture"
          options={{
            headerShown: false,
            title: 'Culture',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'compass' : 'compass-outline'}
                color={color}
                size={30}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
