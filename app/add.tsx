import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';

// This is a redirect to the tab-based add transaction screen
export default function AddScreen() {
  return <Redirect href="/(tabs)/add" />;
}