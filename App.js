import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image,ScrollView} from 'react-native';
import { Camera } from 'expo-camera';
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imagelist,setImagelist]=useState([])
  const [type, setType] = useState(Camera.Constants.Type.back);useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');})();
  }, []);const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
       setImagelist((imagelist)=> [...imagelist , {image :data.uri}]);
       console.log(imagelist)
    }
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const display=()=>{
  }
  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={'1:1'} />
      </View>
      <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
        <Button title={"Dispaly Images"} onPress={display}/>
       <Button title="Take Picture" onPress={() => takePicture()} />
       {imagelist.map ((img) =>(
  <Image style={{height: 50, width: 50}} source={{ uri:img.image }} />
       ))}
 </View>
  );
}
const styles = StyleSheet.create({
  ImageContainer: {
   marginHorizontal: 16,
   marginTop: 30,
   width: "100%",
 },
 Image: {
   shadowColor: "black",
   shadowOffset: {
     width: -10,
     height: 9,
   },
   shadowOpacity: 0.5,
   shadowRadius: 2,
   elevation:5
 },
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
})