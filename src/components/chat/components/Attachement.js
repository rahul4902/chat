import React, { useRef, useContext, useState } from 'react';

import { Button, Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, DialogTitle, Dialog, Typography } from '@mui/material';
import { Person, Add, Image } from '@mui/icons-material';
import AttachmentContext from '../../../context/attachment/AttachmentContext';



function Attachement(props) {
    const { input, setPreviewFile, setSelectedFiles, setImagePreviews, setProgressInfos, setAttachmentDialogOpen, setUploadContainerOpen, attachmentDialogOpen } = useContext(AttachmentContext);

    // console.log(context.attachmentDialogOpen);
    // context.setAttachmentDialogOpen(true)
    //  const { attachmentDialogOpen, setAttachmentDialogOpen } = props;

    const inputFile = useRef(null);


    function uploadImageMsg($key) {
        inputFile.current.click();

    }

    function attachementChangeHandler(event) {
        let images = [];
        const files = event.target.files;

        let firstImageURL = URL.createObjectURL(files[0]);
        setPreviewFile(firstImageURL);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageURL = URL.createObjectURL(file);
            images.push({ file, imageURL });
        }
        setSelectedFiles(files);

        setImagePreviews(images);
        setProgressInfos({ val: [] });

        setAttachmentDialogOpen(false)
        setUploadContainerOpen(true)

    }

    return (
        <Dialog open={attachmentDialogOpen} >
            <DialogTitle>Attachments</DialogTitle>
            <input type='file' id='file' accept="image/*" ref={inputFile} style={{ opacity: 0 }} onChange={attachementChangeHandler} multiple />
            <List sx={{ pt: 0, display: 'flex' }} >
                <ListItem disableGutters key={0}>
                    <ListItemButton
                        autoFocus
                        onClick={() => uploadImageMsg('uploadImage')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <Image />
                            </Avatar>
                        </ListItemAvatar>
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters >
                    <ListItemButton
                        autoFocus
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

export function AttachementDialog(props) {
    var context = useContext(AttachmentContext);

    const handleClickOpen = () => {
        context.setAttachmentDialogOpen(true);
    };

    const handleClose = (value) => {
        context.setAttachmentDialogOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen} type="button">
                <svg fill="gray" xmlns="http://www.w3.org/2000/svg" height="1.5em"
                    viewBox="0 0 448 512">
                    <path
                        d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                </svg>
            </Button>
            <Attachement
                onClose={handleClose}
            />
        </>
    );
}
