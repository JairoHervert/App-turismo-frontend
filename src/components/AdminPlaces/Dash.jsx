import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { Home, Inbox, ExpandLess, ExpandMore, Support, Settings, Person } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import '../../css/DashSide.css';

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
      className="sidebar-container-admin"
      backgroundColor="#F8F9FA"
      boxShadow="0px 0px 0px rgba(0, 0, 0, 0)"
      overflow="auto"
    >     
      <List>
        {/* Dashboard */}
        <div className='dash-cuentas-admin'>
          <ListItem button className="list-item-button-admin">
            <ListItemIcon className="list-item-icon-admin">
              <Home />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin" primary="Dashboard" primaryTypographyProps={{style: {fontWeight: 'bold'}}} />
          </ListItem>

          {/* Solicitudes */}
          <ListItem button className="list-item-button-admin" onClick={() => handleClick('solicitudes')}>
            <ListItemIcon className="list-item-icon-admin">
              <Inbox />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin" primary="Solicitudes" />
            {openSolicitudes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSolicitudes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="submenu-item-admin">
                <ListItemText primary="No leídas" />
              </ListItem>
              <ListItem button className="submenu-item-admin">
                <ListItemText primary="Aprobadas" />
              </ListItem>
              <ListItem button className="submenu-item-admin">
                <ListItemText primary="Rechazadas" />
              </ListItem>
            </List>
          </Collapse>

          {/* Lugares Registrados */}
          <ListItem button className="list-item-button-admin" onClick={() => handleClick('lugares')}>
            <ListItemIcon className="list-item-icon-admin">
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin" primary="Lugares Registrados" />
            {openLugares ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openLugares} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Subcategorías adicionales */}
            </List>
          </Collapse>

          {/* Cuentas Registradas */}
          <ListItem button className="list-item-button-admin" onClick={() => handleClick('cuentas')}>
            <ListItemIcon className="list-item-icon-admin">
              <Person />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin" primary="Cuentas Registradas" />
            {openCuentas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCuentas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="submenu-item-admin">
                <ListItemText primary="Todas las cuentas" />
              </ListItem>
              <ListItem button className="submenu-item-admin">
                <ListItemText primary="Inhabilitadas" />
              </ListItem>
            </List>
          </Collapse>
        </div>

        {/* Soporte */}
        <div className='ajustes-soporte-admin'>
          <ListItem button className="list-item-button-admin">
            <ListItemIcon className="list-item-icon-admin">
              <Support />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin" primary="Soporte" />
          </ListItem>

          {/* Ajustes */}
          <ListItem button className="list-item-button-admin">
            <ListItemIcon className="list-item-icon-admin">
              <Settings />
            </ListItemIcon>
            <ListItemText className="list-item-text-admin" primary="Ajustes" />
          </ListItem>
        </div>
      </List>
    </Box>
  );
};

export default DashboardSidebar;