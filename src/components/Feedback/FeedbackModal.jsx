import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { HiOutlineLightBulb } from "react-icons/hi";

function FeedbackModal({ open, setOpen, setShowFeedback, hoveredCardId }) {
  const [feedback, setFeedback] = React.useState(""); // State to store feedback

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setShowFeedback((prevFeedback) => ({
      ...prevFeedback,
      [hoveredCardId]: feedback,
    }));
    handleClose();
  };

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: "flex", flexDirection: "column" }}>
          <HiOutlineLightBulb size={50} /> Provide Additional Feedback
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            multiline
            name="feedback"
            rows={5}
            fullWidth
            value={feedback}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

FeedbackModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setShowFeedback: PropTypes.func.isRequired,
  hoveredCardId: PropTypes.number,
};

export default FeedbackModal;
