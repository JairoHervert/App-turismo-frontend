import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PlaceItemTimeline from './PlaceItemTimeline';

import '../../css/ItineraryPage.css';

function SortablePlaceItem({ place, index, setSelectedPlace, handleDeleteItem }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: `place-${index}`,
  });

  // Estado para controlar la vetnata modal de confirmación de eliminación de un lugar
  const [openModal, setOpenModal] = useState(false);

  // Funciones para abrir y cerrar el diálogo de confirmación
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    handleDeleteItem();
    handleCloseModal();
  };

  return (
    <Box ref={setNodeRef}       sx={{
      transform: CSS.Transform.toString(transform),
      ':hover': {
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderRadius: '0.3rem',
      },
    }} className='d-flex align-items-start'>
      <PlaceItemTimeline
        placeTime={place.placeTime}
        placeName={place.placeName}
        placeDescription={place.placeDescription}
        placeThings={place.placeThings}
        placeImages={place.placeImages}
        placeRating={place.placeRating}
        finalItem={place.finalItem}
        obtainPlace={() => {
          setSelectedPlace(place);
        }}
      />

      <Box className='it_pa-delete-drag-icons-container'>
        {/* Botón para eliminar el elemento (abre el modal de confirmación) */}
        <IconButton onClick={handleClickOpenModal}>
          <DeleteOutlineRoundedIcon color='error'/>
        </IconButton>

        {/* Handle para arrastrar el elemento */}
        <IconButton {...listeners} {...attributes} sx={{ cursor: 'grab' }}>
          <DragIndicatorIcon color='secondary'/>
        </IconButton>
      </Box>

      {/* Modal de confirmación */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='confirm-delete-dialog-title'
        aria-describedby='confirm-delete-dialog-description'
        sx={{ maxWidth: '35rem', margin: 'auto' }}
      >
        <DialogTitle id='confirm-delete-dialog-title'>
          <Typography fontFamily={'poppins'} className='fw-medium fs-5 text-center'>¿Estás seguro de que quieres eliminar este lugar?</Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='confirm-delete-dialog-description'>
          <Typography fontFamily={'poppins'} className='fw-normal text-center'>Esta acción no se puede deshacer. Por favor, confirma si deseas eliminar el lugar del itinerario.</Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color='secondary'>
          <Typography fontFamily={'poppins'} className='fw-normal text-center'>Cancelar</Typography>
          </Button>

          <Button onClick={handleConfirmDelete} color='error' autoFocus>
          <Typography fontFamily={'poppins'} className='fw-normal text-center'>Eliminar</Typography>
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  );
}

export default SortablePlaceItem;
