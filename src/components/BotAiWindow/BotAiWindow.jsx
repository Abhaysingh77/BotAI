import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Style from "../BotAiWindow/BotAiWindow.module.css";
import { TbEdit } from "react-icons/tb";

const drawerWidth = 200;

function BotAiWindow(props) {
  const askQuestion = () => {};
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [chat, setChat] = React.useState([]);
  const [question, setQuestion] = React.useState([]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar className={Style.logoSection}>
        <div className={Style.logo}></div>
        <div style={{ fontFamily: "Ubuntu", fontWeight: 600, fontSize: "18px" }}>
          New chat
        </div>
        <TbEdit size={25} cursor="pointer" />
      </Toolbar>
      <Divider />
      <div className={Style.past}>Past Conversation</div>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className={Style.box}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className={Style.app}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontFamily: "Ubuntu" }}
            className={Style.name}
          >
            BotAI
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
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
          position: 'relative', // Ensure positioning context for children
        }}
      >
        {question.length ? (
          <Box
            position="fixed"
            sx={{
              fontFamily: "Ubuntu",
              textAlign: "center",
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: 7,
            }}
          >
            <h2>How Can I Help You Today?</h2>
            <div
              style={{ width: "50px", height: "50px" }}
              className={Style.logo}
            ></div>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'fixed',
              fontFamily: "Ubuntu",
              width: '70%',
              height: '80%', // Make sure the box takes the full height of its container
              ml: 5,
              backgroundColor: 'blue',
            }}
          >
            <div className={Style.card}></div>
          </Box>
        )}
        <Box
          position="fixed"
          sx={{ bottom: 10, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          className={Style.inputContainer}
        >
          <input type="text" name="" id="" value={question} />{" "}
          <button onClick={askQuestion}>Ask</button> <button>Save</button>
        </Box>
      </Box>
    </Box>
  );
}

BotAiWindow.propTypes = {
  window: PropTypes.func,
};

export default BotAiWindow;
