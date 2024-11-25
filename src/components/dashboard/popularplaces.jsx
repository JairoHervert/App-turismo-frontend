import React from 'react';
import { Card, Typography } from "@mui/material";
import { List, ListItem, ListItemText } from '@mui/material';

function PopularCategories({ categories }) {
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
            <Typography variant="h6" className="mb-4">
                Categorías más populares
            </Typography>
            <List>
                {categories.map((category, index) => (
                    <ListItem key={index}>
                        <ListItemText 
                            primary={`${index + 1}. ${category.name}`}
                            secondary={`${category.percentage}%`}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

export default PopularCategories;