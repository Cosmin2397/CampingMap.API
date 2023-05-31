import React, { useState, useEffect } from 'react';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import Button from '@mui/material/Button';
import { Delete as DeleteIcon, } from "@mui/icons-material"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import Divider from '@mui/material/Divider'
import { useDeleteQuery } from '../hooks/useDeleteQuery'
import { useGetQuery } from '../hooks/useGetQuery'
import { Message } from './common/Message'

import '../style/ImageUploader.scss'

export const ImageUploader = ({ campingId, campingImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedImagesList, setUpdatedImagesList] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null)

  const  {deleteRequest: deleteImage, response: responseDeleteImage, error: errorDeleteImage } = useDeleteQuery(
    'Photos/'
  )

  const  {getRequest: getImages, response:  updateImages} = useGetQuery(
    `Photos/camping-photos/${campingId}`
  )

  useEffect(() => {
    if(updateImages?.data?.length) {
      setUpdatedImagesList(updateImages?.data)
    } else {
      setUpdatedImagesList(campingImages)
    }
  }, [updateImages, campingImages])

  useEffect(() => {
    if(responseDeleteImage?.status === 200) {
      getImages()
    }
  }, [responseDeleteImage])

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);

    const validImages = imagesArray.filter(validateImage);

    if (validImages.length > 0) {
      setSelectedImages([...selectedImages, ...validImages]);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid image format or size');
    }
  };

  const validateImage = (file) => {
    const allowedFormats = ['image/jpeg', 'image/png'];
    const maxSize = 0.5 * 1024 * 1024; // 500KB

    if (!allowedFormats.includes(file.type)) {
      return false;
    }

    if (file.size > maxSize) {
      return false;
    }

    return true;
  };

  const handleDelete = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const imageRequest = (image) => {
    const formData = new FormData();
    formData.append('imageFile', image);

    if(campingId) {
      axios.post(`${process.env.REACT_APP_API_URL}Photos/${campingId}`, formData)
      .then((response) => {
        if(response?.status === 200) {
          setUploadResponse('success')
          setSelectedImages([])
          getImages()
        } else {
          setUploadResponse('error')
        }
      })
    }
  }
  const handleUpload = () => {
    selectedImages.forEach(photo => {
      imageRequest(photo);
    });
  }

  const handleDeleteImage = (imageId) => {
    deleteImage(imageId)
  }

  

  return (
    <div className='images-uploader'>
      <div className="upload-header">
      <label htmlFor='imagesInput'>
        <PermMediaOutlinedIcon />
        <span>{ selectedImages?.length ? `${selectedImages?.length} ${selectedImages?.length === 1 ? 'image' : 'images'} selected` : 'No images selected' }</span>
      </label>
      <input id="imagesInput" type="file" accept="image/*" multiple onChange={handleImageChange} />
      <Button
        color="primary"
        size='small'
        onClick={handleUpload}
        variant="outlined"
        disabled={selectedImages.length === 0}
        className='upload-btn'
      >
        <CloudUploadOutlinedIcon />
        <span>Upload</span>
      </Button>
      </div>

      <div className='images-preview'>
        {selectedImages.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={image?.name} />
            <DeleteIcon className='delete-icon' onClick={() => handleDelete(index)}/>
          </div>
        ))}
      </div>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}

     { updatedImagesList?.length ?  
      (
        <>
          <Divider textAlign="left" sx={{ mt: 2 }}>Existing images</Divider>
          <div className="images-preview">
          {updatedImagesList?.map(image => (
              <div key={image?.id}>
                <img src={`data:image/jpeg;base64,${image?.image}`} alt={image?.name}/>
                <DeleteIcon className='delete-icon' onClick={() => handleDeleteImage(image?.id)} />
              </div>
            ))}
          </div>
          </>
        ) : ''
      }
      { responseDeleteImage?.status === 200 ? 
          <Message 
            showMessage={responseDeleteImage} 
            type="success" 
            message={`Image was successfully deleted!`}
          />
          :
          <Message 
              showMessage={errorDeleteImage} 
              type="error" 
              message="Image could not be deleted!"
          />
        }
        { uploadResponse === 'success' ? 
          <Message 
            showMessage={uploadResponse === 'success'} 
            type="success" 
            message={`Image was successfully uploaded!`}
          />
          :
          <Message 
              showMessage={uploadResponse === 'error'} 
              type="error" 
              message="Image could not be uploaded!"
          />
        }
    </div>
  );
};
