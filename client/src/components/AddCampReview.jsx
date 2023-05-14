import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { usePostQuery } from '../hooks/usePostQuery'
import { Message } from './common/Message'
import Rating from '@mui/material/Rating';


export const AddCampReview = ({ campingId, userId, closeModal }) => {
    const [reviewData, setReviewData] = useState({})

    const formattedReviewData = {
        ...reviewData,
        rating: Number(reviewData.rating),
        campingId,
        userId
    }
    const  {postRequest, loading: loadingAddReview, response: responsAddReview,  error: errorAddReview } = usePostQuery(
        'Reviews', 
        formattedReviewData
    )


    const RequestMessage = () => {
        return (
         !!responsAddReview && !!reviewData && !loadingAddReview ?   
           <Message 
             showMessage={responsAddReview} 
             type="success" 
             message="Review was successfully added" 
           />
           :
           (
             <Message 
               showMessage={errorAddReview} 
               type="error" 
               message={errorAddReview?.response?.data ?? "Couldn't add review, check the form"}
             />
           )
        )
       }
    
    const handleFormChange = (event) => {
        setReviewData(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if(userId && campingId) {
            postRequest()
        }

        if(responsAddReview && !loadingAddReview) {
            setReviewData(null)
            closeModal()
        }
    };
  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <RequestMessage />
        <Box component="form" noValidate onSubmit={handleSubmit}>
            <Rating 
                name="rating" 
                id="rating" 
                precision={0.5} 
                size="large" 
                onChange={handleFormChange} 
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                multiline
                rows={4}
                onChange={handleFormChange}
            />
          
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!reviewData?.rating || !reviewData?.description}
                sx={{ mt: 3, mb: 2 }}
            >
                Add review
            </Button>
        </Box>
    </Box>
  )
}