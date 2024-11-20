import { Grid, Card, CardActionArea, CardMedia, Typography } from '@mui/material';

function ItemFavoritos({ imagen, nombre}) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 300, margin: 'auto', backgroundColor: '#b9e6f79f' }}>
        <CardActionArea>
          <div style={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="250"
              image={imagen}
              alt={nombre}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Opcional, para mejorar la visibilidad
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {nombre}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ItemFavoritos;
