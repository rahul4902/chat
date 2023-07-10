import { useEffect, useState } from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button
} from '@material-ui/core';
import { apiCallGet } from '../../../helpers/api';
import { backendBaseUrl, backendUrl } from '../../../utils/constants';
import io from 'socket.io-client';
import { authUser } from '../../../utils/auth';
import moment from 'moment';

import { AttachementDialog } from './Attachement.js'
import UploadContainer from './UploadContainer'
import MsgForm from './MsgForm';

const socket = io.connect(backendBaseUrl)



function Main() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([])
    const [chatMessages, setChatMessages] = useState([]);
    const [uploadPreview, setUploadPreview] = useState(false)


    useEffect(() => {
        // Listen for incoming chat messages
        // socket.on('typing', ({ userId, isTyping }) => {
        //     setTypingUsers(prevTypingUsers => ({
        //         ...prevTypingUsers,
        //         [userId]: isTyping,
        //     }));
        // });

        socket.on('receive message', (message) => {
            console.log('in', message);

            setChatMessages((prevChatMessages) => [...prevChatMessages, message]);
        });
        // Listen for user chat
        socket.on('user chat', (history) => {
            console.log(history, 'user chat2');
            setChatMessages(history);
        });
        // alert('in');

        return () => {
            // socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const handleUserClick = (user) => {
        // console.log('click', user)
        setSelectedUser(user);
        // console.log('user chat for', selectedUser);
        // console.log({ receiverId: selectedUser?.id, senderId: authUser()?.id });
        if (selectedUser) {
            socket.emit('user chat', { receiverId: user.id, senderId: authUser().id });
        }

        // Clean up socket connection when component unmounts
        return () => {
            // socket.disconnect();
        };


    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resData = await apiCallGet(backendUrl + '/users/list/' + authUser()?.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('_token')}`
                    }
                });
                setUsers(resData.data);
            } catch (error) {
                // console.log(error);
            }
        };
        fetchUsers()
    }, []);





    function handleUploadChange(obj) {
        setUploadPreview(obj.show);
    }

    return (<>

        <Grid container className="chat_wrapper">

            <Grid item xs={3} className='userGrid'>
                {/* <List className='userList'>
                    {users?.map((user) => (
                        <ListItem key={'user-list-' + user.id} button onClick={() => handleUserClick(user)} selected={selectedUser &&
                            selectedUser.id === user.id} className='item'>
                            <ListItemAvatar>
                                <Avatar alt={user.name} src={user.avatar} />
                            </ListItemAvatar>

                            <div className="user-details" style={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemText primary={user.name} />
                                {typingUsers[user.id] && <span className="typing-indicator" style={{
                                    marginLeft: '10px',
                                    fontStyle: 'italic', color: 'lightGray'
                                }}> typing...</span>}
                            </div>
                        </ListItem>
                    ))}
                </List> */}

                <List className='userList' key={11}>
                    {users?.map((user) => (
                        <ListItem key={'user-list-' + user.id} button onClick={() => handleUserClick(user)} selected={selectedUser && selectedUser.id === user.id} className='item'>
                            <ListItemAvatar>
                                <Avatar alt={user.name} src={user.avatar} />
                            </ListItemAvatar>
                            <div className="user-details" style={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemText primary={user.name} />
                                {typingUsers[user.id] && (
                                    <span className="typing-indicator" style={{ marginLeft: '10px', fontStyle: 'italic', color: 'lightGray' }}>
                                        typing...
                                    </span>
                                )}
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={9}>


                {selectedUser ? (
                    <>
                        <UploadContainer show={uploadPreview} selectedUser={selectedUser} />
                        <div class="chat-container">
                            <div class="chat-header">
                                <div className='chatHeaderInfo'>
                                    <div>
                                        <img src={selectedUser.avatar} alt="" onError={(event) => {
                                            event.target.src = 'https://via.placeholder.com/150x150';
                                        }} className='chatHeaderInfo__img' />
                                    </div>
                                    <div className='chatHeaderInfo__name'>{selectedUser.name}</div>
                                </div>
                            </div>
                            <div class="chat-body">
                                <div className="chat-messages">
                                    {Array.isArray(chatMessages) && chatMessages.map((message, index) => (
                                        <div key={index} className={`chat-message chat-message-${message.senderId === authUser()?.id
                                            ? 'me' : 'them'}`}>
                                            <div className="sender">
                                                {message.isAttachment && message.attachments.length > 0 &&
                                                    <div className='row' style={{ justifyContent: 'flex-end' }}>
                                                        {message.attachments.map((attachment) => (
                                                            <div key={attachment.id} className='col-md-4 fileContainer'>
                                                                <img src={`${backendBaseUrl}/static/${attachment.fileName}`} alt="Attachment" />
                                                            </div>
                                                        ))}
                                                    </div>

                                                }
                                                <p style={{ borderTopRightRadius: '0px' }}> {message.content} </p>
                                                <span className="time">{moment(message.createdAt).format('h:mm A')}</span>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div class="chat-footer">
                                <div className="msg-box">
                                    <MsgForm selectedUser={selectedUser} />
                                    <AttachementDialog onChange={handleUploadChange} selectedUser={selectedUser} />
                                    <Button>
                                        <svg fill="gray" xmlns="http://www.w3.org/2000/svg" height="1.5em"
                                            viewBox="0 0 384 512">
                                            <path
                                                d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
                                        </svg>
                                    </Button>
                                </div>

                            </div>
                        </div>

                        {/* <div className='chat-container' style={{ position: 'relative' }}>

                            <div className='chatHeader'>

                            </div>
                            <div className='chatBody' >


                                <div className='chat-message-form'>
                                    <textarea name="" placeholder='Type your Message' className='ip-msg' id=""
                            rows="1"></textarea>

                        <div className="send-icon">
                            <Send />
                        </div> 

                                </div>
                            </div>

                        </div> */}
                    </>
                ) : (
                    <div className="no-user-selected chat-container">Select a user to start chatting</div>
                )}
            </Grid>
        </Grid >
    </>

    );
}
export default Main;