import { Text, View, StyleSheet} from "react-native";
import {Link} from 'expo-router';
import {Image} from 'expo-image';

import Button from '@/app/components/Button';
import ImageViewer from '@/app/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/cinema1.png');

export default function Index() {
  return (
    <View style={garro.container}>
      <View style = {garro.imageContainer}>
       <ImageViewer imgSource = {PlaceholderImage} />
    </View>
    <View style= {garro.footerContainer}>
      <Button theme = "primary" label = "Escolha uma foto"/>
      <Button label = "Use esta foto" />
    </View>
    </View>
  );
}  

const garro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ADD8E6',
    justifyContent: 'center',  
    alignItems: 'center',
        

  },
  text: {
    color: '#20B2AA',
    fontSize: 15,
    padding:20,
    textAlign: 'center',

    
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },

  imageContainer: {
    flex:1,
    justifyContent: 'center',  
    alignItems: 'center',     
    textAlign: 'center',
  },

  image:{ 
    width:360,
    height:440,
    borderRadius: 18,
    marginBottom: 20,
  },

  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
    marginTop: 15,
  },

});
