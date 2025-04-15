// components/AddNewDuaForm.tsx
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface AddNewDuaFormProps {
  onAdd: (newDua: any) => void;
}

export default function AddPreUmrah({ onAdd }: AddNewDuaFormProps) {
  const [newDua, setNewDua] = useState({
    title: '',
    Arabic: '',
    transliteration: '',
    translation: '',
    description: '',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDua({ ...newDua, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(newDua);
    setNewDua({
      title: '',
      Arabic: '',
      transliteration: '',
      translation: '',
      description: '',
      additionalInfo: '',
    });
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <TextField
        fullWidth
        name="title"
        label="Title"
        value={newDua.title}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="Arabic"
        label="Arabic"
        value={newDua.Arabic}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="transliteration"
        label="Transliteration"
        value={newDua.transliteration}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="translation"
        label="Translation"
        value={newDua.translation}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="description"
        label="Description"
        value={newDua.description}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="additionalInfo"
        label="Additional Info"
        value={newDua.additionalInfo}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4} // You can adjust this to set initial height
        maxRows={10} // Optional: allows expansion up to this many rows
        variant="outlined"
      />
      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2, background: 'rgb(183, 105, 53)' }}
      >
        Add Dua
      </Button>
    </Box>
  );
}
