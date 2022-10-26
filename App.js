import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity,View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    setSelectedImage({ localUri: pickerResult.uri });
    console.log(pickerResult);
  };
  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  };

  if( selectedImage !== null ){
    return(
      <View style={styles.container}>
        <Image source={{ uri : selectedImage.localUri }} style={ styles.thumbnail } />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.botao}>
          <Text style={styles.txtBotao}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={ styles.logo } />

      <Text style={styles.texto}>Hello world!!</Text>
      <TouchableOpacity 
        onPress={openImagePickerAsync}
        style={styles.botao}>
        <Text style={styles.txtBotao}>Pressione, vai!</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail:{
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  botao:{
    backgroundColor:'blue',
    padding:30,
    borderRadius:5,
    margin:20
  },
  txtBotao:{
    color:'#FFF'
  },
  logo:{
    width: 305, 
    height: 159, 
    margin:40
  },
  texto:{
    color: 'red' , 
    fontSize: 58
  },
});
