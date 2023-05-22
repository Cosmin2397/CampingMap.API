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
        title: 'I am an accordion',
        content: ' Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
    },
    {
        id: 2,
        title: 'I am an accordion',
        content: ' Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
    },
    {
        id: 3,
        title: 'I am an accordion',
        content: ' Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
    },
    {
        id: 4,
        title: 'I am an accordion',
        content: ' Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
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