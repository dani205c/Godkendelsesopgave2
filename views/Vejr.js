import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';

// Her definerer jeg Vejr-komponenten, som skal vise vejrdata for en specifik by.
const Vejr = ({ changeScreen }) => { 
  // Jeg opretter lokale states til at opbevare vejrdata og en til at vise indlæsningsstatus.
  const [vejrData, setVejrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Jeg definerer min API-nøgle og den by, jeg vil hente vejrdata for.
  const dinAPIKey = 'bd5e378503939ddaee76f12ad7a97608';
  const dinBy = 'København'; 

  // Jeg bruger useEffect til at kalde hentVejrData, når komponenten er mounted.
  useEffect(() => {
    hentVejrData();
  }, []);

  // hentVejrData-funktionen foretager en API-anmodning for at hente vejrdata.
  const hentVejrData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${dinBy}&appid=${dinAPIKey}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setVejrData(data); // Her opdaterer jeg vejrData state med data fra responsen.
      } else {
        throw new Error(data.message); // Hvis der er en fejl i responsen, kaster jeg en fejl.
      }
    } catch (error) {
      console.error("Der opstod en fejl under hentning af vejrdata: ", error); // Logger fejlen til konsollen.
    } finally {
      setIsLoading(false); // Jeg indikerer her, at indlæsningen er færdig.
    }
  };

  // Hvis isLoading er sand, viser jeg en indlæser til brugeren.
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Henter vejrdata...</Text>
      </View>
    );
  }

  // Hvis vejrData er null, viser jeg en fejlmeddelelse til brugeren.
  if (!vejrData) {
    return (
      <View style={styles.centered}>
        <Text>Kunne ikke hente vejrdata. Prøv igen senere.</Text>
      </View>
    );
  }

  // Når vejrdata er hentet, returnerer jeg den hovedvisning, der viser de hentede vejrdata.
  return (
    <ImageBackground 
      source={require('./dk.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Her viser jeg vejrdata */}
        <Text style={styles.text}>By: {vejrData.name}</Text>
        <Text style={styles.text}>Temperatur: {vejrData.main.temp}° C</Text>
        <Text style={styles.text}>Føles som: {vejrData.main.feels_like}° C</Text>
        <Text style={styles.text}>Vejr: {vejrData.weather[0].description}</Text>

        {/* Denne knap giver brugeren mulighed for at navigere tilbage til profilskærmen */}
        <Card style={styles.card}>
          <Button 
            title="Tilbage til profil" 
            onPress={() => changeScreen('profile')} // Her kalder jeg changeScreen med 'profile' som parameter.
          />
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: '100%', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});

export default Vejr;
