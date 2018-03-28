import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


  var config = {
    apiKey: "AIzaSyAdzdY8TpKfESNLbWNcqLssKa7NgZ9yTJs",
    authDomain: "bloc-chat-1991.firebaseapp.com",
    databaseURL: "https://bloc-chat-1991.firebaseio.com",
    projectId: "bloc-chat-1991",
    storageBucket: "bloc-chat-1991.appspot.com",
    messagingSenderId: "680767040123"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <RoomList firebase = {firebase}/>

    );
  }
}

export default App;
