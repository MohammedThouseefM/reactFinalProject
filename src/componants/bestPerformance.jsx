import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Rating,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  WorkspacePremium as CertificateIcon,
  Leaderboard as LeaderboardIcon,
  Person as PersonIcon,
  Code as CodeIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  FilterList as FilterIcon,
  Sort as SortIcon
} from '@mui/icons-material';

// Mock data for top performing students
const topStudents = [
  {
    id: 1,
    name: "Ahmed Hassan",
    avatar: "AH",
    overallScore: 97,
    attendanceRate: 100,
    projectsCompleted: 15,
    assignmentsScore: 98,
    quizAverage: 95,
    strengths: ["React", "Node.js", "MongoDB"],
    improvement: "GraphQL",
    badges: ["Top Performer", "Perfect Attendance", "Code Master"],
    feedback: "Exceptional understanding of full-stack development concepts. Consistently delivers high-quality projects ahead of schedule.",
    recentProject: "E-Commerce Platform",
    projectScore: 99
  },
  {
    id: 2,
    name: "Fatima Ali",
    avatar: "FA",
    overallScore: 95,
    attendanceRate: 98,
    projectsCompleted: 14,
    assignmentsScore: 96,
    quizAverage: 94,
    strengths: ["React", "UI/UX Design", "Firebase"],
    improvement: "TypeScript",
    badges: ["UI Master", "Consistent Performer", "Team Player"],
    feedback: "Outstanding frontend development skills with a keen eye for design. Creates intuitive and visually appealing interfaces.",
    recentProject: "Task Management App",
    projectScore: 97
  },
  {
    id: 3,
    name: "Omar Khalil",
    avatar: "OK",
    overallScore: 93,
    attendanceRate: 96,
    projectsCompleted: 13,
    assignmentsScore: 94,
    quizAverage: 92,
    strengths: ["React", "Data Visualization", "API Integration"],
    improvement: "Testing",
    badges: ["API Expert", "Data Wizard", "Fast Learner"],
    feedback: "Excellent at working with APIs and creating meaningful data visualizations. Shows great attention to detail in implementation.",
    recentProject: "Weather Dashboard",
    projectScore: 95
  },
  {
    id: 4,
    name: "Layla Mohamed",
    avatar: "LM",
    overallScore: 91,
    attendanceRate: 95,
    projectsCompleted: 14,
    assignmentsScore: 92,
    quizAverage: 90,
    strengths: ["React", "State Management", "CSS"],
    improvement: "Backend Integration",
    badges: ["CSS Master", "UI Innovator", "Dedicated Learner"],
    feedback: "Strong frontend skills with exceptional CSS and state management expertise. Creates elegant and responsive designs.",
    recentProject: "Social Media Dashboard",
    projectScore: 93
  },
  {
    id: 5,
    name: "Youssef Ibrahim",
    avatar: "YI",
    overallScore: 90,
    attendanceRate: 94,
    projectsCompleted: 12,
    assignmentsScore: 91,
    quizAverage: 89,
    strengths: ["React", "JavaScript", "Problem Solving"],
    improvement: "Advanced React Patterns",
    badges: ["Problem Solver", "JavaScript Ninja", "Quick Thinker"],
    feedback: "Excellent problem-solving skills and strong JavaScript fundamentals. Approaches challenges with creative solutions.",
    recentProject: "Budget Tracker App",
    projectScore: 92
  }
];

// Performance metrics data for charts
const performanceMetrics = {
  attendance: {
    average: 96.6,
    trend: '+2.3%',
    lastMonth: 94.3
  },
  assignments: {
    average: 94.2,
    trend: '+1.8%',
    lastMonth: 92.4
  },
  projects: {
    average: 95.2,
    trend: '+3.1%',
    lastMonth: 92.1
  },
  quizzes: {
    average: 92.0,
    trend: '+2.5%',
    lastMonth: 89.5
  }
};

// Skills distribution data
const skillsDistribution = [
  { skill: 'React.js', count: 42, percentage: 84 },
  { skill: 'JavaScript', count: 48, percentage: 96 },
  { skill: 'HTML/CSS', count: 50, percentage: 100 },
  { skill: 'Node.js', count: 35, percentage: 70 },
  { skill: 'MongoDB', count: 30, percentage: 60 },
  { skill: 'Redux', count: 28, percentage: 56 },
  { skill: 'TypeScript', count: 22, percentage: 44 },
  { skill: 'GraphQL', count: 18, percentage: 36 },
];

