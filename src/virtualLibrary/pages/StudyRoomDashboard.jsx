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
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useEffect, useState } from "react";
import { StudyRoomPage } from "./StudyRoomPage";
import { NotificationsPage } from "./NotificationsPage";
import { FriendsPage } from "./FriendsPage";
import theme from "../../themes/theme";
import { getNotifications } from "../../store/thunks/notificationThunks";
import { useDispatch, useSelector } from "react-redux";
import { NotificationImportant } from "@mui/icons-material";

const drawerWidth = 240;
const marginTop = 65.1;


export const StudyRoomDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Salas");
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { notifications } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getNotifications(user.id));
  }, [])

  const onDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onMenuItemClick = (text) => {
    setSelectedPage(text);
    setMobileOpen(!mobileOpen);
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

  const menuItems = {
    Salas: <ChatBubbleIcon sx={{ color: theme.palette.primary.dark }} />,
    Notificaciones: notifications?.length == 0
      ? <MailIcon sx={{ color: theme.palette.primary.dark }} />
      : <NotificationImportant color="error" />,
    Amigos: <GroupIcon sx={{ color: theme.palette.primary.dark }} />,
  };

  const drawer = (
    <>
      <List>
        {Object.entries(menuItems).map(([text, icon]) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => onMenuItemClick(text)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{
                color: "white",
              }} />
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
          backgroundColor: theme.palette.secondary.main,
          display: { sm: "none" }
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
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
              backgroundColor: theme.palette.secondary.main
            }
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
              borderRight: '1px solid',
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.main
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          px: 2,
          mt: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />
        {renderPage()}
      </Box>
    </Box>
  );
};
