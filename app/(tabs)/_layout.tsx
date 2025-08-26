import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from 'react-native-gesture-handler';




export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#20B2AA', //cor do icone do botao
        headerStyle: {
          backgroundColor: '#ADD8E6', //cor do header
        },
        headerShadowVisible: false,
        headerTintColor: '#20B2AA',// cor do texto do header
        tabBarStyle: {
          backgroundColor: '#ADD8E6', //cor da tab bar - parte de baixo onde fica o icone
        },
      }}  
      >
      <Tabs.Screen
        name= "index"
        options={{
            title: 'Café e Tela',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name= {focused? 'cafe-outline': 'cafe-outline'} color = {color} size={24} /> //icone
            ),
        }}
        />
        <Tabs.Screen
          name= "about"
          options={{
            title: 'Sobre Nós',
            tabBarIcon: ({ color, focused}) => (
              <Ionicons name = {focused? 'film-outline': 'film-outline'} color={color} size={24}/> //icone
            ),
          }}
          />
          <Tabs.Screen
            name="toDoList"
            options={{
              title: 'Lista de Tarefas',
              tabBarIcon: ({color,focused})=> (
                <Ionicons name = {focused? 'battery-dead': 'battery-dead'} color={color} size={24}/>
              ),
            }}
            />
            <Tabs.Screen
            name='buscarFilme'
            options={{
              title: 'Consultar Filmes',
              tabBarIcon: ({color, focused}) => (
                <Ionicons name = {focused? 'clipboard-outline': 'clipboard-outline'} color = {color} size={24}/>
              ),
            }}
            />
             <Tabs.Screen
            name='ingresso'
            options={{
              title: 'Programação',
              tabBarIcon: ({color, focused}) => (
                <Ionicons name = {focused? 'ticket-outline': 'ticket-outline'} color = {color} size={24}/>
              ),
            }}
            />
          </Tabs>
          
  );
}



