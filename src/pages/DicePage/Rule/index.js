import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const Rule = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Rule</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Rule of game"}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            - The game requires at least 2 players
          </Typography>
          <Typography variant="body2">
            - Player enters final score and press enter or "NEW GAME" button
          </Typography>
          <Typography variant="body2">
            - Players in turn can roll the dice continuously until they reach a
            satisfactory score can "Hold score" to keep that score.
          </Typography>
          <Typography variant="body2">
            (Note: "Current score" can stack with "Total score. However, if a
            player rolls on at least one dice of value 1, the player loses his
            turn)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>I got it</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Rule;
