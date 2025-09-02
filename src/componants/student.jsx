import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import studentData from '../data/studentData.json';

// Define table columns based on student data structure
const columns = [
  { id: 'ID', label: 'Student ID', minWidth: 100 },
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'Gender', label: 'Gender', minWidth: 100 },
  { id: 'Tech', label: 'Technology', minWidth: 120 },
  { id: 'Training Status', label: 'Status', minWidth: 120 },
  { id: 'Training mode', label: 'Mode', minWidth: 100 },
  { id: 'Session', label: 'Session', minWidth: 100 },
  { id: 'Phone #', label: 'Phone', minWidth: 120 },
  { id: 'Email ID', label: 'Email', minWidth: 200 },
  { id: 'Attendance', label: 'Attendance', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function StudentTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    ID: '',
    Name: '',
    Gender: '',
    Tech: 'Web Dev',
    'Training Status': 'In Progress',
    'Training mode': 'Onsite',
    Session: 'Part Time',
    'Phone #': '',
    'Email ID': '',
    Attendance: false
  });

  useEffect(() => {
    // Add attendance field to existing students if not present
    const studentsWithAttendance = studentData.map(student => ({
      ...student,
      Attendance: student.Attendance !== undefined ? student.Attendance : false
    }));
    setStudents(studentsWithAttendance);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditInputChange = (field, value) => {
    setEditingStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAttendanceChange = (studentId, newAttendance) => {
    setStudents(prev => 
      prev.map(student => 
        student.ID === studentId 
          ? { ...student, Attendance: newAttendance }
          : student
      )
    );
  };

  const handleAddStudent = () => {
    if (newStudent.Name && newStudent['Email ID']) {
      // Generate new ID if not provided
      if (!newStudent.ID) {
        const lastId = students.length > 0 ? students[students.length - 1].ID : 'AST0000';
        const lastNumber = parseInt(lastId.replace('AST', ''));
        newStudent.ID = `AST${String(lastNumber + 1).padStart(4, '0')}`;
      }

      // Add new student to the list
      setStudents(prev => [...prev, newStudent]);
      
      // Reset form
      setNewStudent({
        ID: '',
        Name: '',
        Gender: '',
        Tech: 'Web Dev',
        'Training Status': 'In Progress',
        'Training mode': 'Onsite',
        Session: 'Part Time',
        'Phone #': '',
        'Email ID': '',
        Attendance: false
      });
      
      setShowAddForm(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent({ ...student });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleUpdateStudent = () => {
    if (editingStudent && editingStudent.Name && editingStudent['Email ID']) {
      setStudents(prev => 
        prev.map(student => 
          student.ID === editingStudent.ID ? editingStudent : student
        )
      );
      
      setShowEditForm(false);
      setEditingStudent(null);
    }
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.ID !== studentId));
    }
  };

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

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header with Add Student Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Student Management System
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false);
          }}
          sx={{ minWidth: 150 }}
        >
          {showAddForm ? 'Hide Form' : 'Add New Student'}
        </Button>
      </Box>

      {/* Attendance Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">ONSITE (Full time)</Typography>
          <Typography variant="h4">{stats.onsiteFullTime.total}</Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.onsiteFullTime.present} present
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">ONSITE (Part time) (MERITH-CLG)</Typography>
          <Typography variant="h4">{stats.onsitePartTimeMerith.total}</Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.onsitePartTimeMerith.present} present
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">ONSITE (Part time) (OTHER-CLG)</Typography>
          <Typography variant="h4">{stats.onsitePartTimeOther.total}</Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.onsitePartTimeOther.present} present
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">Remote</Typography>
          <Typography variant="h4">{stats.remote.total}</Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.remote.present} present
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#30404dff' }}>
          <Typography variant="h6" color="primary">TOTAL</Typography>
          <Typography variant="h4">{stats.total.total}</Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.total.present} present
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#4b3750ff' }}>
          <Typography variant="h6" color="primary">ACTIVE (On site)</Typography>
          <Typography variant="h4">{stats.activeOnsite}</Typography>
        </Paper>
      </Box>

      {/* Student Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={student.ID || index}>
                      {columns.slice(0, -2).map((column) => {
                        const value = student[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value || '-'}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={student.Attendance || false}
                              onChange={(e) => handleAttendanceChange(student.ID, e.target.checked)}
                              color="primary"
                            />
                          }
                          label={student.Attendance ? "Present" : "Absent"}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditStudent(student)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <Button
                          color="error"
                          size="small"
                          onClick={() => handleDeleteStudent(student.ID)}
                          sx={{ ml: 1 }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add Student Form */}
      {showAddForm && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Student
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
            <TextField
              label="Student ID (Optional)"
              value={newStudent.ID}
              onChange={(e) => handleInputChange('ID', e.target.value)}
              placeholder="Will be auto-generated if empty"
            />
            <TextField
              label="Full Name"
              required
              value={newStudent.Name}
              onChange={(e) => handleInputChange('Name', e.target.value)}
            />
            <TextField
              label="Gender"
              value={newStudent.Gender}
              onChange={(e) => handleInputChange('Gender', e.target.value)}
              placeholder="Male/Female/Other"
            />
            <TextField
              label="Technology"
              value={newStudent.Tech}
              onChange={(e) => handleInputChange('Tech', e.target.value)}
            />
            <TextField
              label="Training Status"
              value={newStudent['Training Status']}
              onChange={(e) => handleInputChange('Training Status', e.target.value)}
            />
            <TextField
              label="Training Mode"
              value={newStudent['Training mode']}
              onChange={(e) => handleInputChange('Training mode', e.target.value)}
            />
            <TextField
              label="Session"
              value={newStudent.Session}
              onChange={(e) => handleInputChange('Session', e.target.value)}
            />
            <TextField
              label="Phone Number"
              value={newStudent['Phone #']}
              onChange={(e) => handleInputChange('Phone #', e.target.value)}
            />
            <TextField
              label="Email"
              required
              type="email"
              value={newStudent['Email ID']}
              onChange={(e) => handleInputChange('Email ID', e.target.value)}
              sx={{ gridColumn: '1 / -1' }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              onClick={handleAddStudent} 
              variant="contained"
              disabled={!newStudent.Name || !newStudent['Email ID']}
            >
              Add Student
            </Button>
            <Button onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      {/* Edit Student Form */}
      {showEditForm && editingStudent && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Student: {editingStudent.Name}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
            <TextField
              label="Student ID"
              value={editingStudent.ID}
              disabled
              sx={{ backgroundColor: '#f5f5f5' }}
            />
            <TextField
              label="Full Name"
              required
              value={editingStudent.Name}
              onChange={(e) => handleEditInputChange('Name', e.target.value)}
            />
            <TextField
              label="Gender"
              value={editingStudent.Gender}
              onChange={(e) => handleEditInputChange('Gender', e.target.value)}
              placeholder="Male/Female/Other"
            />
            <TextField
              label="Technology"
              value={editingStudent.Tech}
              onChange={(e) => handleEditInputChange('Tech', e.target.value)}
            />
            <TextField
              label="Training Status"
              value={editingStudent['Training Status']}
              onChange={(e) => handleEditInputChange('Training Status', e.target.value)}
            />
            <TextField
              label="Training Mode"
              value={editingStudent['Training mode']}
              onChange={(e) => handleEditInputChange('Training mode', e.target.value)}
            />
            <TextField
              label="Session"
              value={editingStudent.Session}
              onChange={(e) => handleEditInputChange('Session', e.target.value)}
            />
            <TextField
              label="Phone Number"
              value={editingStudent['Phone #']}
              onChange={(e) => handleEditInputChange('Phone #', e.target.value)}
            />
            <TextField
              label="Email"
              required
              type="email"
              value={editingStudent['Email ID']}
              onChange={(e) => handleEditInputChange('Email ID', e.target.value)}
              sx={{ gridColumn: '1 / -1' }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              onClick={handleUpdateStudent} 
              variant="contained"
              color="primary"
              disabled={!editingStudent.Name || !editingStudent['Email ID']}
            >
              Update Student
            </Button>
            <Button onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
