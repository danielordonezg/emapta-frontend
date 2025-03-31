import React from "react";
import { Box, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box mt={8}>
      <Typography variant="h4" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography>
        La ruta a la que intentas acceder no existe.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
