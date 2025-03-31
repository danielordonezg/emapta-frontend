import React, { useState } from "react";
import { MenuItem, Select, InputLabel, FormControl, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: { target: { value: string } }) => {
    const newLang = event.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <FormControl
      variant="outlined"
      size={isMobile ? "small" : "medium"}
      sx={{
        minWidth: 100,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 1,
        mx: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          paddingLeft: "10px",
        },
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          gap: "6px",
        },
      }}
    >
      <InputLabel id="language-select-label" sx={{ display: "none" }}>Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={lang}
        onChange={handleChange}
      >
        <MenuItem value="en">🇺🇸 EN</MenuItem>
        <MenuItem value="es">🇪🇸 ES</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
