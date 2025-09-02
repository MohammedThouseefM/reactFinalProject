import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button
} from '@mui/material';
import {
  Code as CodeIcon,
  Web as WebIcon,
  Storage as DatabaseIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  Speed as PerformanceIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const Technologies = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  // Editable technologies summary data
  const [techRows, setTechRows] = useState([
    { id: 'html-css', tech: 'HTML, CSS', fullTime: 2, partTime: 12 },
    { id: 'js', tech: 'JavaScript', fullTime: 1, partTime: 10 },
    { id: 'bootstrap', tech: 'Bootstrap', fullTime: 0, partTime: 4 },
    { id: 'wordpress', tech: 'WordPress', fullTime: 0, partTime: 3 },
    { id: 'react', tech: 'React.js', fullTime: 0, partTime: 10 },
    { id: 'python', tech: 'Python', fullTime: 0, partTime: 0 },
    { id: 'django', tech: 'Django', fullTime: 0, partTime: 0 },
  ]);
  const [editRowId, setEditRowId] = useState(null);
  const [draftRow, setDraftRow] = useState({ id: '', tech: '', fullTime: 0, partTime: 0 });

  const [newTech, setNewTech] = useState({ tech: '', fullTime: '', partTime: '' });

  const startEdit = (row) => {
    setEditRowId(row.id);
    setDraftRow({ ...row });
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setDraftRow({ id: '', tech: '', fullTime: 0, partTime: 0 });
  };

  const saveEdit = () => {
    setTechRows(prev => prev.map(r => r.id === draftRow.id ? {
      ...r,
      tech: draftRow.tech.trim(),
      fullTime: Number.isFinite(Number(draftRow.fullTime)) ? Number(draftRow.fullTime) : 0,
      partTime: Number.isFinite(Number(draftRow.partTime)) ? Number(draftRow.partTime) : 0,
    } : r));
    cancelEdit();
  };

  const handleDraftChange = (field, value) => {
    setDraftRow(prev => ({ ...prev, [field]: field === 'tech' ? value : value.replace(/[^0-9]/g, '') }));
  };

  const handleNewTechChange = (field, value) => {
    setNewTech(prev => ({ ...prev, [field]: field === 'tech' ? value : value.replace(/[^0-9]/g, '') }));
  };

  const addNewTech = () => {
    if (!newTech.tech.trim()) return;
    const id = newTech.tech.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setTechRows(prev => [
      ...prev,
      {
        id,
        tech: newTech.tech.trim(),
        fullTime: Number(newTech.fullTime || 0),
        partTime: Number(newTech.partTime || 0),
      },
    ]);
    setNewTech({ tech: '', fullTime: '', partTime: '' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 4 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Tech</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Full time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Part time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    placeholder="Technology name"
                    size="small"
                    value={newTech.tech}
                    onChange={(e) => handleNewTechChange('tech', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    placeholder="0"
                    size="small"
                    value={newTech.fullTime}
                    onChange={(e) => handleNewTechChange('fullTime', e.target.value)}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    placeholder="0"
                    size="small"
                    value={newTech.partTime}
                    onChange={(e) => handleNewTechChange('partTime', e.target.value)}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={addNewTech} disabled={!newTech.tech.trim()}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>

              {techRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={draftRow.tech}
                        onChange={(e) => handleDraftChange('tech', e.target.value)}
                        size="small"
                      />
                    ) : (
                      row.tech
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={String(draftRow.fullTime)}
                        onChange={(e) => handleDraftChange('fullTime', e.target.value)}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      row.fullTime === 0 ? '-' : row.fullTime
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={String(draftRow.partTime)}
                        onChange={(e) => handleDraftChange('partTime', e.target.value)}
                        size="small"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    ) : (
                      row.partTime === 0 ? '-' : row.partTime
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="primary" size="small" onClick={saveEdit}>
                          <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" size="small" onClick={cancelEdit}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <IconButton color="primary" size="small" onClick={() => startEdit(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Technologies;
