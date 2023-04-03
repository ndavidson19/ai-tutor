// tutor-client/pages/home.tsx

import { useRouter } from 'next/router';
import { Container, Typography, Box, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { styled } from '@mui/system';

const subjects = [
  { title: 'Math', image: '/math.jpg', color: '#fdd835' },
  { title: 'Physics', image: '/physics.jpg', color: '#4fc3f7' },
  { title: 'Chemistry', image: '/chemistry.jpg', color: '#ab47bc' },
  { title: 'Biology', image: '/biology.jpg', color: '#66bb6a' },
  { title: 'Computer Science', image: '/computer-science.jpg', color: '#78909c' },
];

const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  cursor: 'pointer',
  backgroundColor: bgcolor,
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
  transition: 'all .2s ease-in-out',
}));

const StyledCardContent = styled(CardContent)({
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = (subject: string) => {
    router.push({
      pathname: '/ask',
      query: { subject },
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, pt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Select a Subject
        </Typography>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item key={subject.title} xs={12} sm={6} md={4}>
              <StyledCard bgcolor={subject.color} onClick={() => handleClick(subject.title)}>
                <CardActionArea>
                  <StyledCardContent>
                    <Typography variant="h5" component="h2">
                      {subject.title}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <img src={subject.image} alt={subject.title} width="100" height="100" />
                    </Box>
                  </StyledCardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
