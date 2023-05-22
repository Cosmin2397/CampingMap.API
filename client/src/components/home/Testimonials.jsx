import { Avatar, Rating, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Slider from 'react-slick';

const TESTIMONIALS = [
    {
        id: 1,
        image: '',
        name: 'Mircea Balan',
        rating: 5,
        review: 'Best app for finding a camping location'

    },
    {
        id: 2,
        image: '',
        name: 'Mircea Balan',
        rating: 5,
        review: 'Best app for finding a camping location'

    },
    {
        id: 3,
        image: '',
        name: 'Mircea Balan',
        rating: 5,
        review: 'Best app for finding a camping location'

    },
    {
        id: 3,
        image: '',
        name: 'Mircea Balan',
        rating: 5,
        review: 'Best app for finding a camping location'

    },
    {
        id: 3,
        image: '',
        name: 'Mircea Balan',
        rating: 5,
        review: 'Best app for finding a camping location'

    }
]

export const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
      }

  return (
    <section>
      <Typography 
        variant="h3" 
        sx={{ 
            color: 'primary.main', 
            py: 10, 
            textAlign: 'center',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontSize: '30px' 
        }}
      >
        What Our Customers Are Saying
      </Typography>
      <div>
       <Slider {...settings}>
        {
            TESTIMONIALS.map((testimonial) => (
               <Box sx={{ px: 2 }} key={testimonial?.id}>
                 <Paper key={testimonial.id} sx={{ 'textAlign': 'center', py: 3 }}>
                    <Avatar src={testimonial.image} alt={testimonial.name} sx={{ mx: 'auto' }} />
                    <div>
                    <Typography variant="h5">{testimonial.name}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {testimonial.review}
                    </Typography>
                    <Rating value={testimonial.rating} readOnly />
                    </div>
                </Paper>
               </Box>
            ))
        }
       </Slider>
      </div>
    </section>
  );
}
