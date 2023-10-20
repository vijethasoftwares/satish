import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import MyDrawer from './src/navigation/DrawerStack';
import store from './src/redux/Store';
import {Provider} from 'react-redux';

const App = () => {
  let token = null;
  return (
    <Provider store={store}>
      <NavigationContainer>
        {token ? <MyDrawer /> : <AuthStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
// React Native Example to Take Screenshot Programmatically
// https://aboutreact.com/take-screenshot-programmatically/

// // import React in our code
// import React, {useState} from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {createPdf} from 'react-native-images-to-pdf';
// // import CaptureScreen
// import {captureScreen} from 'react-native-view-shot';
// import RNFetchBlob from 'rn-fetch-blob';
// const App = () => {
//   const [imageURI, setImageURI] = useState(
//     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
//   );
//   const [savedImagePath, setSavedImagePath] = useState('');
//   console.log('savedImagePath', savedImagePath);
//   const takeScreenShot = () => {
//     // To capture Screenshot
//     const {
//       dirs: {DownloadDir},
//     } = RNFetchBlob.fs;
//     // const date = new Date();
//     captureScreen({
//       // Either png or jpg (or webm Android Only), Defaults: png
//       format: 'jpg',
//       // Quality 0.0 - 1.0 (only available for jpg)
//       quality: 0.8,
//     }).then(
//       //callback function to get the result URL of the screnshot
//       uri => {
//         console.log('urinfjdknfodkljfnceodklfnceodkl', uri);
//         const aPath = DownloadDir;
//         console.log('aPath', aPath);
//         const file = `${aPath}/${new Date().getDate()}${new Date().getTime()}CheckClaim.jpg`;
//         console.log('aPath', file);
//         let base64Str = uri;
//         const options = {
//           pages: [{imagePath: uri}],
//           outputPath: `file://${aPath}/file11.pdf`,
//         };
//         createPdf(options)
//           .then(path =>
//             RNFetchBlob.fs
//               .writeFile(file, path)
//               .then(r => {
//                 console.log('rrrrrrrrrrrr', r);
//                 RNFetchBlob.android.addCompleteDownload({
//                   title: `Download .....`,
//                   description: 'desc',
//                   mime: 'application/pdf',
//                   path: file,
//                   showNotification: true,
//                   notification: true,
//                 });
//                 Alert.alert('Export Data Successfully...');
//               })
//               .catch(e => {
//                 console.log('Error===>', e);
//               }),
//           )
//           .catch(error => console.log(`Failed to create PDF: ${error}`));
//       },
//       error => console.error('Oops, Something Went Wrong', error),
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <Text style={styles.titleText}>
//           React Native Example to Take Screenshot Programmatically
//         </Text>
//         <Image
//           source={{uri: imageURI}}
//           style={{
//             width: 200,
//             height: 300,
//             resizeMode: 'contain',
//             marginTop: 5,
//           }}
//         />
//         <TouchableOpacity style={styles.buttonStyle} onPress={takeScreenShot}>
//           <Text style={styles.buttonTextStyle}>Take Screenshot</Text>
//         </TouchableOpacity>
//         {savedImagePath !== '' && (
//           <Image
//             source={{uri: savedImagePath}}
//             style={{width: 200, height: 200}}
//             onError={error => console.error('Image load error:', error)}
//           />
//         )}
//         <Text style={styles.textStyle}>
//           {savedImagePath ? `Saved Image Path\n ${savedImagePath}` : ''}
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     alignItems: 'center',
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   textStyle: {
//     textAlign: 'center',
//     padding: 10,
//   },
//   buttonStyle: {
//     fontSize: 16,
//     color: 'white',
//     backgroundColor: 'green',
//     padding: 5,
//     minWidth: 250,
//   },
//   buttonTextStyle: {
//     padding: 5,
//     color: 'white',
//     textAlign: 'center',
//   },
// });
