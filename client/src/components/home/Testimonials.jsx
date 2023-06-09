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
        review: 'Best camping location'

    },
    {
        id: 2,
        image: '',
        name: 'Alex CH',
        rating: 4,
        review: 'Nice camping'

    },
    {
        id: 3,
        image: '',
        name: 'Agatha Willich',
        rating: 5,
        review: 'Majestic vistas that leave you in awe.'

    },
    {
        id: 3,
        image: '',
        name: 'Mark Adwers',
        rating: 5,
        review: 'The perfect blend of luxury and nature\'s charm.'

    },
    {
        id: 3,
        image: '',
        name: 'Miruna Popa',
        rating: 1,
        review: 'Worst camping.'

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
