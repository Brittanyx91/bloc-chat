import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
    constructor(props){
        super(props)
          this.state = {
            activeRoom: '',
            user: ''
   };
    }

    setActiveRoom(room) {
        this.setState({ activeRoom: room })

    }

    setUser(user){
        this.setState({user: user})
        console.log(user);

    }

render() {

    const activeUser = this.state.user === null ? 'Guest' : this.state.user.displayName;

    return (
      <div className="App">
        <aside className="list-rooms">
          <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} setActiveRoom={this.setActiveRoom}/>
        </aside>
        <div>
        <User className="greeting" firebase={firebase} setUser={this.setUser.bind(this)} activeUser={activeUser} />

          <main className="active-chat-room">
            <h2>{this.state.activeRoom.name}</h2>
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
          </main>
        </div>
      </div>
    );
  }
}
export default App;
