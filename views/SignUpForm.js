import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';


// Jeg importerer nødvendige metoder fra Firebase for at initialisere appen og håndtere brugeroprettelse.
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUpForm() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    
    const auth = getAuth()


    // Her definerer jeg en metode, der returnerer en knap, som aktiverer handleSubmit-metoden, når den trykkes.
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Opret" />;
    };


    // handleSubmit-metoden håndterer oprettelsen af en ny bruger med email og password.
      const handleSubmit = async() => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage)
          
        });
      }


    //Her beskriver jeg hvad der skal blive vist på skærmen 
    return (
        <View>
            <Text style={styles.header}>Opret Bruger</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="adgangskode"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}


const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 250
    },
    header: {
        
        textAlign: 'center',
        fontSize: 40,
    },
});


export default SignUpForm