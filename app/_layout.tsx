import {Stack} from 'expo-router';
import {StatusBar} from "expo-status-bar";
import { LogBox } from 'react-native';


export default function RootLayout(){
    return(
        <>
        <StatusBar style = "light"/>
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#ADD8E6', },
                headerShadowVisible: false,
                headerTintColor: '#20B2AA',
            }}
            >
            <Stack.Screen name = "(tabs)" options = {{ headerShown: false }} 
        />
            <Stack.Screen name = "+not-found" options={{}} />
            </Stack>
        </>
    );
}      