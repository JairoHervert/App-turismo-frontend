import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { Home, Inbox, ExpandLess, ExpandMore, Support, Settings, Person } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import '../../css/AdministradorLugares.css';

const DashboardSidebar = () => {
  const [openSolicitudes, setOpenSolicitudes] = useState(false);
  const [openLugares, setOpenLugares] = useState(false);
  const [openCuentas, setOpenCuentas] = useState(false);

  const handleClick = (menu) => {
    if (menu === 'solicitudes') setOpenSolicitudes(!openSolicitudes);
    if (menu === 'lugares') setOpenLugares(!openLugares);
    if (menu === 'cuentas') setOpenCuentas(!openCuentas);
  };

  return (

    <Box 
      className="sidebar-container-admin-places"
      backgroundColor="#F8F9FA"
      boxShadow="0px 0px 0px rgba(0, 0, 0, 0)" 
      maxHeight="2000px"
      overflow="auto" 

    >      

      <List>
        {/* Dashboard */}
        <div className='dash-cuentas-admin-places'>
          <ListItem button className="list-item-button-admin-places">
            <ListItemIcon className="list-item-icon-admin-places">
              <Home />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin-places" primary="Dashboard" primaryTypographyProps={{style: {fontWeight: 'bold'}}}/>
          </ListItem>

          {/* Solicitudes */}
          <ListItem button className="list-item-button-admin-places" onClick={() => handleClick('solicitudes')}>
            <ListItemIcon className="list-item-icon-admin-places">
              <Inbox />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin-places" primary="Solicitudes" />
            {openSolicitudes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSolicitudes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="submenu-item-admin-places">
                <ListItemText primary="No leídas" />
              </ListItem>
              <ListItem button className="submenu-item-admin-places">
                <ListItemText primary="Aprobadas" />
              </ListItem>
              <ListItem button className="submenu-item-admin-places">
                <ListItemText primary="Rechazadas" />
              </ListItem>
            </List>
          </Collapse>

          {/* Lugares Registrados */}
          <ListItem button className="list-item-button-admin-places" onClick={() => handleClick('lugares')}>
            <ListItemIcon className="list-item-icon-admin-places">
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin-places" primary="Lugares Registrados" />
            {openLugares ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openLugares} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Aquí se pueden añadir subcategorías si existen */}
            </List>
          </Collapse>

          {/* Cuentas Registradas */}
          <ListItem button className="list-item-button-admin-places" onClick={() => handleClick('cuentas')}>
            <ListItemIcon className="list-item-icon-admin-places">
              <Person />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin-places" primary="Cuentas Registradas" />
            {openCuentas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCuentas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="submenu-item-admin-places">
                <ListItemText primary="Todas las cuentas" />
              </ListItem>
              <ListItem button className="submenu-item-admin-places">
                <ListItemText primary="Inhabilitadas" />
              </ListItem>
            </List>
          </Collapse>
        </div>

        {/* Soporte */}
        <div className='ajustes-soporte-admin-places'>
          <ListItem button className="list-item-button-admin-places">
            <ListItemIcon className="list-item-icon-admin-places">
              <Support />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin-places" primary="Soporte" />
          </ListItem>

          {/* Ajustes */}
          <ListItem button className="list-item-button-admin-places">
            <ListItemIcon className="list-item-icon-admin-places">
              <Settings />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin-places" primary="Ajustes" />
          </ListItem>
        </div>

      </List>
    </Box>
  );
};

export default DashboardSidebar;
