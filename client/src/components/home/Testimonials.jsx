import { useState } from 'react'
import { Avatar, Rating, Typography } from '@mui/material';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../style/Carousel.scss"

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
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
      }

  return (
    <section>
      <Typography variant="h2" sx={{ color: 'primary.main', mb: 4 }}>
        What Our Customers Are Saying
      </Typography>
      <div>
       <Slider {...settings}>
        {
            TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                    <Avatar src={testimonial.image} alt={testimonial.name} sx={{ mr: 2 }} />
                    <div>
                    <Typography variant="h5">{testimonial.name}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {testimonial.review}
                    </Typography>
                    <Rating value={testimonial.rating} readOnly />
                    </div>
                </div>
            ))
        }
       </Slider>
      </div>
    </section>
  );
}
