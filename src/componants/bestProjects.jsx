import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  Rating,
  Button,
  IconButton,
  Tooltip,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  Star as StarIcon,
  Visibility as ViewIcon,
  Code as CodeIcon,
  Language as WebIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingIcon,
  EmojiEvents as AwardIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon
} from '@mui/icons-material';

const BestProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const topProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      student: "Ahmed Hassan",
      avatar: "AH",
      description: "A full-stack e-commerce platform built with React.js, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe API"],
      rating: 4.9,
      votes: 127,
      views: 2340,
      likes: 89,
      comments: 23,
      completionDate: "2024-01-15",
      difficulty: "Advanced",
      category: "Full-Stack",
      githubUrl: "https://github.com/ahmed-hassan/ecommerce-platform",
      liveUrl: "https://ecommerce-platform-demo.vercel.app",
      features: [
        "User Authentication & Authorization",
        "Product Management System",
        "Shopping Cart & Checkout",
        "Payment Gateway Integration",
        "Admin Dashboard",
        "Responsive Design"
      ],
      challenges: "Implementing real-time inventory management and secure payment processing",
      solutions: "Used WebSocket for real-time updates and integrated Stripe for secure payments",
      image: "🛒"
    },
    {
      id: 2,
      title: "Task Management App",
      student: "Fatima Ali",
      avatar: "FA",
      description: "A collaborative task management application with real-time updates, team collaboration, and project tracking capabilities. Built with modern React patterns and Firebase.",
      technologies: ["React.js", "Firebase", "Material-UI", "Redux Toolkit", "React Router"],
      rating: 4.8,
      votes: 98,
      views: 1890,
      likes: 76,
      comments: 18,
      completionDate: "2024-01-10",
      difficulty: "Intermediate",
      category: "Frontend",
      githubUrl: "https://github.com/fatima-ali/task-manager",
      liveUrl: "https://task-manager-app.netlify.app",
      features: [
        "Real-time Task Updates",
        "Team Collaboration",
        "Project Categories",
        "Progress Tracking",
        "Deadline Management",
        "Mobile Responsive"
      ],
      challenges: "Implementing real-time collaboration and state management across multiple users",
      solutions: "Used Firebase Realtime Database and Redux Toolkit for efficient state management",
      image: "📋"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      student: "Omar Khalil",
      avatar: "OK",
      description: "A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics. Integrates multiple weather APIs for comprehensive data.",
      technologies: ["React.js", "OpenWeather API", "Chart.js", "Leaflet Maps", "CSS3"],
      rating: 4.7,
      votes: 85,
      views: 1560,
      likes: 64,
      comments: 15,
      completionDate: "2024-01-05",
      difficulty: "Intermediate",
      category: "Frontend",
      githubUrl: "https://github.com/omar-khalil/weather-dashboard",
      liveUrl: "https://weather-dashboard-react.vercel.app",
      features: [
        "Location-based Weather",
        "Interactive Maps",
        "Weather Charts",
        "5-Day Forecast",
        "Weather Alerts",
        "Dark/Light Theme"
      ],
      challenges: "Handling multiple API calls and creating responsive weather visualizations",
      solutions: "Implemented efficient API caching and used Chart.js for beautiful data visualization",
      image: "🌤️"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Advanced': return 'error';
      case 'Intermediate': return 'warning';
      case 'Beginner': return 'success';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Full-Stack': return 'primary';
      case 'Frontend': return 'secondary';
      case 'Backend': return 'info';
      default: return 'default';
    }
  };

  const ProjectCard = ({ project, isTop = false }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
      onClick={() => setSelectedProject(project)}
    >
      {isTop && (
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: 20,
            zIndex: 1,
            bgcolor: '#FFD700',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2
          }}
        >
          <AwardIcon sx={{ color: '#B8860B', fontSize: 24 }} />
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 50, height: 50, fontSize: '1.5rem' }}>
            {project.avatar}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {project.student}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
          {project.description}
        </Typography>

        <Box mb={2}>
          <Typography variant="body2" fontWeight="medium" mb={1}>
            Technologies Used
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {project.technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Rating value={project.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({project.votes})
            </Typography>
          </Box>
          <Chip
            label={project.difficulty}
            color={getDifficultyColor(project.difficulty)}
            size="small"
          />
          <Chip
            label={project.category}
            color={getCategoryColor(project.category)}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ViewIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {project.views}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <LikeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {project.likes}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <CommentIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {project.comments}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {new Date(project.completionDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<GitHubIcon />}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, '_blank');
            }}
            sx={{ flex: 1 }}
          >
            Code
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<LaunchIcon />}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.liveUrl, '_blank');
            }}
            sx={{ flex: 1 }}
          >
            Live Demo
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const ProjectDetail = ({ project }) => (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Project Details: {project.title}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Key Features
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {project.features.map((feature, index) => (
              <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                {feature}
              </Typography>
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Challenges & Solutions
          </Typography>
          <Box mb={2}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Challenge:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.challenges}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="success.main" gutterBottom>
              Solution:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.solutions}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Best 3 Projects This Month
      </Typography>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFD700', color: '#B8860B' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">3</Typography>
                  <Typography variant="body2">Top Projects</Typography>
                </Box>
                <AwardIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1976d2', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">4.8</Typography>
                  <Typography variant="body2">Avg Rating</Typography>
                </Box>
                <StarIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#2e7d32', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">5,790</Typography>
                  <Typography variant="body2">Total Views</Typography>
                </Box>
                <ViewIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ed6c02', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">229</Typography>
                  <Typography variant="body2">Total Likes</Typography>
                </Box>
                <LikeIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {topProjects.slice(0, 3).map((project, index) => (
          <Grid item xs={12} md={4} key={project.id}>
            <ProjectCard project={project} isTop={index === 0} />
          </Grid>
        ))}
      </Grid>

      {/* Project Details */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} />
      )}

      {/* Call to Action */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Inspired by these projects?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Start building your own amazing project and join the ranks of top performers!
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<CodeIcon />}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' }
          }}
        >
          Start Your Project
        </Button>
      </Box>
    </Box>
  );
};

export default BestProjects;
