import React, { Component } from 'react';
import './../App.css';


class MessageList extends Component {
    constructor(props) {
    super(props)
        this.state = {
            messages: [],
            username: '',
            sentat: '',
            content: '',
            roomid: ''

        };

        this.messagesRef = this.props.firebase.database().ref('Messages');

    };
        componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                messages: this.state.messages.concat(message),
            })
        });
        }

        handleChange(e){
          this.setState({
                username: this.props.user,
                content: e.target.value,
                sentat: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomid: this.props.activeRoom});

        }

        handleSubmit(e){
            e.preventDefault();
            if (!this.state.content) {return}
        }

        createMessage(e){
            e.preventDefault();
            this.messagesRef.push({
                username: this.state.username,
                sentat: this.state.sentat,
                roomid: this.props.activeRoom,
                content: this.state.content

            });
        }

        render() {
          const activeRoom = this.props.activeRoom;
          var messageList = this.state.messages.filter(message => message.roomid === activeRoom.key);
          messageList = messageList.map(message => {
            return <li className="current-message"key={message.key}>{message.content} {message.username} {message.sentat} </li>
          })

          return (
                <div className="chatroom-messages">
                    <div>{messageList}
                    </div>

                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="text" name="newmessage" placeholder="New Message" value={this.state.content}
                        onChange={(e) => this.handleChange(e)} />
                        <button type="submit" onClick={(e) => this.createMessage(e)}>Send</button>
                        </form>
                    </div>
        );
    }
}

export default MessageList;
