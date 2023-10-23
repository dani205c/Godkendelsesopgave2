// Her importerer jeg nødvendige moduler fra react og react-native.
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, ImageBackground } from 'react-native';

// Her importerer jeg Firebase-tjenester for at kunne bruge dem i min app.
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Card } from 'react-native-paper';

// Her importerer jeg forskellige skærme fra mine egne filer for at bruge dem i min app.
import ProfileScreen from './views/ProfileScreen';
import LoginForm from './views/LoginForm';
import SignUpForm from './views/SignUpForm';
import City from './views/City'; 
import Vejr from './views/Vejr'; 

// Her definerer jeg min Firebase konfiguration. Jeg bruger disse oplysninger til at forbinde min app med min Firebase konto.
const firebaseConfig = {
  apiKey: "AIzaSyDCfwHh46ctJw4MXM8350EGM-E7HPWO4cw",
  authDomain: "iont-34987.firebaseapp.com",
  projectId: "iont-34987",
  storageBucket: "iont-34987.appspot.com",
  messagingSenderId: "76713132214",
  appId: "1:76713132214:web:9c62ad554212b17b66a617"
};

// Her initialiserer jeg Firebase med de konfigurationsoplysninger, jeg angav ovenfor.
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Dette er hovedkomponenten i min app. Jeg styrer logikken for autentifikation og navigation her.
export default function App() {
  // Her opretter jeg en state til at holde styr på, om en bruger er logget ind eller ej.
  const [user, setUser] = useState({ loggedIn: false });
  // Denne state bruges til at styre, hvilken skærm der er synlig for brugeren.
  const [currentScreen, setCurrentScreen] = useState('guest');

  // Her opretter jeg en reference til Firebase autentifikationstjenesten.
  const auth = getAuth();


  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // Hvis brugeren er logget ind, opdaterer jeg brugerstaten og sætter den aktuelle skærm til 'profile'.
        callback({loggedIn: true, user: user});
        setCurrentScreen('profile');
      } else {
        // Hvis ingen bruger er logget ind, sætter jeg brugerstaten til ikke logget ind og skærmen til 'guest'.
        callback({loggedIn: false});
        setCurrentScreen('guest');
      }
    });
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // Dette er komponenten, der vises for gæster, dvs. ikke-loggede brugere. Den indeholder tilmeldings- og logindformularer.
  const GuestPage = () => {
    return (
      <ImageBackground 
        source={require('./views/dk.png')} 
        style={styles.backgroundImage}
        resizeMode="cover" 
      >
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === "ios" ? "padding" : "height"} // Dette sikrer, at tastaturet ikke dækker indholdet.
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          enabled
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.paragraph}>
              Velkommen
            </Text>
            
            
            <Card style={styles.card}>
              <SignUpForm /> 
            </Card>
            
            <Card style={styles.card}>
              <LoginForm />
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  };

  // Her vælger jeg, hvilken skærmkomponent der skal vises
  let ScreenComponent;
  switch (currentScreen) {
    case 'profile':
      ScreenComponent = <ProfileScreen changeScreen={setCurrentScreen} />;
      break;
    case 'city':
      ScreenComponent = <City changeScreen={setCurrentScreen} />;
      break;
    case 'vejr':
      ScreenComponent = <Vejr changeScreen={setCurrentScreen} />;
      break;
    case 'guest':
    default:
      ScreenComponent = <GuestPage />;
  }

  // Her returnerer jeg den aktuelle skærmkomponent, der skal vises.
  return (
    <View style={styles.container}>
      {ScreenComponent}
    </View>
  );
}


const styles = StyleSheet.create({
  
 
  backgroundImage: {
      flex: 1,
      width: '100%', 
  },
  
  container: {
      flex: 1,
  },
  
  scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
  },
  
  paragraph: {
      margin: 24,
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
     color: 'white', 
  },
  
  card: {
      
      padding:20, 
      margin: 20, 
  },
});
