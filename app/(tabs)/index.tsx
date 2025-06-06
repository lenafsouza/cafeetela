import {Text, View, StyleSheet, ImageSourcePropType} from "react-native";
import {Link} from 'expo-router';
import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';

import Button from '@/app/components/Button';
import ImageViewer from "@/app/components/ImageViewer";
import IconButton from '@/app/components/IconButton';
import CircleButton from '@/app/components/CircleButton';
import EmojiPicker from '@/app/components/EmojiPicker';
import EmojiList from '@/app/components/EmojiList';
import EmojiSticker from '@/app/components/EmojiSticker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const PlaceholderImage = require('@/assets/images/cinema1.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined> (undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);



  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }else {
      alert ("você não selecionou nenhuma imagem!");
    }
  };

  const onReset = () => {
    setShowAppOptions (false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const onSaveImageAsync = async () => {
    //
  };

  return (
    <GestureHandlerRootView style={garro.container}>
      <View style = {garro.imageContainer}>
       <ImageViewer imgSource = {PlaceholderImage} selectedImage = {selectedImage} />
       {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />} 
    </View>

    {showAppOptions ? (
      <View style = {garro.optionsContainer}>
        <View style = {garro.optionsRow}>
          <IconButton icon="refresh" label="Reinício" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
           <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
        </View>
    </View>
    ) : (
    <View style= {garro.footerContainer}>
      <Button theme = "primary" label = "Escolha uma foto" onPress={pickImageAsync}/>
      <Button label = "Use esta foto"  onPress={() => setShowAppOptions (true)}/>
    </View>
    )}
    <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      <EmojiList onSelect={setPickedEmoji} onCloseModal = {onModalClose} />
    </EmojiPicker>
    </GestureHandlerRootView>
  );
}  

const garro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ADD8E6',
    //justifyContent: 'center',  
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
   //justifyContent: 'center',  
    //alignItems: 'center',     
   // textAlign: 'center',
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
   // marginTop: 15,
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});




