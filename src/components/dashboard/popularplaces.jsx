import React from 'react';
import { Card, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#AEC6CF', '#B2DFEE', '#ADD8E6', '#B0E0E6', '#AFEEEE', '#87CEEB', '#87CEFA', '#4682B4'];

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
            <Box display="flex" flexDirection={{ xs: 'row', md: 'row' }} gap={2}>
                <Box flex={1}>
                    <Typography variant="h6" className="mb-4">
                        Categorías más populares
                    </Typography>
                    <List>
                        {categories.map((category, index) => (
                            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: 12, height: 12, backgroundColor: COLORS[index % COLORS.length], borderRadius: '50%', mr: 1 }} />
                                <ListItemText
                                    primary={`${index + 1}. ${category.name}`}
                                    secondary={`${category.percentage}%`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={categories}
                                nameKey="name"
                                dataKey="percentage"
                                cx="50%"
                                cy="65%"
                                outerRadius={80}
                                fill="#8884d8"
                            >
                                {categories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Card>
    );
}

export default PopularCategories;

