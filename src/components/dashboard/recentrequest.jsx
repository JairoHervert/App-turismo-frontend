import React from 'react';
import { Card, Typography, Box, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';

function RecentRequests({ requests }) {
    return (
        <Card
            elevation={3}
            sx={{
                p: 2,
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', 
            }}
        >
            <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6">
                    Solicitudes recientes
                </Typography>
                <Button variant="text" size="small">
                    Limpiar
                </Button>
            </Box>
            <List>
                {requests.map((request, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src="/api/placeholder/40/40" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${request.name} solicitó registrar "${request.place}"`}
                                secondary={request.time}
                            />
                        </ListItem>
                        {index < requests.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Card>
    );
}

export default RecentRequests;