import React, { useState } from "react";
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
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { pink } from "@mui/material/colors";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import '../../css/prefModal.css';
import '../../css/LoginPage.css';

function FormularioPreferencias({ open, handleClose, handleSubmit }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [foodPreference, setFoodPreference] = useState("");
  const [hasDisability, setHasDisability] = useState(false);
  const [genero, setGenero] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameRules, setFirstNameRules] = useState({
    onlyLetters: false,
    minLength: false,
  });
  const [lastNameRules, setLastNameRules] = useState({
    onlyLetters: false,
    minLength: false,
  });
  const [fechaError, setFechaError] = useState(false);
  const [fechaHelperText, setFechaHelperText] = useState('La edad debe ser de entre 18 a 65 años');

  // Manejo de eventos
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleFoodPreferenceChange = (event) => {
    setFoodPreference(event.target.value);
  };

  const handleDisabilityChange = (event) => {
    setHasDisability(event.target.checked);
  };

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  const handleFirstNameChange = (e) => {
    const name = e.target.value;
    setFirstName(name);
    setFirstNameRules({
      onlyLetters: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name),
      minLength: name.length >= 2,
    });
  };

  const handleLastNameChange = (e) => {
    const name = e.target.value;
    setLastName(name);
    setLastNameRules({
      onlyLetters: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name),
      minLength: name.length >= 2,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (
      firstName &&
      lastName &&
      selectedDate &&
      genero &&
      foodPreference &&
      firstNameRules.onlyLetters &&
      firstNameRules.minLength &&
      lastNameRules.onlyLetters &&
      lastNameRules.minLength
    ) {
      handleSubmit(event);
    }
  };

  const handleFechaNacimientoChange = (nuevaFecha) => {
    if (!nuevaFecha) {
      setFechaError(true);
      setFechaHelperText('La edad debe ser de entre 18 a 65 años');
      return;
    }
    const fechaNacimientoActual = dayjs();
    const edad = fechaNacimientoActual.diff(nuevaFecha, 'year');
    if (edad < 18 || edad > 65) {
      setFechaError(true);
      setFechaHelperText('Edad fuera del rango permitido (18 a 65 años)');
    } else {
      setFechaError(false);
      setFechaHelperText('');
    }
    setSelectedDate(nuevaFecha);
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', color: pink[600], fontWeight: 'bold' }}>
        Preferencias
      </DialogTitle>
      <DialogContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
        <DialogContentText>
          Para ofrecerte una mejor experiencia, necesitamos conocerte mejor. Por favor, completa la siguiente información.
        </DialogContentText>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
          sx={{ mt: 2 }}
          className="pref-modal-textfield"
        >
          <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
          <TextField
                margin="dense"
                id="firstName"
                name="firstName"
                label="Nombre(s)"
                placeholder="Ej. Eduardo Raúl"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameChange}
                error={formSubmitted && (!firstName || !firstNameRules.onlyLetters || !firstNameRules.minLength)}
                required
              />
              <Typography variant="body2" color="textSecondary" className='mb-2 ms-2 fw-medium'>
                El nombre debe cumplir con las siguientes reglas:
              </Typography>
              <ul>
                <li className={`lo_pa-rule-input fw-medium ${firstNameRules.onlyLetters ? 'text-success fw-semibold' : ''}`}>Solo debe contener letras y acentos.</li>
                <li className={`lo_pa-rule-input fw-medium ${firstNameRules.minLength ? 'text-success fw-semibold' : ''}`}>Debe contener al menos 2 letras.</li>
              </ul>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
            <TextField
                margin="dense"
                id="lastName"
                name="lastName"
                label="Apellido(s)"
                fullWidth
                variant="outlined"
                placeholder="Ej. Arreola Medina"
                value={lastName}
                onChange={handleLastNameChange}
                error={formSubmitted && (!lastName || !lastNameRules.onlyLetters || !lastNameRules.minLength)}
                required
              />
              <Typography variant="body2" color="textSecondary" className='mb-2 ms-2 fw-medium'>
                El apellido debe cumplir con las siguientes reglas:
              </Typography>
              <ul>
                <li className={`lo_pa-rule-input fw-medium ${lastNameRules.onlyLetters ? 'text-success fw-semibold' : ''}`}>Solo debe contener letras y acentos.</li>
                <li className={`lo_pa-rule-input fw-medium ${lastNameRules.minLength ? 'text-success fw-semibold' : ''}`}>Debe contener al menos 2 letras.</li>
              </ul>
            </Grid>
            <Grid size={{ xs: 7, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DatePicker
                  label="Fecha de nacimiento"
                  sx={{ width: '100%' }}
                  format='DD-MM-YYYY'
                  margin='dense'
                  required
                  value={selectedDate}
                  maxDate={dayjs().subtract(18, 'year')}
                  minDate={dayjs().subtract(65, 'year')}
                  onChange={handleFechaNacimientoChange}
                  slotProps={{
                    textField: {
                      error: formSubmitted && (!selectedDate || fechaError),
                      helperText: fechaHelperText,
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 5, md: 6 }}>
            <FormControl fullWidth  required error={formSubmitted && !genero}>
                <InputLabel id="genero-label">Género</InputLabel>
                <Select
                  labelId="genero-label"
                  id="genero"
                  value={genero}
                  label="Género"
                  onChange={handleGeneroChange}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Prefiero no decirlo">Prefiero no decirlo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12}}>
            <FormControl component="fieldset"sx={{
                '& .MuiFormLabel-root': {
                  '&.Mui-focused': {
                    color: pink[600], // Color cuando está enfocado
                  },
                },
              }}  fullWidth required error={formSubmitted && !foodPreference}>
                <FormLabel component="legend">Preferencia alimenticia</FormLabel>
                <RadioGroup
                  aria-label="food-preference"
                  name="foodPreference"
                  value={foodPreference}
                  onChange={handleFoodPreferenceChange}
                >
                  <FormControlLabel
                    value="ninguno"
                    control={<Radio sx={{ color: pink[800], "&.Mui-checked": { color: pink[600] } }} />}
                    label="Ninguno"
                  />
                  <FormControlLabel
                    value="vegetariano"
                    control={<Radio sx={{ color: pink[800], "&.Mui-checked": { color: pink[600] } }} />}
                    label="Vegetariano(a)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12}}>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={hasDisability}
                    onChange={handleDisabilityChange}
                    name="hasDisability"
                    sx={{ color: pink[800], "&.Mui-checked": { color: pink[600] } }}
                  />
                }
                label="¿Tienes alguna discapacidad motriz?"
              />
            </Grid>
          </Grid>
          <DialogActions sx={{ mt: 2 }}>
          {/*
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          */}
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#E4007C', "&:hover": { backgroundColor: '#D0006F' } }}>
              Guardar y continuar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default FormularioPreferencias;
