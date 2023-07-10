import React, { useEffect, useRef, useState } from 'react'
import "./css/style.scss"
import Search from '../icons/Search'
import MsgForm from './components/MsgForm'
import UserList from './components/UserLists'
import { AttachementDialog } from './components/Attachement';
import { Button } from '@material-ui/core';
import { apiCallGet } from '../../helpers/api';
import { authUser } from '../../utils/auth';
import { backendBaseUrl, backendUrl } from '../../utils/constants';

import moment from 'moment';
import { io } from 'socket.io-client';
import UploadContainer from './components/UploadContainer'
import InfiniteScroll from "react-infinite-scroller";
const socket = io.connect(backendBaseUrl)
function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [users, setUsers] = useState([])
  const [uploadPreview, setUploadPreview] = useState(false)
  const [currentChatUnreadMessage, setCurrentChatUnreadMessage] = useState(0)
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    let unreadCount = 0;

    if (Array.isArray(chatMessages)) {
      unreadCount = chatMessages.reduce((count, message) => {
        if (!message.isRead && message.senderId != authUser().id) {
          return count + 1;
        }
        return count;
      }, 0);
    }



    setCurrentChatUnreadMessage(unreadCount);

    // Mark As read
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const messageId = entry.target.getAttribute('data-message-id');

          markMessageAsRead(messageId);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);


    if (messagesEndRef.current) {
      const messageElements = messagesEndRef.current.querySelectorAll('.chat-messages');
      messageElements.forEach(messageElement => observer.observe(messageElement));
    }

    // return () => {
    //   observer.disconnect();
    // };
  }, [chatMessages]);

  const markMessageAsRead = (messageId) => {
    const updatedMessages = chatMessages.map(message => {
      // console.log('--m-', message.id, messageId, !message.isRead, message.senderId, authUser().id, message.content, (message.id == messageId && !message.isRead && message.senderId != authUser().id));
      if (message.id == messageId && !message.isRead && message.senderId != authUser().id) {
        message.isRead = true;
        socket.emit('mark as read message', messageId);
        // console.log('in true');
        setCurrentChatUnreadMessage(prevCount => prevCount - 1);
      }
      return message;
    });

    // setMessages(updatedMessages);
  };

  const fetchMessages = () => {
    if (selectedUser) {
      if (selectedUser) {
        apiCallGet(`${backendUrl}/messages/list/${authUser().id}/${selectedUser?.id}?page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('_token')}`
          }
        }).then((response) => {
          console.log('response2', response)
          setPage(prevPage => (hasMore ? prevPage + 1 : prevPage));
          setChatMessages(prevMessages => [...prevMessages, ...response.data.messages]);
        });
      }
    }
  }


  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="side-body">
          <div className="search-section">
            <h2>Chats</h2>
            <Search />
          </div>
          <div className="keyword-section">
            <div className='item'>
              All
            </div>
          </div>
          <div className="user-list">
            <UserList users={users} setUsers={setUsers} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setChatMessages={setChatMessages} page={page} setPage={setPage} setHasMore={setHasMore} hasMore={hasMore} messagesEndRef={messagesEndRef}/>
          </div>
        </div>
      </div>
      <div className="chat-body">
        <UploadContainer show={uploadPreview} selectedUser={selectedUser} />
        {selectedUser ? <>
          <div className="message-container">
            <div className="header-profile">
              <div className="image">
                {selectedUser.avatar ? <img onError={(event) => {
                  event.target.src = '/Assets/Images/user.png';
                }} src={selectedUser.avatar}
                  alt="user" /> : <img src='/Assets/Images/user.png' alt="user" />}

              </div>
              <div className='content'>
                <div className="name-section">
                  <div className="name">
                    <span>{selectedUser.name}</span>
                  </div>
                </div>
                <div className="description">
                  <span>
                    Unread Msg : {currentChatUnreadMessage}
                  </span>
                  {/* <span >Online 5 min ago </span> */}
                </div>
              </div>
            </div>
            <div className="messages" ref={messagesEndRef}>
              {Array.isArray(chatMessages) && chatMessages.map((message, index) => {
                return (<div key={`${index}`} className={`chat-messages chat-message-${message.senderId === authUser()?.id
                  ? 'me' : 'them'}`} data-message-id={message.id}>
                  <div className="sender">
                    {message.isAttachment && message.attachments.length > 0 &&
                      <div className={`row attachment-${message.senderId === authUser()?.id
                        ? 'me' : 'them'}`}>
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className='col-md-4 fileContainer'>
                            <img src={`${backendBaseUrl}/static/${attachment.fileName}`} alt="Attachment" />
                          </div>
                        ))}
                      </div>
                    }
                    <p style={{ borderTopRightRadius: '0px' }}> {index} -{message.content} </p>
                    <span className="time">{moment(message.createdAt).format('h:mm A')}</span>
                  </div>

                </div>)
              })}
              {/* <InfiniteScroll
                pageStart={1}
                loadMore={fetchMessages}
                hasMore={hasMore}
                loader={<div>Loading...</div>}
              >
                {Array.isArray(chatMessages) && chatMessages.map((message, index) => {
                  return (<div key={`${index}`} className={`chat-messages chat-message-${message.senderId === authUser()?.id
                    ? 'me' : 'them'}`} data-message-id={message.id}>
                    <div className="sender">
                      {message.isAttachment && message.attachments.length > 0 &&
                        <div className={`row attachment-${message.senderId === authUser()?.id
                          ? 'me' : 'them'}`}>
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id} className='col-md-4 fileContainer'>
                              <img src={`${backendBaseUrl}/static/${attachment.fileName}`} alt="Attachment" />
                            </div>
                          ))}
                        </div>
                      }
                      <p style={{ borderTopRightRadius: '0px' }}> {index} -{message.content} </p>
                      <span className="time">{moment(message.createdAt).format('h:mm A')}</span>
                    </div>

                  </div>)
                })}
              </InfiniteScroll> */}


            </div>
          </div>
          <div className="chat-footer">
            <MsgForm selectedUser={selectedUser} />
          </div>
        </>
          : <><div className="message-container"></div><div className="chat-footer"></div></>}



      </div>


    </div >
  )
}

export default Chat