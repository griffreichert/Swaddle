import { StatusBar } from 'expo-status-bar';
import { Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
  // let openImagePickerAsync = async () => {
  //   let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   console.log(pickerResult);
  // }

  // return (
  //   <View style={styles.container}>
  //     <TouchableOpacity
  //       onPress={ openImagePickerAsync }>
  //       <Image
  //         source={ require('./assets/camera.png') }
  //         style={ styles.iconButton }
  //       />
  //     </TouchableOpacity>

  //     <StatusBar style="auto" />
  //   </View>
  // );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#7760ea',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     margin: 10,
//   },
//   text: {

//   },
//   title: {

//   },
// });
