import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchchableOpacity>
        <Image
          source={'/open-iconic/svg/camera-slr.svg'}
          />
      </TouchchableOpacity>

      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7760ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
