import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import CategoriaCard from "./CategoriaCard";
import SubcategoriaCard from "./SubcategoriaCard";

function CardPref({ categorias }) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});
  const [subcategoriasSeleccionadas, setSubcategoriasSeleccionadas] = useState({});

  const handleCategoriaSelect = (categoria) => {
    setCategoriasSeleccionadas((prev) => {
      const isSelected = !!prev[categoria.id];
      const newCategoriasSeleccionadas = { ...prev };
      if (isSelected) {
        delete newCategoriasSeleccionadas[categoria.id];
        const newSubcategoriasSeleccionadas = { ...subcategoriasSeleccionadas };
        delete newSubcategoriasSeleccionadas[categoria.id];
        setSubcategoriasSeleccionadas(newSubcategoriasSeleccionadas);
      } else {
        newCategoriasSeleccionadas[categoria.id] = categoria;
      }
      return newCategoriasSeleccionadas;
    });
  };

  const handleSubcategoriaSelect = (categoriaId, subcategoria) => {
    setSubcategoriasSeleccionadas((prev) => {
      const isSelected = prev[categoriaId]?.includes(subcategoria.id);
      const newSubcategoriasSeleccionadas = { ...prev };
      if (isSelected) {
        newSubcategoriasSeleccionadas[categoriaId] = newSubcategoriasSeleccionadas[categoriaId].filter(
          (id) => id !== subcategoria.id
        );
        if (newSubcategoriasSeleccionadas[categoriaId].length === 0) {
          delete newSubcategoriasSeleccionadas[categoriaId];
        }
      } else {
        if (!newSubcategoriasSeleccionadas[categoriaId]) {
          newSubcategoriasSeleccionadas[categoriaId] = [];
        }
        newSubcategoriasSeleccionadas[categoriaId].push(subcategoria.id);
      }
      return newSubcategoriasSeleccionadas;
    });
  };

  return (
    <Grid container spacing={2}>
      {categorias.map((categoria) => (
        <React.Fragment key={categoria.id}>
          <CategoriaCard
            categoria={categoria}
            onSelect={() => handleCategoriaSelect(categoria)}
            isSelected={!!categoriasSeleccionadas[categoria.id]}
          />
          {categoriasSeleccionadas[categoria.id] &&
            categoria.subcategorias.map((subcategoria) => (
              <SubcategoriaCard
                key={subcategoria.id}
                subcategoria={subcategoria}
                onSelect={() => handleSubcategoriaSelect(categoria.id, subcategoria)}
                isSelected={subcategoriasSeleccionadas[categoria.id]?.includes(subcategoria.id)}
              />
            ))}
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default CardPref;
