import * as MediaLibrary from 'expo-media-library'; 
import { Text, View, StyleSheet, ImageSourcePropType, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';  // Usando react-native-view-shot para captura de tela

import Button from '@/app/components/Button';
import ImageViewer from "@/app/components/ImageViewer";
import IconButton from '@/app/components/IconButton';
import CircleButton from '@/app/components/CircleButton';
import EmojiPicker from '@/app/components/EmojiPicker';
import EmojiList from '@/app/components/EmojiList';
import EmojiSticker from '@/app/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/cinema1.png');

// Para importação de html-to-image, se estiver na web
import * as htmlToImage from 'html-to-image'; 

export default function Index() {
  const imageRef = useRef<View>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  // Solicita permissão para acessar a galeria (somente no dispositivo móvel)
  if (!status) {
    requestPermission();
  }

  // Função para escolher imagem da galeria
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("Você não selecionou nenhuma imagem!");
    }
  };

  // Reinicia o editor
  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
  };

  // Abre seletor de emoji
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // Fecha seletor de emoji
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // Função para salvar a imagem na web ou no dispositivo móvel
  const onSaveImageAsync = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web: Usa html-to-image para capturar a imagem e salvar como arquivo
        if (imageRef.current) {
          const element = imageRef.current as unknown as HTMLElement; // Converte para HTMLElement

          const dataUrl = await htmlToImage.toPng(element);

          // Cria um link para o download da imagem
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'imagem_editada.png';
          link.click();

          alert('Imagem salva com sucesso!');
        }
      } else {
        // Mobile: Usa react-native-view-shot para capturar a imagem e salvar na galeria
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
          format: 'png',
        });

        // Salva a imagem na biblioteca do dispositivo
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert('Imagem salva com sucesso!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={garro.container}>
      <View style={garro.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={garro.optionsContainer}>
          <View style={garro.optionsRow}>
            <IconButton icon="refresh" label="Reinício" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={garro.footerContainer}>
          <Button theme="primary" label="Escolha uma foto" onPress={pickImageAsync} />
          <Button label="Use esta foto" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const garro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
  },
  text: {
    color: '#20B2AA',
    fontSize: 15,
    padding: 20,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 360,
    height: 440,
    borderRadius: 18,
    marginBottom: 20,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
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
