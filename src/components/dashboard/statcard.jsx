import React from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({ title, value, value2 ,subtitle }) {
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
            <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Box>
                    <Typography variant="h4" component="div" color="primary">
                        {value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {value2}{subtitle}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default StatCard;

