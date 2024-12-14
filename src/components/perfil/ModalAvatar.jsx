import React from 'react';

import ButtonsMod from '../ButtonsMod';
import { Box, Modal, TextField, Typography } from '@mui/material';

function InformacionHeader({ openModal, setOpenModal, newAvatarUrl, setNewAvatarUrl, handleAvatarChange, handleCancel, urlError, setUrlError}) {

  return (
    <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='modal-titulo'
        aria-describedby='modal-descripcion'
    >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {sm: 500, xs: '80%'},
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: '8px',
          }}
        >
            <Typography id='modal-titulo' variant='body1' textAlign='center' sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
                Editar foto de perfil
            </Typography>
            <Typography id='modal-titulo' variant='body1' textAlign='center' sx={{ marginBottom: '30px' }}>
                Por favor, ingresa la URL de la imagen
            </Typography>
          <TextField
            fullWidth
            label='URL de la Imagen'
            variant='outlined'
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
            error={!!urlError}
            helperText={urlError || 'Ingresa una URL válida de una imagen'}
            sx={{ mb: 2, marginBottom: '30px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: {sm: 'flex-end', xs: 'center' } }}>
            <Box sx={{ marginRight: '15px' }}>
                <ButtonsMod
                    variant='secundario'
                    textCont='Cancelar'
                    clickEvent={handleCancel}
                />
            </Box>
            <ButtonsMod
                variant='principal'
                textCont='Guardar'
                clickEvent={handleAvatarChange}
                type='submit'
            />
          </Box>
        </Box>
      </Modal>
  );
}

export default InformacionHeader;