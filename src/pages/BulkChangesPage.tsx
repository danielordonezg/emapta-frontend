import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const BulkChangesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box mt={8}>
      <Typography variant="h4" gutterBottom>
        {t("bulkChangesTitle")}
      </Typography>
      <Typography>{t("bulkChangesDescription")}</Typography>
      <Box mt={2}>
        <Button variant="contained">{t("processChanges")}</Button>
      </Box>
    </Box>
  );
};

export default BulkChangesPage;
