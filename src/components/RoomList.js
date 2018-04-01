import React, { Component } from 'react';
import './../App.css';

class RoomList extends Component {
    constructor(props) {
      super(props);
        this.state = {
          rooms: [],
          newRoomName: "",
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
      };

      componentDidMount () {
        this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({ rooms: this.state.rooms.concat( room ) })
        });
      }

      handleChange(e) {
        this.setState({ newRoomName: e.target.value });
      }

      createRoom(e) {
        e.preventDefault();
        const newRoomName = this.state.newRoomName;
        this.roomsRef.push({name: newRoomName});
        this.setState({newRoomName: ""});
      }

      selectRoom(key){
        this.props.activeRoom(key);
      }

      render() {
        return (
          <section className= "room-list">
          <div className= "list-names">
          <ul>
            {this.state.rooms.map( (room) => {
              return (
                <div key={room.key} onClick={(e) => this.selectRoom(room, e)}> {room.name} </div>
              )
            })}
              <form onSubmit={(e) => this.createRoom(e)}>
              <input type="text" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } name="newRoomName" placeholder="Create a new room" />
              <button type="submit" onClick={(e) => this.createRoom(e)}>Create Room</button>
            </form>
            </ul>
            </div>
            </section>
          );
        }
      }


export default RoomList;
