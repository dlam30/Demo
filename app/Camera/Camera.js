var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import React, {Component} from 'react';
import {
  AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, Navigator, Dimensions, ActivityIndicator
} from 'react-native';
import ApiHandler from '../API/ApiHandler'
import Sha256 from '../SHA'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
var app = new ApiHandler();
var {height, width} = Dimensions.get('window');
//firebase
const storage = firebase.storage()
//Blob
const Blob  = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null //can be
      //uploadURL: ''
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  takePhoto(){
    ImagePicker.launchCamera({noData: true }, this.setImage);
  }

  chooseImage(){
    ImagePicker.launchImageLibrary({noData: true }, this.setImage);
  }

  _pickImage() {
    this.setState({ uploadURL: '' })
    ImagePicker.launchImageLibrary({}, response => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
   })
  }
  _pickImageCamera() {
    console.log('IM HERE');
    this.setState({ uploadURL: '' })
    ImagePicker.launchCamera({ noData: true }, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        uploadImage(response.uri)
          .then(url => this.setState({ uploadURL: url }))
          .catch(error => console.log(error))
      }
   })
  }
  setImage(response){
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //If it is iOS, remove 'file://' prefix
      let source = {uri: response.uri.replace('file://', ''), isStatic: true};

      //If android, don't need to remove the 'file://'' prefix
      if (Platform.OS === 'android') {
        source = {uri: response.uri, isStatic: true};
      }

      this.setState({image: source});
    }
  }

  render() {
    return (
      /*<View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#50cb66'}}>
          {this.state.image?<Image style={{flex: 1}} source={this.state.image}></Image>:null}
          <View style={styles.container2}>
            <TouchableOpacity style={styles.button} onPress={this.takePhoto}>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.chooseImage}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this._pickImage}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this._onPressBack}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>*/
      <View style={ styles.container }>
       {
         (() => {
           switch (this.state.uploadURL) {
             case null:
               return null
             case '':
               return <ActivityIndicator />
             default:
               return (
                 <View>
                   <Image
                     source={{ uri: this.state.uploadURL }}
                     style={ styles.image }
                   />
                   <Text>{ this.state.uploadURL }</Text>
                 </View>
               )
           }
         })()
       }

       <View style={styles.container2}>
         <TouchableOpacity style={styles.button} onPress={ () => this._pickImageCamera() }>
           <Text style={styles.buttonText}>Use Camera</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={ () => this._pickImage() }>
           <Text style={styles.buttonText}>Upload Image</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={ this._onPressDone }>
           <Text style={styles.buttonText}>Done</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={this._onPressBack}>
           <Text style={styles.buttonText}>Cancel</Text>
         </TouchableOpacity>
       </View>
</View>
    );
  }
 //On buttons
  _onPressBack = () => {
      this.props.navigator.pop()
  }
  _onPressDone = () => {
    this.props.navigator.replace({
        title: 'NewListing',
        name: 'NewListing',
        passProps : {
            imageURL: this.state.uploadURL,
            username: this.props.username
        }
    })
  }
  //Image stuff


}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#50cb66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: width * .20,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  buttonText:{
    color: 'white'
  },
  button2: {
      height: 30,
      width: 75,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
  },
  container2: {
      flex: .10,
      flexDirection: 'row',
      width: width,
      height: height,
      backgroundColor: '#50cb66',
      justifyContent: 'center',
      alignItems: 'center',
      //resizeMode: 'cover',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
    borderWidth: 5,
    borderColor: "black"
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
});
