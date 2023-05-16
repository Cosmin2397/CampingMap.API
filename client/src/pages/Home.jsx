import React from 'react'
import Container from '@mui/material/Container';
import { HeroSection } from '../components/home/HeroSection'
import { Testimonials } from '../components/home/Testimonials'
import { Faq } from '../components/home/Faq'

export const Home = () => {
  return (
    <Container maxWidth="lg">
      <HeroSection />
      <Testimonials />
      <Faq />
    </Container>
  )
}