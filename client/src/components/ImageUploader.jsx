import React, { useState } from 'react';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import Button from '@mui/material/Button';
import { Delete as DeleteIcon, } from "@mui/icons-material"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import '../style/ImageUploader.scss'

export const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleUpload = () => {
    // const formData = new FormData();
    // selectedImages.forEach((image, index) => {
    //   formData.append(`image${index}`, image);
    // });
    // fetch('/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(response => {
    //     // Handle the response
    //   })
    //   .catch(error => {
    //     // Handle the error
    //   });
  };

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
    </div>
  );
};
