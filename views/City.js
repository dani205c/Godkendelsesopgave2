import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Jeg importerer MapView og Marker fra 'react-native-maps' til at vise et kort.
import { Card } from 'react-native-paper';


function City({ changeScreen }) { 
  return (
    
    <ImageBackground 
    source={require('./dk.png')} 
    style={styles.backgroundImage}
    resizeMode="cover" 
  >
    <MapView
  style={styles.map}
  initialRegion={{
    latitude: 55.6761, /// Jeg starter kortet over København med disse koordinater.
    longitude: 12.5683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker
    coordinate={{
      latitude: 55.6761, 
      longitude: 12.5683,// Jeg placerer en markør på kortet ved disse koordinater.
    }}
    title="Copenhagen"
    description="The city of Copenhagen"
  />
</MapView>

    <View style={styles.container}>
      <Text style={styles.title}>Kort over København</Text>
      
     {/* Her tilføjer jeg en knap, der tillader brugeren at navigere tilbage til profilen. */}

      <Card style={styles.card}>
      <Button 
        title="Tilbage til Min Profil" 
        onPress={() => changeScreen('profile')} 
      /> 
      </Card>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%', },
        map: {
            width: '100%', 
            height: '50%', 
          },
          
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20, 
  },
  
});

export default City;