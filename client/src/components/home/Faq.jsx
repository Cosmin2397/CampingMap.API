/// <reference path="../facilitiesselect.jsx" />
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';

const QUESTIONS = [
    {
        id: 1,
        title: '1. What are some popular camping destinations in Romania?',
        content: ' Romania offers a plethora of beautiful camping destinations, including the stunning Carpathian Mountains, the scenic Danube Delta, the picturesque Transylvania region, the breathtaking Black Sea coast, and the charming Maramureș County.'
    },
    {
        id: 2,
        title: '2. What amenities can I expect at Romanian campgrounds?',
        content: ' Most campgrounds in Romania provide basic amenities such as designated camping pitches, access to clean restrooms and showers, picnic areas, and some may also offer facilities like electricity hookups, laundry services, Wi-Fi, and on-site shops.'
    },
    {
        id: 3,
        title: '3. Are campfires allowed at Romanian campsites?',
        content: ' Campfire regulations may vary between campgrounds. While some campsites permit campfires in designated fire pits, others may have restrictions due to safety or environmental concerns. It\'s advisable to check with the specific campground before planning a campfire.'
    },
    {
        id: 4,
        title: '4. Are there any restrictions on bringing pets to Romanian campgrounds?',
        content: ' Many campgrounds in Romania are pet-friendly, but it\'s essential to inquire about their specific pet policies, including any size or breed restrictions.Additionally, some protected natural areas may have limitations on pets to preserve the local ecosystem.'
    }
]

export const Faq = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
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
            Common questions
        </Typography>
        <Container maxWidth="sm" sx={{ pb: 10 }}>
            { QUESTIONS?.map(question => (
                 <Accordion expanded={expanded === question?.id } onChange={handleChange(question?.id)} key={question?.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${question?.id}bh-content`}
                    id={`${question?.id}bh-content`}
                    >
                    <Typography sx={{ color: 'text.secondary' }}>{ question?.title }</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        { question?.content }
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            )) }
      </Container>
    </div>
  );
}