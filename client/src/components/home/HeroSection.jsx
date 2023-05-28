import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Link as ReactRouterLink } from 'react-router-dom';
import Slider from 'react-slick';

const SLIDES = [
  {
    id: 1,
    title: 'Find Your Perfect Campsite',
    image: 'https://source.unsplash.com/N5L9DDPk5xo',
    buttonText: 'Find campings',
    buttonUrl: '/campings'
  },
  {
    id: 2,
    title: 'Plan your next adventure with ease',
    image: 'https://source.unsplash.com/TcgASSD5G04',
    buttonText: 'Login',
    buttonUrl: '/campings'
  },
]

export const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    
  }
  return (
    <section>
      <Slider {...settings} className='hero-slider'>
        { SLIDES.map(slide => (
          <div key={slide?.id}>
            <Grid container sx={{ height: '70vh' }}>
              <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                  backgroundImage: `url(${slide?.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  }}
              />
              <Grid item xs={12} sm={8} md={5} component={Paper} className='slider-content'>
                <Typography 
                  variant="h4"
                  sx={{ 
                    color: 'primary.main',  
                    textAlign: 'center',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontSize: '28px' 
                  }}
                >
                  {slide?.title}
                </Typography>
                <Link 
                  to={slide?.buttonUrl}   
                  component={ReactRouterLink}
                >
                  <Button variant="contained" size='large' sx={{ backgroundColor: 'primary.main', color: 'white', mt: 4 }}>
                    { slide?.buttonText }
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        )) }
      </Slider>
    </section>
  );
}
