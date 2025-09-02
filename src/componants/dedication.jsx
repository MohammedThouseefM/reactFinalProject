import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button } from '@mui/material';

const Dedication = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'Keep Going',
      text: 'Small daily improvements lead to stunning results. Stay consistent and keep coding!',
    },
    {
      id: 2,
      title: 'Embrace Challenges',
      text: 'Debugging is where learning happens. Every bug fixed is a step forward.',
    },
    {
      id: 3,
      title: 'Build, Ship, Learn',
      text: 'Start small, ship often, iterate quickly. Progress beats perfection.',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');

  const addMessage = () => {
    if (!newTitle.trim() || !newText.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), title: newTitle.trim(), text: newText.trim() }
    ]);
    setNewTitle('');
    setNewText('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Dedications & Motivation
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {messages.map((m) => (
          <Grid item xs={12} sm={6} md={4} key={m.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {m.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {m.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Title"
          size="small"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          label="Message"
          size="small"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <Button variant="contained" onClick={addMessage} disabled={!newTitle.trim() || !newText.trim()}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Dedication;