const BestPerformance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const getScoreColor = (score) => {
    if (score >= 95) return 'success.main';
    if (score >= 90) return 'info.main';
    if (score >= 80) return 'warning.main';
    return 'error.main';
  };

  const getProgressColor = (score) => {
    if (score >= 95) return 'success';
    if (score >= 90) return 'info';
    if (score >= 80) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Top 3 Students (Performance)
      </Typography>

      {/* Performance Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1976d2', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{performanceMetrics.attendance.average}%</Typography>
                  <Typography variant="body2">Attendance Rate</Typography>
                  <Typography variant="caption" sx={{ color: 'lightgreen' }}>
                    {performanceMetrics.attendance.trend} from last month
                  </Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#2e7d32', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{performanceMetrics.assignments.average}%</Typography>
                  <Typography variant="body2">Assignment Score</Typography>
                  <Typography variant="caption" sx={{ color: 'lightgreen' }}>
                    {performanceMetrics.assignments.trend} from last month
                  </Typography>
                </Box>
                <AssignmentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ed6c02', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{performanceMetrics.projects.average}%</Typography>
                  <Typography variant="body2">Project Score</Typography>
                  <Typography variant="caption" sx={{ color: 'lightgreen' }}>
                    {performanceMetrics.projects.trend} from last month
                  </Typography>
                </Box>
                <CodeIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#9c27b0', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{performanceMetrics.quizzes.average}%</Typography>
                  <Typography variant="body2">Quiz Average</Typography>
                  <Typography variant="caption" sx={{ color: 'lightgreen' }}>
                    {performanceMetrics.quizzes.trend} from last month
                  </Typography>
                </Box>
                <LeaderboardIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Top Performers" icon={<TrophyIcon />} iconPosition="start" />
          <Tab label="Skills Distribution" icon={<TimelineIcon />} iconPosition="start" />
          <Tab label="Performance Trends" icon={<TrendingUpIcon />} iconPosition="start" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {/* Top Performers Tab */}
          {tabValue === 0 && (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">Top 5 Performing Students</Typography>
                <Box>
                  <Tooltip title="Filter">
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sort">
                    <IconButton>
                      <SortIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell align="center">Overall Score</TableCell>
                      <TableCell align="center">Attendance</TableCell>
                      <TableCell align="center">Projects</TableCell>
                      <TableCell align="center">Assignments</TableCell>
                      <TableCell align="center">Quizzes</TableCell>
                      <TableCell align="center">Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topStudents.slice(0, 3).map((student, index) => (
                      <TableRow 
                        key={student.id}
                        sx={{
                          '&:hover': { bgcolor: '#f9f9f9' },
                          bgcolor: index < 3 ? 'rgba(255, 215, 0, 0.05)' : 'inherit'
                        }}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {index === 0 ? (
                              <TrophyIcon sx={{ color: '#FFD700' }} />
                            ) : index === 1 ? (
                              <TrophyIcon sx={{ color: '#C0C0C0' }} />
                            ) : index === 2 ? (
                              <TrophyIcon sx={{ color: '#CD7F32' }} />
                            ) : (
                              index + 1
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ bgcolor: '#1976d2', width: 35, height: 35 }}>
                              {student.avatar}
                            </Avatar>
                            <Typography variant="body2" fontWeight="medium">
                              {student.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography 
                              variant="body2" 
                              fontWeight="bold" 
                              color={getScoreColor(student.overallScore)}
                            >
                              {student.overallScore}%
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={student.overallScore} 
                              color={getProgressColor(student.overallScore)}
                              sx={{ width: '80%', height: 4, borderRadius: 2 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">{student.attendanceRate}%</TableCell>
                        <TableCell align="center">{student.projectsCompleted}</TableCell>
                        <TableCell align="center">{student.assignmentsScore}%</TableCell>
                        <TableCell align="center">{student.quizAverage}%</TableCell>
                        <TableCell align="center">
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => handleStudentSelect(student)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Selected Student Details */}
              {selectedStudent && (
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: '#1976d2', 
                          width: 60, 
                          height: 60, 
                          fontSize: '1.5rem' 
                        }}
                      >
                        {selectedStudent.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight="bold">
                          {selectedStudent.name}
                        </Typography>
                        <Box display="flex" gap={1} mt={1}>
                          {selectedStudent.badges.map((badge, index) => (
                            <Chip 
                              key={index} 
                              label={badge} 
                              size="small" 
                              color={index === 0 ? 'primary' : 'default'}
                              icon={index === 0 ? <StarIcon /> : undefined}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight="bold" color={getScoreColor(selectedStudent.overallScore)}>
                        {selectedStudent.overallScore}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Overall Score
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">Attendance Rate</TableCell>
                              <TableCell align="right">{selectedStudent.attendanceRate}%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">Projects Completed</TableCell>
                              <TableCell align="right">{selectedStudent.projectsCompleted}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">Assignments Score</TableCell>
                              <TableCell align="right">{selectedStudent.assignmentsScore}%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">Quiz Average</TableCell>
                              <TableCell align="right">{selectedStudent.quizAverage}%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">Recent Project</TableCell>
                              <TableCell align="right">{selectedStudent.recentProject}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">Project Score</TableCell>
                              <TableCell align="right">{selectedStudent.projectScore}%</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Strengths & Areas for Improvement</Typography>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Key Strengths:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {selectedStudent.strengths.map((strength, index) => (
                            <Chip 
                              key={index} 
                              label={strength} 
                              size="small" 
                              color="success" 
                              variant="outlined"
                              icon={<CheckCircleIcon />}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Area for Improvement:
                        </Typography>
                        <Chip 
                          label={selectedStudent.improvement} 
                          size="small" 
                          color="warning" 
                          variant="outlined"
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Instructor Feedback:
                        </Typography>
                        <Typography variant="body2">
                          {selectedStudent.feedback}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </>
          )}

          {/* Skills Distribution Tab */}
          {tabValue === 1 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Skills Distribution Among Top Students</Typography>
              <Grid container spacing={3}>
                {skillsDistribution.map((skill, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>{skill.skill}</Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={skill.percentage} 
                            color={skill.percentage > 75 ? "success" : skill.percentage > 50 ? "info" : "warning"}
                            sx={{ height: 8, borderRadius: 2 }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          {skill.percentage}%
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {skill.count} students proficient
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box mt={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Top Skills by Performance Level</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Performance Level</TableCell>
                        <TableCell>Top Skills</TableCell>
                        <TableCell>Average Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Chip label="Advanced" color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            <Chip label="React.js" size="small" variant="outlined" />
                            <Chip label="Node.js" size="small" variant="outlined" />
                            <Chip label="MongoDB" size="small" variant="outlined" />
                          </Box>
                        </TableCell>
                        <TableCell>96%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Chip label="Intermediate" color="info" size="small" />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            <Chip label="JavaScript" size="small" variant="outlined" />
                            <Chip label="CSS" size="small" variant="outlined" />
                            <Chip label="Redux" size="small" variant="outlined" />
                          </Box>
                        </TableCell>
                        <TableCell>88%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Chip label="Beginner" color="warning" size="small" />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            <Chip label="TypeScript" size="small" variant="outlined" />
                            <Chip label="GraphQL" size="small" variant="outlined" />
                            <Chip label="Testing" size="small" variant="outlined" />
                          </Box>
                        </TableCell>
                        <TableCell>76%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}

          {/* Performance Trends Tab */}
          {tabValue === 2 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Monthly Performance Trends</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Attendance Rate Trend</Typography>
                    <Box height={200} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        [Chart visualization would appear here]
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="body2">
                        <strong>Key Insight:</strong> Attendance rates have improved by 2.3% over the last month, with the top 5 students maintaining perfect or near-perfect attendance.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Assignment Completion Trend</Typography>
                    <Box height={200} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        [Chart visualization would appear here]
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="body2">
                        <strong>Key Insight:</strong> Assignment scores have increased by 1.8% on average, with particularly strong improvement in React component assignments.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Project Quality Trend</Typography>
                    <Box height={200} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        [Chart visualization would appear here]
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="body2">
                        <strong>Key Insight:</strong> Project quality has shown the most significant improvement at 3.1%, reflecting better application of advanced concepts and best practices.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Quiz Performance Trend</Typography>
                    <Box height={200} display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="body2" color="text.secondary">
                        [Chart visualization would appear here]
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="body2">
                        <strong>Key Insight:</strong> Quiz scores have improved by 2.5%, with particularly strong results in JavaScript fundamentals and React hooks concepts.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Want to improve your performance?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Schedule a one-on-one session with an instructor to review your progress and create a personalized improvement plan.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<PersonIcon />}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' }
          }}
        >
          Schedule Session
        </Button>
      </Box>
    </Box>
  );
};

export default BestPerformance;