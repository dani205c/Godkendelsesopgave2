import React, { useState} from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Jeg importerer nødvendige metoder fra Firebase for autentificering.


function LoginForm() {

    const auth = getAuth();

     // Jeg opretter state variabler for email, password, formens færdiggørelsesstatus og eventuelle fejlmeddelelser.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

  // Denne funktion vil blive kaldt, når brugeren forsøger at logge ind.
    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
             
            const user = userCredential.user;
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

 // Jeg definerer en funktion, der returnerer en knap, som brugeren kan klikke på for at indsende formen.
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Log Ind" />;
    };

 // Her er hvad der rent faktisk vil blive vist til brugeren. Det inkluderer inputfelter for email og password samt indlogningsknappen.
    return (
        <View>
            <Text style={styles.header}>Log Ind</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="adgangskode"
                value={password}
                onChangeText={(password) => setPassword(password) }
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


export default LoginForm