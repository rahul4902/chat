
import React, { useContext, useEffect, useState } from 'react';
import AttachmentContext from '../../../context/attachment/AttachmentContext';
import MsgForm from './MsgForm';

export default function UploadContainer(props) {
    var context = useContext(AttachmentContext);
    var imagePreviews = context.imagePreviews;
    const [singPreviewImage, setSingPreviewImage] = useState();
    // imagePreviews.length ? imagePreviews[0].imageURL : ''
    // useEffect(() => {
    //     imagePreviews = context.imagePreviews;
    // }, [imagePreviews])
    useEffect(() => {
        console.log(imagePreviews[0], 'imagePreviews');
        console.log('hiiii')
    }, [])


    function closeHandler() {
        context.setUploadContainerOpen(false);
    }
    function removePreview(key) {
        imagePreviews = context.imagePreviews;
        let selectFile = context.selectedFiles;
        var d = imagePreviews.splice(key, 1)
        console.log(d, imagePreviews.length);
        context.setImagePreviews([...imagePreviews]);

        if (!imagePreviews.length) {
            context.setUploadContainerOpen(false)
        } else {
            setSingPreviewImage(imagePreviews[key - 1].imageURL);
        }
    }

    function previewSingleImage(ikey) {
        setSingPreviewImage(imagePreviews[ikey].imageURL);
    }
    return (
        <>

            <div style={{ display: context.uploadContainerOpen ? 'block' : 'none' }} className='uploader_container_body'>
                <div className='close' role='button' onClick={closeHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="2em" fill='#69696a' viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </div>

                <div className='uploader_container_container'>


                    <div className='form-section'>
                        <div className='preview-single-img'>
                            <img src={imagePreviews[0] ? imagePreviews[0].imageURL : 'xyzd'} alt="single-preview" />
                        </div>
                        <MsgForm selectedUser={props.selectedUser} />

                        <div className='preview'>
                            {imagePreviews && (
                                <>
                                    {imagePreviews.map((img, i) => {
                                        return (
                                            <div className="previewImg" key={'image-preview-' + i}>
                                                <div className='close_img' onClick={() => removePreview(i)} data-value={i}>
                                                    {i}<svg xmlns="http://www.w3.org/2000/svg" height="1em" fill='#69696a' viewBox="0 0 384 512">
                                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                                                </div>
                                                <img src={img.imageURL} alt={img.file.name} key={i} onClick={() => previewSingleImage(i)} />

                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
