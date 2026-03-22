import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import MealDetailsScreen from '@/screens/MealDetailsScreen';
import ChatScreen from '@/screens/ChatScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import JarvisScreen from '@/screens/JarvisScreen';
import MealAnalyzerScreen from '@/screens/MealAnalyzerScreen';
import MealAnalyzerResultScreen from '@/screens/MealAnalyzerResultScreen';
import BarcodeScannerScreen from '@/screens/BarcodeScannerScreen';
import BarcodeResultScreen from '@/screens/BarcodeResultScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import HelpSupportScreen from '@/screens/HelpSupportScreen';
import SavedRecipesScreen from '@/screens/SavedRecipesScreen';
import SearchScreen from '@/screens/SearchScreen';
import ExploreRecipesScreen from '@/screens/ExploreRecipesScreen';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MealDetails" 
        component={MealDetailsScreen} 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_bottom'
        }} 
      />
      <Stack.Screen 
        name="Jarvis" 
        component={JarvisScreen} 
        options={{ 
          headerShown: false,
          animation: 'fade_from_bottom'
        }} 
      />
      <Stack.Screen 
        name="MealAnalyzer" 
        component={MealAnalyzerScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_bottom'
        }} 
      />
      <Stack.Screen 
        name="MealAnalyzerResult" 
        component={MealAnalyzerResultScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="BarcodeScanner" 
        component={BarcodeScannerScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="BarcodeResult" 
        component={BarcodeResultScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_bottom'
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_bottom'
        }} 
      />
      <Stack.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="SavedRecipes" 
        component={SavedRecipesScreen} 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />

      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          headerShown: false,
          animation: 'fade'
        }} 
      />
      <Stack.Screen 
        name="ExploreRecipes" 
        component={ExploreRecipesScreen} 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack.Navigator>
  );
}
