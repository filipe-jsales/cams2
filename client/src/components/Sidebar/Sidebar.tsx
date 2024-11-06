import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Box,
  SpeedDialIcon,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const menuItems = [
    { text: "Dashboard", icon: <SpeedDialIcon />, to: "/" },
    { text: "Users", icon: <SpeedDialIcon />, to: "/users" },
    { text: "Cams", icon: <SpeedDialIcon />, to: "/cams" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isCollapsed ? 80 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 80 : 240,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {!isCollapsed && (
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          )}
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <SpeedDialIcon />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.to}
              selected={selectedItem === item.text}
              onClick={() => handleItemClick(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
