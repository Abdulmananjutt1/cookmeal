import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import HomeScreen from '@/screens/HomeScreen';
import ChatScreen from '@/screens/ChatScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import TrackerScreen from '@/screens/TrackerScreen';
import GroceryScreen from '@/screens/GroceryScreen';
import { useTheme } from '@/hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? theme.white : theme.surface,
        tabBarInactiveTintColor: isDark ? theme.tabIconDefault : theme.secondary,
        tabBarStyle: {
          backgroundColor: isDark ? theme.surface : theme.primary,
          borderTopColor: isDark ? theme.border : theme.primary,
          borderTopWidth: 1,
          elevation: 10,
          shadowOpacity: 0.3,
          shadowRadius: 10,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackerScreen}
        options={{
          tabBarLabel: 'Track',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pantry"
        component={GroceryScreen}
        options={{
          tabBarLabel: 'Pantry',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Astra',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
