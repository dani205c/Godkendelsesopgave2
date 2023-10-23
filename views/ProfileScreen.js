import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { Card } from 'react-native-paper';

function ProfileScreen({ changeScreen }) {
  const auth = getAuth();
  const user = auth.currentUser; // Jeg henter den nuværende loggede ind bruger.

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      changeScreen('guest');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return <View style={styles.notFoundContainer}><Text>Not found</Text></View>;
  }
// Herunder er brugerens profilskærm. Den indeholder flere knapper, der fører til forskellige skærme.
  return (
    <ImageBackground 
      source={require('./dk.png')} // replace with your actual image path
      style={styles.backgroundImage}
      resizeMode="cover" // or "contain" depending on your preference
    >
      <View style={styles.container}>
        <Text style={styles.title}>Velkommen til din side! {user.email}</Text>

        <Card style={styles.card}>
          <Button title="Log Ud" onPress={handleLogOut} />
        </Card>

        <Card style={styles.card}>
          <Button title="Se kort over København" onPress={() => changeScreen('city')} />
        </Card>

        <Card style={styles.card}>
          <Button title="Se vejret i København" onPress={() => changeScreen('vejr')} />
        </Card>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%', // to ensure it covers full width
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // for horizontal centering
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // this will center the "Not found" text both vertically and horizontally
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20, // Optional: for space between the text and the button
    },

    card: {
      
        padding:20, 
        margin: 20, // increased margin for better separation and visuals
    },
});


export default ProfileScreen