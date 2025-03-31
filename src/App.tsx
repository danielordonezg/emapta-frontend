import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "./i18n";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";

import EHRMappingPage from "./pages/EHRMappingPage";
import BulkChangesPage from "./pages/BulkChangesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layouts/Layout";
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <EHRMappingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mappings"
                element={
                  <ProtectedRoute>
                    <EHRMappingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bulk-changes"
                element={
                  <ProtectedRoute>
                    <BulkChangesPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
