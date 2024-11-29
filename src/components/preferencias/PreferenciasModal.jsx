import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Container,
  Typography,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid2';
import { pink } from '@mui/material/colors';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../../css/prefModal.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import CardPref from "./CardPref";
import categorias from './CategoriasPref';

function PreferenciasModal() {
  const [open, setOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [foodPreference, setFoodPreference] = useState('');
  const [hasDisability, setHasDisability] = useState(false);
  const [genero, setGenero] = React.useState('');
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setGenero(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleFoodPreferenceChange = (event) => {
    setFoodPreference(event.target.value);
  };

  const handleDisabilityChange = (event) => {
    setHasDisability(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(form.entries());
    setFormData({
      ...formJson,
      selectedDate,
      hasDisability,
    });
    setOpen(false);
    setOpenSecondModal(true);
  };

  const handleSecondModalSubmit = () => {
    console.log('Form Data:', formData);
    // Aquí se puedes enviar la información al servidor o realizar cualquier otra acción 
    setOpenSecondModal(false);
  };

  const handleCloseSecondModal = () => {
    setOpenSecondModal(false);
  };

  //SEGUNDO MODAL
  const [subcategoriasSeleccionadas, setSubcategoriasSeleccionadas] = useState({});

  const handleCategoriaSelect = (categoria) => {
    setSubcategoriasSeleccionadas((prev) => {
      if (prev[categoria.id]) {
        const { [categoria.id]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [categoria.id]: categoria.subcategorias,
        };
      }
    });
  };

  const handleSubcategoriaSelect = (subcategoria) => {
    // Aquí puedes manejar la selección de subcategorías si es necesario
  };

  const handleReset = () => {
    setSubcategoriasSeleccionadas({});
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Abrir formulario de preferencias
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Preferencias</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para ofrecerte una mejor experiencia, necesitamos conocerte mejor. Por favor, completa la siguiente información.
          </DialogContentText>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2} className="pref-modal-textfield">
              <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                <TextField
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  label="Nombre(s)"
                  placeholder="Ej. Eduardo Raúl"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                <TextField
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  label="Apellido(s)"
                  fullWidth
                  variant="outlined"
                  placeholder="Ej. Arreola Medina"
                  required
                />
              </Grid>
              <Grid size={{ xs: 6, md: 6, lg: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                  <DatePicker
                    sx={{ width: '100%' }}
                    label="Fecha de nacimiento"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format='DD-MM-YYYY'
                    margin='dense'
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        name="birthDate"
                        required
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Género</InputLabel>
                  <Select
                    labelId="genero"
                    id="genero"
                    value={genero}
                    label="Género"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Masculino</MenuItem>
                    <MenuItem value={20}>Femenino</MenuItem>
                    <MenuItem value={30}>Prefiero no decirlo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                <FormControl
                  component="fieldset"
                  fullWidth
                  sx={{
                    '& .MuiFormLabel-root': {
                      '&.Mui-focused': {
                        color: pink[800], // Color cuando está enfocado
                      },
                    },
                  }}
                >
                  <FormLabel component="legend">Preferencia alimenticia</FormLabel>
                  <RadioGroup
                    aria-label="food-preference"
                    name="foodPreference"
                    value={foodPreference}
                    onChange={handleFoodPreferenceChange}
                  >
                    <FormControlLabel value="ninguno" control={<Radio sx={{ color: pink[800], '&.Mui-checked': { color: pink[600] } }} />} label="Ninguno" />
                    <FormControlLabel value="vegetariano" control={<Radio sx={{ color: pink[800], '&.Mui-checked': { color: pink[600] } }} />} label="Vegetariano(a)" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasDisability}
                      onChange={handleDisabilityChange}
                      name="hasDisability"
                      sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label="¿Tienes alguna discapacidad motriz?"
                />
              </Grid>
            </Grid>
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar y continuar
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openSecondModal} onClose={handleCloseSecondModal} maxWidth="lg" fullWidth>
        <DialogTitle>Preferencias</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escoje las categorías y subcategorías que más te interesen.
          </DialogContentText>
          <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CardPref
              categorias={categorias}
              onSelect={handleCategoriaSelect}
              subcategoriasSeleccionadas={subcategoriasSeleccionadas}
              onSubcategoriaSelect={handleSubcategoriaSelect}
            />
          </Container>
          <DialogActions>
            <Button onClick={handleCloseSecondModal} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSecondModalSubmit} variant="contained" color="primary">
              Enviar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default PreferenciasModal;
