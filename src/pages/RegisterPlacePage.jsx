import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Stack,TextField, Button, Paper,FormControl,RadioGroup,FormControlLabel,Radio,InputAdornment,Typography} from '@mui/material';
import { DoneAllRounded as Check,Phone as PhoneIcon,Language as WebIcon,LocationOn as LocationIcon,PhotoCamera as CameraIcon} from '@mui/icons-material';

function RegisterPlacePage() {

    return (
        <ThemeProvider theme={ThemeMaterialUI}>
        <Navbar
            showingresa={false}
            showRegistrate={false}
            transparentNavbar={false}
            lightLink={false}
            staticNavbar={false}
        />

        <Container maxWidth="lg" sx={{my: 4}}>
            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={1} 
                alignItems="center" 
                sx={{ mb: 4 }}
                justifyContent={{ sm: 'space-between'  }}
            >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: { xs: 2, sm: 0 } }}>
                    <Check color="primary" fontSize="large" />
                    <h1 className="it-page-title">Solicitud de alta de lugar turístico</h1>
                </Stack>
            </Stack>
        </Container>

        <Container maxWidth="md" sx={{ my: 6 }}>

            <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" sx={{fontWeight: 'bold'}}>
                En este espacio, podrás compartir con nosotros los detalles de tu establecimiento.
            </Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: 'rgba(255, 255, 255, 0.98)',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'}}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}
                >
                    <TextField
                        fullWidth
                        label="Nombre del lugar"
                        variant="outlined"
                        required
                        placeholder="Nombre completo del establecimiento"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Ubicación"
                        required
                        placeholder="Calle / Número / Alcaldía / Estado / País"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LocationIcon color="primary" />
                            </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                            borderColor: 'primary.main',
                            },
                            },
                        }}
                    />

                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            defaultValue="Accesible"
                            name="tipo-lugar"
                        >
                            <FormControlLabel value="Accesible" control={<Radio />} label="Accesible con silla de ruedas" />
                            
                            <FormControlLabel value="No accesible" control={<Radio />} label="No accesible con silla de ruedas" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Descripción"
                        required
                        multiline
                        rows={4}
                        placeholder="Proporciona detalles sobre lo que hace especial el lugar (Historia, actividades importantes, etc.)"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                            borderColor: 'primary.main',
                            },
                            },
                        }}
                    />

                    <Box
                        sx={{
                            border: '2px dashed rgba(0, 0, 0, 0.1)',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            bgcolor: 'rgba(0, 0, 0, 0.02)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                            borderColor: 'primary.main',
                            }
                        }}
                    >
                    <CameraIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2, opacity: 0.8 }} />
                        <Typography variant="h6" gutterBottom color="primary.main">
                            Imagen del lugar
                        </Typography>
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ 
                            mt: 1,
                            borderRadius: 8,
                            px: 3,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.dark',
                                bgcolor: 'rgba(255, 20, 147, 0.04)'
                            }
                        }}
                    >
                        Subir imagen
                        <input type="file" hidden accept="image/*" />
                    </Button>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            placeholder="Número de teléfono"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon color="primary" />
                                </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Sitio web"
                            placeholder="URL del sitio web"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <WebIcon color="primary" />
                                </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                borderColor: 'primary.main',
                                },
                                },
                            }}
                        />
                    </Stack>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        size="large"
                        sx={{ alignSelf: 'flex-end', px: 4 }}
                    >
                        Enviar
                    </Button>
                    </Box>
                </Paper>
            </Container>

            <Footer showIncorporaLugar={true} />
        </ThemeProvider>
    );
}

export default RegisterPlacePage;
