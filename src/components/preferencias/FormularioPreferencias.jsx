import React, { useState, useEffect, useRef } from "react";
import {
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
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonsMod from "../ButtonsMod";
import Grid from "@mui/material/Grid2";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "../../css/LoginPage.css";
import AlertD from "../alert"; // Importa el componente AlertD

function FormularioPreferencias({ open, handleClose, handleSubmit, datosIniciales }) {
  const alertRef = useRef(); // Crea una referencia para el componente AlertD

  useEffect(() => {
    let fechaFormateada = null;
    if(datosIniciales?.fechaNacimiento) {
      fechaFormateada = dayjs(datosIniciales?.fechaNacimiento);
    }
    setUserName(datosIniciales?.username || "");
    setFirstName(datosIniciales?.nombre || "");
    setLastName(datosIniciales?.apellido || "");
    setSelectedDate(fechaFormateada);
    setSexo(datosIniciales?.sexo || "");
  }, [datosIniciales]);

  const theme = useTheme();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [sexo, setSexo] = useState("");
  const [foodPreference, setFoodPreference] = useState("");
  const [hasDisability, setHasDisability] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Reglas
  const [userNameRules, setUserNameRules] = useState({
    length: false,
  });
  const [firstNameRules, setFirstNameRules] = useState({
    onlyLetters: false,
    length: false,
    startsWithUppercase: false,
  });
  const [lastNameRules, setLastNameRules] = useState({
    onlyLetters: false,
    length: false,
    startsWithUppercase: false,
  });
  const [dateError, setDateError] = useState(false);
  const [dateHelperText, setDateHelperText] = useState(
    "La edad debe ser de entre 18 a 65 años"
  );

  // -------------------------- userName --------------------------
  const handleUserNameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
  };

  useEffect(() => {
    const name = userName;
    const object = { length: false };
    if (name) {
      object.length = name.length >= 3 && name.length <= 10;
    }
    setUserNameRules(object);
  }, [userName]);

  // -------------------------- firstName --------------------------
  const handleFirstNameChange = (e) => {
    const name = e.target.value;
    setFirstName(name);
  };

  useEffect(() => {
    const name = firstName || "";
    setFirstNameRules({
      onlyLetters: name ? /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name) : false,
      length: name ? name.length >= 3 && name.length <= 20 : false,
      startsWithUppercase: name ? /^[A-ZÁÉÍÓÚÑÜ]/.test(name) : false,
    });
  }, [firstName]);

  // -------------------------- lastName --------------------------
  const handleLastNameChange = (e) => {
    const name = e.target.value;
    setLastName(name);
  };

  useEffect(() => {
    const name = lastName || "";
    setLastNameRules({
      onlyLetters: name ? /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name) : false,
      length: name ? name.length >= 3 && name.length <= 20 : false,
      startsWithUppercase: name ? /^[A-ZÁÉÍÓÚÑÜ]/.test(name) : false,
    });
  }, [lastName]);

  // -------------------------- selectedDate --------------------------
  const handleDateOfBirthChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (!selectedDate) {
      setDateError(true);
      setDateHelperText("La edad debe ser de entre 18 a 65 años");
      return;
    }
    const currentDate = dayjs();
    const age = currentDate.diff(selectedDate, "year");
    if (age < 18 || age > 65) {
      setDateError(true);
      setDateHelperText("Edad fuera del rango permitido (18 a 65 años)");
    } else {
      setDateError(false);
      setDateHelperText("");
    }
  }, [selectedDate]);

  // -------------------------- sexo --------------------------
  const handleSexoChange = (event) => {
    setSexo(event.target.value);
  };

  // -------------------------- foodPreference --------------------------
  const handleFoodPreferenceChange = (event) => {
    setFoodPreference(event.target.value);
  };

  // -------------------------- hasDisability --------------------------
  const handleDisabilityChange = (event) => {
    setHasDisability(event.target.checked);
  };

  // ------------------------------------------------------------------------------------------------------
  //                                                  SUBMIT
  // ------------------------------------------------------------------------------------------------------
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // Actualiza las reglas de validación
    setFirstNameRules({
      onlyLetters: firstName ? /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(firstName) : false,
      length: firstName ? firstName.length >= 3 && firstName.length <= 20 : false,
      startsWithUppercase: firstName ? /^[A-ZÁÉÍÓÚÑÜ]/.test(firstName) : false,
    });

    setLastNameRules({
      onlyLetters: lastName ? /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(lastName) : false,
      length: lastName ? lastName.length >= 3 && lastName.length <= 20 : false,
      startsWithUppercase: lastName ? /^[A-ZÁÉÍÓÚÑÜ]/.test(lastName) : false,
    });

    // Verifica las reglas de validación antes de enviar el formulario
    if (
      !userNameRules.length ||
      !firstNameRules.onlyLetters ||
      !firstNameRules.length ||
      !firstNameRules.startsWithUppercase ||
      !lastNameRules.onlyLetters ||
      !lastNameRules.length ||
      !lastNameRules.startsWithUppercase ||
      !selectedDate ||
      dateError ||
      !sexo ||
      !foodPreference
    ) {
      // Muestra la alerta si las validaciones no se cumplen
      if (alertRef.current) {
        alertRef.current.handleClickOpen();
      }
      return;
    }

    handleSubmit({
      userName,
      firstName,
      lastName,
      selectedDate,
      sexo,
      foodPreference,
      hasDisability,
      userNameRules,
      firstNameRules,
      lastNameRules,
      dateError,
    });
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          Preferencias
        </DialogTitle>
        <DialogContent sx={{ fontFamily: "Poppins, sans-serif" }}>
          <DialogContentText>
            Para ofrecerte una mejor experiencia, necesitamos conocerte mejor. Por
            favor, completa la siguiente información.
          </DialogContentText>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
            sx={{ mt: 2 }}
            className="pref-modal-textfield"
          >
            <Grid container spacing={1}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  margin="dense"
                  id="userName"
                  name="userName"
                  label="Nombre de usuario"
                  placeholder="Ej. eduardo123_12"
                  fullWidth
                  variant="outlined"
                  value={userName}
                  onChange={handleUserNameChange}
                  error={formSubmitted && !userNameRules.length}
                  required
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-2 ms-2 fw-medium"
                >
                  El nombre de usuario debe cumplir con las siguientes reglas:
                </Typography>
                <ul>
                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      userNameRules.length ? "text-success fw-semibold" : ""
                    }`}
                  >
                    Debe contener entre 3 y 10 caracteres.
                  </li>
                </ul>
              </Grid>

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
                  error={
                    formSubmitted &&
                    (!firstName ||
                      !firstNameRules.onlyLetters ||
                      !firstNameRules.length ||
                      !firstNameRules.startsWithUppercase)
                  }
                  required
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-2 ms-2 fw-medium"
                >
                  El nombre debe cumplir con las siguientes reglas:
                </Typography>
                <ul>
                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      firstNameRules.startsWithUppercase
                        ? "text-success fw-semibold"
                        : ""
                    }`}
                  >
                    Debe comenzar con mayúscula.
                  </li>
                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      firstNameRules.onlyLetters ? "text-success fw-semibold" : ""
                    }`}
                  >
                    Solo debe contener letras y acentos.
                  </li>
                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      firstNameRules.length ? "text-success fw-semibold" : ""
                    }`}
                  >
                    Debe contener entre 3 y 20 letras.
                  </li>
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
                  error={
                    formSubmitted &&
                    (!lastName ||
                      !lastNameRules.onlyLetters ||
                      !lastNameRules.length ||
                      !lastNameRules.startsWithUppercase)
                  }
                  required
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-2 ms-2 fw-medium"
                >
                  El apellido debe cumplir con las siguientes reglas:
                </Typography>
                <ul>
                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      lastNameRules.startsWithUppercase
                        ? "text-success fw-semibold"
                        : ""
                    }`}
                  >
                    Debe comenzar con mayúscula.
                  </li>

                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      lastNameRules.onlyLetters ? "text-success fw-semibold" : ""
                    }`}
                  >
                    Solo debe contener letras y acentos.
                  </li>
                  
                  <li
                    className={`lo_pa-rule-input fw-medium ${
                      lastNameRules.length ? "text-success fw-semibold" : ""
                    }`}
                  >
                    Debe contener entre 3 y 20 letras.
                  </li>
                </ul>
              </Grid>
              <Grid size={{ xs: 7, md: 6 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fecha de nacimiento"
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    margin="dense"
                    required
                    value={selectedDate}
                    maxDate={dayjs().subtract(18, "year")}
                    minDate={dayjs().subtract(65, "year")}
                    onChange={handleDateOfBirthChange}
                    slotProps={{
                      textField: {
                        error: formSubmitted && (!selectedDate || dateError),
                        helperText: dateHelperText,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ xs: 5, md: 6 }}>
                <FormControl fullWidth required error={formSubmitted && !sexo}>
                  <InputLabel id="gender-label">Sexo</InputLabel>
                  <Select
                    labelId="sexo-label"
                    id="sexo"
                    value={sexo}
                    label="Sexo"
                    onChange={handleSexoChange}
                  >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Prefiero no decirlo">
                    Otro
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl
                  component="fieldset"

                  fullWidth
                  required
                  error={formSubmitted && !foodPreference}
                >
                  <FormLabel component="legend">
                    Preferencia alimenticia
                  </FormLabel>
                  <RadioGroup
                    aria-label="food-preference"
                    name="foodPreference"
                    value={foodPreference}
                    onChange={handleFoodPreferenceChange}
                  >
                    <FormControlLabel
                      value="Ninguno"
                      control={
                        <Radio/>
                      }
                      label="Ninguno"
                    />
                    <FormControlLabel
                      value="Vegetariano(a)"
                      control={
                        <Radio/>
                      }
                      label="Vegetariano(a)"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasDisability}
                      onChange={handleDisabilityChange}
                      name="hasDisability"
                    />
                  }
                  label="¿Tienes alguna discapacidad motriz?"
                />
              </Grid>
            </Grid>
            <DialogActions sx={{ mt: 2 }}>
              <ButtonsMod
                variant="principal"
                textCont="Guardar y continuar"
                width="auto"
                height="2rem"
                type="submit"
              />
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <AlertD
        ref={alertRef}
        titulo="Error en el formulario"
        mensaje="Por favor, completa todos los campos correctamente."
        boton2="Aceptar"
      />
    </>
  );
}

export default FormularioPreferencias;