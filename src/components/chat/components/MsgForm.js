import { useContext, useState } from 'react';
import axios from 'axios';
import InputEmoji from "react-input-emoji";
import {
    Button
} from '@material-ui/core';
import { authUser } from '../../../utils/auth';

import io from 'socket.io-client';
import AttachmentContext from '../../../context/attachment/AttachmentContext';
import { backendBaseUrl, backendUrl } from '../../../utils/constants';
import { AttachementDialog } from './Attachement';
export default function MsgForm(props) {
    const [uploadPreview, setUploadPreview] = useState(false)
    function handleUploadChange(obj) {
        setUploadPreview(obj.show);
    }
    const { setInput, input, setUploadContainerOpen, selectedFiles } = useContext(AttachmentContext);
    const socket = io.connect(backendBaseUrl);
    const selectedUser = props.selectedUser;
    const [onTyping, setOnTyping] = useState(false)
    const scrollDown = () => {
        const element = document.querySelector('.chat-messages');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input) return false;
        console.log('Selected FIles', selectedFiles);
        if (selectedFiles) {
            console.log(selectedFiles);
            const formData = new FormData();
            formData.append('input', input);
            formData.append('files', selectedFiles[0]);


            axios
                .post(`${backendUrl}/attachment/message`, formData)
                .then((response) => {
                    const { fileUrl } = response.data;
                    console.log('file uploaded successfully:', fileUrl);
                    // Emit the file URL to the server using Socket.IO
                    socket.emit('fileUploaded', fileUrl);
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                    // Handle error response here
                });
        } else {
            socket.emit('chat message', { content: input, receiverId: selectedUser.id, senderId: authUser()?.id });
        }

        // console.log('asdfsdf');
        setInput('');
        setUploadContainerOpen(false)

        scrollDown();
    };

    const handleInputChange = (value) => {
        //alert(value)
        // var { value } = e.target;
        value = value.trim();
        // console.log(value);
        setInput(value);

        handleTyping(value ? true : false);
        setOnTyping(value ? true : false);
    };

    const handleTyping = (isTyping) => {
        // Emit "typing" event to the server
        // socket.emit('typing', { userId: authUser().id, receiverId: selectedUser.id, isTyping });
    };

    return (
        <form onSubmit={handleSubmit} className='msg-box-form'>

            <InputEmoji className="msg-input" onChange={handleInputChange}
                placeholder="Type a message" value={input} />

            <Button type="submit">
                <svg fill="gray" height="1.5em" viewBox="0 0 32 32" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>paper-plane-top</title>
                    <path
                        d="M31.083 16.589c0.105-0.167 0.167-0.371 0.167-0.589s-0.062-0.421-0.17-0.593l0.003 0.005c-0.030-0.051-0.059-0.094-0.091-0.135l0.002 0.003c-0.1-0.137-0.223-0.251-0.366-0.336l-0.006-0.003c-0.025-0.015-0.037-0.045-0.064-0.058l-28-14c-0.163-0.083-0.355-0.132-0.558-0.132-0.691 0-1.25 0.56-1.25 1.25 0 0.178 0.037 0.347 0.104 0.5l-0.003-0.008 5.789 13.508-5.789 13.508c-0.064 0.145-0.101 0.314-0.101 0.492 0 0.69 0.56 1.25 1.25 1.25 0 0 0 0 0.001 0h-0c0.001 0 0.002 0 0.003 0 0.203 0 0.394-0.049 0.563-0.136l-0.007 0.003 28-13.999c0.027-0.013 0.038-0.043 0.064-0.058 0.148-0.088 0.272-0.202 0.369-0.336l0.002-0.004c0.030-0.038 0.060-0.082 0.086-0.127l0.003-0.006zM4.493 4.645l20.212 10.105h-15.88zM8.825 17.25h15.88l-20.212 10.105z">
                    </path>
                </svg>
            </Button>
            <AttachementDialog onChange={handleUploadChange} selectedUser={selectedUser} />
            <Button>
                <svg fill="gray" xmlns="http://www.w3.org/2000/svg" height="1.5em"
                    viewBox="0 0 384 512">
                    <path
                        d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
                </svg>
            </Button>
        </form>
    )
}
