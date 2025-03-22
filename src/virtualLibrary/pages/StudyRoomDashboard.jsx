import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useState } from "react";
import { StudyRoomPage } from "./StudyRoomPage";
import { NotificationsPage } from "./NotificationsPage";
import { FriendsPage } from "./FriendsPage";

const drawerWidth = 240;
const marginTop = 69.4;
const menuItems = {
  Salas: <ChatBubbleIcon />,
  Notificaciones: <MailIcon />,
  Amigos: <GroupIcon />,
};

//TODO valorar llamar a BD desde el dashboard y pasar los datos como props
export const StudyRoomDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Salas");

  const onDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onMenuItemClick = (text) => {
    setSelectedPage(text);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case "Salas":
        return <StudyRoomPage />;
      case "Notificaciones":
        return <NotificationsPage />;
      case "Amigos":
        return <FriendsPage />;
      default:
        break;
    }
  };

  const drawer = (
    <>
      <List>
        {Object.entries(menuItems).map(([text, icon]) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => onMenuItemClick(text)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: `${marginTop}px`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedPage}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: `${marginTop}px`,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: `${marginTop}px`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
};
