import { Typography, Button } from '@mui/material';

export const HeroSection = () => {
  return (
    <section>
      <Typography variant="h1" sx={{ color: 'primary.main' }}>
        Find Your Perfect Campsite
      </Typography>
      <Typography variant="h4" sx={{ color: 'text.secondary', my: 4 }}>
        Plan your next adventure with ease
      </Typography>
      <Button variant="contained" sx={{ backgroundColor: 'primary.main', color: 'white' }}>
        Get Started
      </Button>
    </section>
  );
}
