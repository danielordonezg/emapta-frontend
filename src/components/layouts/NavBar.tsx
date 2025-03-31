import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  SyncAlt as MappingIcon,
  ChangeCircle as BulkChangeIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 70;

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  path?: string;
  action?: () => void;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated, logout } = useAuth();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => setMenuAnchor(null);

  const navigateTo = (path: string) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleCloseMenu();
  };

  const sidebarItems = [
    { icon: <MappingIcon />, label: "Mappings", path: "/mappings" },
    { icon: <BulkChangeIcon />, label: "Bulk Changes", path: "/bulk-changes" },
  ];

  const authenticatedMenuItems: MenuItemType[] = [
    { label: "Logout", icon: <LogoutIcon />, action: handleLogout },
  ];

  const guestMenuItems: MenuItemType[] = [
    { label: "Login", icon: <LoginIcon />, path: "/login" },
    { label: "Register", icon: <RegisterIcon />, path: "/register" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {isAuthenticated && (
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f9f9f9",
              borderRight: "1px solid #e0e0e0",
              paddingTop: "64px",
            },
          }}
        >
          <List>
            {sidebarItems.map((item) => (
              <Tooltip
                key={item.label}
                title={item.label}
                placement="right"
                arrow
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigateTo(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Drawer>
      )}

      <AppBar
        position="fixed"
        style={{ backgroundColor: "#04194d", color: "white" }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && isAuthenticated && (
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              component="img"
              src="https://www.healthnote.com/wp-content/uploads/al_opt_content/IMAGE/www.healthnote.com/wp-content/uploads/2024/07/inline-teal-trans.png.bv_resized_desktop.png.bv.webp"
              alt={"logo-healthnote"}
              sx={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            <Typography
              fontWeight={"semibold"}
              ml={3}
              variant="h6"
              noWrap
              component="div"
            >
              {t("welcome")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LanguageSwitcher />

            <IconButton color="inherit" onClick={handleMenu}>
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenu}
            >
              {(isAuthenticated ? authenticatedMenuItems : guestMenuItems).map(
                (item) => (
                  <MenuItem
                    key={item?.label}
                    onClick={
                      item.action ? item.action : () => navigateTo(item.path!)
                    }
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <Typography variant="inherit">{item.label}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
