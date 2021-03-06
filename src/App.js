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
            user: null

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

    const displayMessages = this.state.activeRoom;
    const activeUser = this.state.user === null ? 'Guest' : this.state.user.displayName;

    return (
      <div className="App">
        <nav>
        <h2 className="app-title"> Bloc Chat </h2>
        <User className="greeting" firebase={firebase} setUser={this.setUser.bind(this)} activeUser={activeUser} />
        </nav>
        <aside className="list-rooms">
          <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
        </aside>
        <div>
          <main className="active-chatroom">
            <h2>{this.state.activeRoom.name}</h2>

            {displayMessages ?

            (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={activeUser}/>)
            : (null)
            }

          </main>
        </div>
      </div>
    );
  }
}

export default App;
