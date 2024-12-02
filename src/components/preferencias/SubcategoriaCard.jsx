import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

function SubcategoriaCard({ subcategoria, onSelect, isSelected }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3.3, lg: 2.4 }} key={subcategoria.id}>
      <Card
        sx={{
          position: "relative",
          boxShadow: 3,
          mb: 2,
          height: { xs: "auto", lg: "200px" },
          width: { xs: "100%", lg: "200px" },
          border: isSelected ? '2.5px solid RGB(225, 48, 167)' : 'none',
        }}
      >
        <CardActionArea onClick={onSelect}>
          <CardMedia
            component="img"
            height="200"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt={subcategoria.nombre}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography variant="h6" component="div">
              {subcategoria.nombre}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default SubcategoriaCard;