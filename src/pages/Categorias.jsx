import React from 'react';
// componentes
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ContenedorCategorias from '../components/categorias/ContenedorCategorias';
import ButtonsMod from '../components/ButtonsMod';

import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '../css/Categorias.css';

import { Container, Typography,  Stack } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

function SearchCategoryPage() { 
  const navigate = useNavigate();

  const handleRegresarClick = () => {
    navigate('/generar-itinerario');
  }

  const handleContinuarClick = () => {
    navigate('/itinerary');
  }

  const categoriasIniciales = [
    { id: 1, nombre: 'Deportes', imagen: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      subcategorias: [
        {id: 101, nombre: 'Arena', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 102, nombre: 'Athletic Field', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 103, nombre: 'Golf Course', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 104, nombre: 'Ice Skating Rink', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 105, nombre: 'Playground', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 106, nombre: 'Sports Activity Location', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 107, nombre: 'Sports Club', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 108, nombre: 'Swimming Pool', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
      ],
    },
    { id: 2, nombre: 'Comida Rápida', imagen: 'https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      subcategorias: [
        {id: 201, nombre: 'Bagel Shop', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 202, nombre: 'Acai Shop', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 203, nombre: 'Bakery', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 204, nombre: 'Fast Food Restaurant', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 205, nombre: 'Ice Cream Shop', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
      ],
    },
    { id: 3, nombre: 'Cafetería', imagen: "https://images.unsplash.com/photo-1678816862994-8a324a9612dd?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subcategorias: [
        {id: 301, nombre: 'Cafe', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 302, nombre: 'Cat Cafe', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 303, nombre: 'Chocolate shop', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 304, nombre: 'Coffee shop', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 305, nombre: 'Dessert Shop', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
      ],
    },
    { id: 4, nombre: 'Restaurante', imagen: "https://images.unsplash.com/photo-1678816862994-8a324a9612dd?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subcategorias: [
        {id: 401, nombre: 'Afghani', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 402, nombre: 'African', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 403, nombre: 'Mediterrian Restaurant', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 404, nombre: 'Middle Eastern Restaurant', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 405, nombre: 'Vegetarian Restaurant', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 406, nombre: 'Hamburger Restaurant', imagen: 'https://plus.unsplash.com/premium_vector-1713796081005-8332940118f9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
      ],
    },
    { id: 5, nombre: 'Bar', imagen: 'https://images.unsplash.com/photo-1620219365994-f443a86ea626?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', subcategorias: [], },
    { id: 6, nombre: 'Arte', imagen: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', subcategorias: [], },
    { id: 7, nombre: 'Historia', imagen: 'https://plus.unsplash.com/premium_photo-1682125784386-d6571f1ac86a?q=80&w=1816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', subcategorias: [], },
    { id: 8, nombre: 'Museos', imagen: 'https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 9, nombre: 'Educativos', imagen: 'https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 10, nombre: 'Compras', imagen: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 11, nombre: 'Parques', imagen: 'https://images.unsplash.com/photo-1622050956578-94fd044a0ada?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 12, nombre: 'Juegos recreativos al aire libre', imagen: 'https://images.unsplash.com/photo-1522219857201-024625d74598?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 13, nombre: 'Juegos recreativos bajo techo', imagen: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 14, nombre: 'Zoológicos', imagen: 'https://plus.unsplash.com/premium_photo-1682091970670-61386ad9768e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 15, nombre: 'Religión', imagen: 'https://images.unsplash.com/photo-1520629716099-d147346eb224?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <Container maxWidth='lg' className='sm-4'>
        { /* Sección - Header */}
        <Stack direction={{sm: 'row', xs: 'column'}} spacing={1} alignItems='center' className='mb-2' sx={{ marginTop: '30px', justifyContent: {xs: 'center', sm: 'flex-start'}}}>
          <CategoryIcon fontSize='large' sx={{ color: '#E4007C', fontSize: {sm: '3rem', xs: '2.5rem'} }} />
          <Typography variant='h1' className='fw-bold' sx={{ fontSize: {sm: '3rem', xs: '2rem'}, textAlign: {xs: 'center', sm: 'flex-start'} }}>Personaliza tu viaje</Typography>
        </Stack>

        <Typography variant='body1' sx={{ textAlign: {xs: 'center', sm: 'start'}, marginBottom: '40px' }}>
          Selecciona las categorías de tu interés.
        </Typography>

        <ContenedorCategorias
          categoriasIniciales={categoriasIniciales}
        />
        
        <Stack direction='row' sx={{ justifyContent: 'space-between', margin: '30px 0 30px 0' }}>
          <ButtonsMod
            variant='principal'
            textCont='Regresar'
            clickEvent={handleRegresarClick}
          />
          <ButtonsMod
            variant='principal'
            textCont='Continuar'
            clickEvent={handleContinuarClick}
          />
        </Stack>


      </Container>

      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );
}

export default SearchCategoryPage;
