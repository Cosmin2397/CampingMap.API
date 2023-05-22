import React from 'react'
import Container from '@mui/material/Container';
import { HeroSection } from '../components/home/HeroSection'
import { Testimonials } from '../components/home/Testimonials'
import { Faq } from '../components/home/Faq'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/Carousel.scss"

export const Home = () => {
  return (
    <>      
      <HeroSection />
      <Container maxWidth="lg">
        <Testimonials />
        <Faq />
      </Container>
    </>
  )
}