import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Avatar,
  Button,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import studentData from '../data/studentData.json';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Add attendance field to existing students if not present
    const studentsWithAttendance = studentData.map(student => ({
      ...student,
      Attendance: student.Attendance !== undefined ? student.Attendance : false
    }));
    setStudents(studentsWithAttendance);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formatDay = (d) => d.toLocaleDateString(undefined, { weekday: 'long' });
  const formatTime = (d) => d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Calculate attendance statistics
  const getAttendanceStats = () => {
    const onsiteFullTime = students.filter(s => 
      s['Training mode'] === 'Onsite' && s.Session === 'Full Time'
    );
    const onsitePartTimeMerith = students.filter(s => 
      s['Training mode'] === 'Onsite' && s.Session === 'Part Time' && s.Address && s.Address.includes('MERITH')
    );
    const onsitePartTimeOther = students.filter(s => 
      s['Training mode'] === 'Onsite' && s.Session === 'Part Time' && (!s.Address || !s.Address.includes('MERITH'))
    );
    const remote = students.filter(s => s['Training mode'] === 'Remote');
    
    const total = students.length;
    const totalPresent = students.filter(s => s.Attendance).length;
    const activeOnsite = onsiteFullTime.length + onsitePartTimeMerith.length + onsitePartTimeOther.length;

    return {
      onsiteFullTime: {
        total: onsiteFullTime.length,
        present: onsiteFullTime.filter(s => s.Attendance).length
      },
      onsitePartTimeMerith: {
        total: onsitePartTimeMerith.length,
        present: onsitePartTimeMerith.filter(s => s.Attendance).length
      },
      onsitePartTimeOther: {
        total: onsitePartTimeOther.length,
        present: onsitePartTimeOther.filter(s => s.Attendance).length
      },
      remote: {
        total: remote.length,
        present: remote.filter(s => s.Attendance).length
      },
      total: {
        total: total,
        present: totalPresent
      },
      activeOnsite: activeOnsite
    };
  };

  const stats = getAttendanceStats();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleToggleAttendance = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.ID === id
          ? { ...student, Attendance: !student.Attendance }
          : student
      )
    );
  };

  const StatCard = ({ title, value, icon, color, subtitle, backgroundColor = '#1976d2' }) => (
    <Card sx={{ height: '100%', backgroundColor, color: 'white' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight="bold">{value}</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>{title}</Typography>
            {subtitle && <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>{subtitle}</Typography>}
          </Box>
          <Box sx={{ opacity: 0.8 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  const getAttendanceColor = (attendance) => {
    return attendance ? 'success' : 'error';
  };

  const getTrainingModeColor = (mode) => {
    switch (mode) {
      case 'Onsite': return 'primary';
      case 'Remote': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Date/Day/Time */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <Typography variant="h5" fontWeight="bold">{formatDate(now)}</Typography>
        <Typography variant="h6" color="text.secondary">{formatDay(now)}</Typography>
        <Typography variant="h6" sx={{ ml: 'auto' }}>{formatTime(now)}</Typography>
      </Box>

      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Student Dashboard
      </Typography>

      {/* Attendance Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="ONSITE (Full time)" 
            value={stats.onsiteFullTime.total} 
            icon={<PeopleIcon sx={{ fontSize: 40 }} />} 
            color="#1976d2" 
            subtitle={`${stats.onsiteFullTime.present} present`} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="ONSITE (Part time) (MERITH-CLG)" 
            value={stats.onsitePartTimeMerith.total} 
            icon={<SchoolIcon sx={{ fontSize: 40 }} />} 
            color="#2e7d32" 
            subtitle={`${stats.onsitePartTimeMerith.present} present`} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="ONSITE (Part time) (OTHER-CLG)" 
            value={stats.onsitePartTimeOther.total} 
            icon={<LocationIcon sx={{ fontSize: 40 }} />} 
            color="#ed6c02" 
            subtitle={`${stats.onsitePartTimeOther.present} present`} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Remote" 
            value={stats.remote.total} 
            icon={<ScheduleIcon sx={{ fontSize: 40 }} />} 
            color="#9c27b0" 
            subtitle={`${stats.remote.present} present`} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="TOTAL" 
            value={stats.total.total} 
            icon={<PeopleIcon sx={{ fontSize: 40 }} />} 
            color="#1565c0" 
            subtitle={`${stats.total.present} present`} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="ACTIVE (On site)" 
            value={stats.activeOnsite} 
            icon={<LocationIcon sx={{ fontSize: 40 }} />} 
            color="#7b1fa2" 
            subtitle="Total onsite students" 
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Students Table */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Student List
      </Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 200 }}>Student</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>Technology</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>Training Mode</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 100 }}>Session</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>Attendance</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow hover key={student.ID}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: '#1976d2' }}>
                        {student.Name ? student.Name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A'}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">{student.Name}</Typography>
                        <Typography variant="body2" color="text.secondary">ID: {student.ID}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <SchoolIcon fontSize="small" color="action" />
                      <Typography variant="body2">{student.Tech}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={student['Training mode']} 
                      color={getTrainingModeColor(student['Training mode'])} 
                      size="small" 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={student.Session} 
                      color="default" 
                      size="small" 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={student.Attendance ? "Present" : "Absent"}
                      color={getAttendanceColor(student.Attendance)}
                      size="small"
                      icon={student.Attendance ? <PresentIcon fontSize="small" /> : <AbsentIcon fontSize="small" />}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={student.Attendance ? 'error' : 'success'}
                      size="small"
                      onClick={() => handleToggleAttendance(student.ID)}
                    >
                      {student.Attendance ? 'Mark Absent' : 'Mark Present'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

export default Dashboard;
