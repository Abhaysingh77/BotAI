import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Rating,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { TbEdit } from "react-icons/tb";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import Style from "../BotAiWindow/BotAiWindow.module.css";
import FeedbackModal from "../Feedback/FeedbackModal";
import { data } from "../../assets/data";

const drawerWidth = 200;

function BotAiWindow(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [chat, setChat] = React.useState([]);
  const [ques, setQues] = React.useState("");
  const idRef = React.useRef(0);
  const [hoveredCardId, setHoveredCardId] = React.useState(null);
  const [isHover, setIsHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({});
  const [showStarRating, setShowStarRating] = React.useState({});
  const [showFeedback, setShowFeedback] = React.useState({});
  const [conversations, setConversations] = React.useState([]);
  const [showPastConversations, setShowPastConversations] =
    React.useState(false);

  const askQuestion = () => {
    let date = new Date();
    let time = date.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    let obj = {
      question: ques,
      id: idRef.current,
      time: time,
    };
    idRef.current++;
    setQues("");
    setChat((prev) => [obj, ...prev]);

    let timeout = setTimeout(() => {
      const ans = data.find(
        (item) => item.question.toLowerCase() === ques.toLowerCase()
      );

      if (ans) {
        let ansObj = {
          answer: ans.response,
          id: idRef.current,
          time: time,
        };
        idRef.current++;
        setChat((prev) => [ansObj, ...prev]);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  };

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

  const handleMouseEnter = (id) => {
    setHoveredCardId(id);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setIsHover(false);
  };

  const handleModal = (id) => {
    setOpen(true);
    setHoveredCardId(id);
  };

  const showRating = (id) => {
    setShowStarRating((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = () => {
    setConversations((prev) => [...prev, chat]);
    setChat([]);
  };

  const togglePastConversations = () => {
    setShowPastConversations((prev) => !prev);
  };

  const drawer = (
    <div>
      <Toolbar className={Style.logoSection}>
        <div className={Style.logo}></div>
        <div
          style={{ fontFamily: "Ubuntu", fontWeight: 600, fontSize: "18px" }}
        >
          New chat
        </div>
        <TbEdit size={25} cursor="pointer" onClick={handleSave} />
      </Toolbar>
      <Divider />
      <div className={Style.past}>
        <Typography onClick={togglePastConversations}>
          Past Conversations
        </Typography>
        {showPastConversations && (
          <ul
            style={{
              listStyle: "none",
              float: "left",
              marginInlineStart: "-30px",
            }}
          >
            {conversations.map((conv, index) => (
              <li key={index}>
                <Typography
                  variant="subtitle"
                  onClick={() => setChat(conv)}
                  style={{ cursor: "pointer" }}
                >
                  Conversation {index + 1}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <MenuIcon sx={{ color: "#9785BA" }} />
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
            keepMounted: true,
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
          position: "relative",
        }}
      >
        {chat.length <= 0 ? (
          <>
            <Box
              style={{
                position: "relative",
                top: 50,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h2>How Can I Help You Today?</h2>
              <div
                style={{ width: "50px", height: "50px" }}
                className={Style.logo}
              ></div>
            </Box>

            <div className={Style.dummyCardContainer}>
              <div className={Style.dummyCard}>
                Start by saying <i>Hi</i> or <i>Hello</i> <br />
                <small>Get AI generated response</small>
              </div>
              <div className={Style.dummyCard}>
                Ask <i>What's importance of responsive design?</i> <br />
                <small>Get AI generated response</small>
              </div>
              <div className={Style.dummyCard}>
                Start by saying <i>Hi</i> or <i>Hello</i> <br />
                <small>Get AI generated response</small>
              </div>
            </div>
          </>
        ) : (
          <Box
            className={Style.chatBox}
            sx={{
              position: "fixed",
              fontFamily: "Ubuntu",
              width: "77.5%",
              height: "80%",
              ml: 2,
              bottom: 65,
            }}
          >
            {chat.map((item) => (
              <div
                className={Style.card}
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={item.question ? Style.you : Style.chatLogo}
                ></div>
                <div className={Style.content}>
                  <p>{item.question ? "You" : "BotAI"}</p>
                  <p>{item.question || item.answer}</p>
                  <span className={Style.time}>{item.time}</span>
                  {!item.question && isHover && item.id === hoveredCardId && (
                    <span>
                      <FiThumbsUp
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => showRating(item.id)}
                      />
                      <FiThumbsDown
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => handleModal(item.id)}
                      />
                    </span>
                  )}
                  {!item.question && showStarRating[item.id] && (
                    <div>
                      <Rating
                        name={`star-rating-${item.id}`}
                        value={value[item.id] || 0}
                        onChange={(event, newValue) => {
                          setValue((prev) => ({
                            ...prev,
                            [item.id]: newValue,
                          }));
                        }}
                      />
                    </div>
                  )}
                  {!item.question && showFeedback[item.id] && (
                    <Typography className={Style.feedback}>
                      <b>Feedback:</b> {showFeedback[item.id]}
                    </Typography>
                  )}
                </div>
              </div>
            ))}
            <FeedbackModal
              open={open}
              setOpen={setOpen}
              setShowFeedback={setShowFeedback}
              hoveredCardId={hoveredCardId}
            />
          </Box>
        )}
        <Box
          position="fixed"
          sx={{ bottom: 10, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          className={Style.inputContainer}
        >
          <input
            type="text"
            value={ques}
            onChange={(e) => setQues(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          />
          <button onClick={askQuestion}>Ask</button>
          <button onClick={handleSave}>Save</button>
        </Box>
      </Box>
    </Box>
  );
}

BotAiWindow.propTypes = {
  window: PropTypes.func,
};

export default BotAiWindow;
