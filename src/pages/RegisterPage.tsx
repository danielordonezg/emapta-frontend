import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerRequest } from "../services/api";
import { sanitizeInput } from "../utils/sanitizers";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  email: string;
  username: string;
  password: string;
}
export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:;'<>,./?])[a-zA-Z0-9~!@#$%^&*()_+{}|:;'<>,./?]{10,}$/;

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: RegisterForm) => {
    const email = sanitizeInput(data.email);
    const username = sanitizeInput(data.username);
    const password = sanitizeInput(data.password);

    try {
      await registerRequest(email, username, password);
      navigate("/login");
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f9fbfc",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage:
            "url('https://blog.quadrant.health/content/images/size/w2000/2024/04/Screenshot-2024-04-21-at-17.53.26.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 500,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color="primary.main"
          >
            {t("createYourAccount")}
          </Typography>
          <Typography textAlign="center" mt={1} mb={3}>
            {t("startYourJourney")}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography fontWeight="bold" mb={0.5}>
              {t("email")}
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder={t("placeholderEmail") || ""}
              margin="dense"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={(errors.email && t("requiredField")) || " "}
            />

            <Typography fontWeight="bold" mb={0.5}>
              {t("username")}
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder={t("placeholderUsername") || ""}
              margin="dense"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={(errors.username && t("requiredField")) || " "}
            />

            <Typography fontWeight="bold" mt={2} mb={0.5}>
              {t("password")}
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder={t("placeholderPassword") || ""}
              type={showPassword ? "text" : "password"}
              margin="dense"
              {...register("password", {
                required: true,
                pattern: {
                  value: regexPassword,
                  message: t("passwordRequirements"),
                },
              })}
              error={!!errors.password}
              helperText={
                (errors.password?.type === "required" && t("requiredField")) ||
                errors.password?.message ||
                " "
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
            >
              {t("registerBtn")}
            </Button>
          </form>

          <Typography mt={4} textAlign="center" fontSize="0.9rem">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" underline="hover" color="primary.main">
              {t("logIn")}
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterPage;
