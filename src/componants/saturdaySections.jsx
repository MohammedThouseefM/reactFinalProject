import * as React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import ForumIcon from '@mui/icons-material/Forum';
import MovieIcon from '@mui/icons-material/Movie';
import BugReportIcon from '@mui/icons-material/BugReport';

const SaturdaySections = () => {
  const sections = [
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Weekly quiz to assess understanding of current topics. Timed, multiple-choice format.',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      action: 'Start Quiz',
    },
    {
      id: 'debates',
      title: 'Debates',
      description: 'Structured debates on tech trends and best practices to improve critical thinking.',
      icon: <ForumIcon sx={{ fontSize: 40 }} />,
      action: 'Join Debate',
    },
    {
      id: 'tech-videos',
      title: 'Tech Videos',
      description: 'Curated short videos on key topics like React hooks, performance, and architecture.',
      icon: <MovieIcon sx={{ fontSize: 40 }} />,
      action: 'Watch Now',
    },
    {
      id: 'debugging',
      title: 'Debugging',
      description: 'Hands-on debugging sessions focusing on real issues, tools, and strategies.',
      icon: <BugReportIcon sx={{ fontSize: 40 }} />,
      action: 'Open Lab',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Saturday Sections
      </Typography>
      <Grid container spacing={3}>
        {sections.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  {s.icon}
                  <Typography variant="h6" fontWeight="bold">{s.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {s.description}
                </Typography>
                <Button variant="contained" fullWidth>
                  {s.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SaturdaySections;