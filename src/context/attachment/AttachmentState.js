import React, {
    useState,
    useRef
} from 'react'

/* if you want to add data from api or json you can add it like this  */

import AttachmentContext from "./AttachmentContext";

const AttachmentState = (props) => {

    /* Here Add States you want to add globally  */

    const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false)
    const [uploadContainerOpen, setUploadContainerOpen] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [imagePreviews, setImagePreviews] = useState([])
    const [previewFile, setPreviewFile] = useState('')
    const [input, setInput] = useState('')
    const [progressInfos, setProgressInfos] = useState({
        val: []
    })
    const [imageInfos, setImageInfos] = useState([]);
    const progressInfosRef = useRef(null);

    /* Here add them inside the function to use them  */
    const state = {
        attachmentDialogOpen,
        setAttachmentDialogOpen,
        uploadContainerOpen,
        setUploadContainerOpen,
        selectedFiles,
        setSelectedFiles,
        imagePreviews,
        setImagePreviews,
        progressInfos,
        setProgressInfos,
        input,
        setInput,
        imageInfos,
        setImageInfos,
        setPreviewFile,
        previewFile
    }


    return (<AttachmentContext.Provider value={state} > {props.children} </AttachmentContext.Provider>
    )
}

export default AttachmentState