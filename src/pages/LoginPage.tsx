import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Link,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/api";
import { sanitizeInput } from "../utils/sanitizers";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleCloseToast = () => setErrorToast(false);

  const onSubmit = async (data: LoginForm) => {
    const email = sanitizeInput(data.email);
    const password = sanitizeInput(data.password);

    try {
      const response = await loginRequest(email, password);
      login(response?.token);
      navigate("/mappings");
    } catch (error) {
      console.error("Login error:", error);
      setErrorToast(true);
    }
  };

  return (
    <>
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
              {t("welcomeBack")}
            </Typography>
            <Typography textAlign="center" mt={1} mb={3}>
              {t("gladToSeeYouAgain")}
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

              <Typography fontWeight="bold" mt={2} mb={0.5}>
                {t("password")}
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder={t("placeholderPassword") || ""}
                type={showPassword ? "text" : "password"}
                margin="dense"
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={(errors.password && t("requiredField")) || " "}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
              >
                {t("loginButton")}
              </Button>

              <Divider sx={{ my: 3 }}>OR</Divider>

              <Typography mt={4} textAlign="center" fontSize="0.9rem">
                {t("dontHaveAccount")}{" "}
                <Link href="/register" underline="hover" color="primary.main">
                  {t("signUpForFree")}
                </Link>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={errorToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: "100%" }}>
          {t("invalidCredentials")}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
