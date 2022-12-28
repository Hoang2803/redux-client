import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import { CustomPaper } from "../../Themes/styles";
import { ActivePlayer, CurrentScore, CustomTypography } from "./style";
import { getMode } from "../../redux/selectors/modeSelector";
import { getDice } from "../../redux/selectors/diceSelector";
import diceSlice from "./diceSlice";
import Dice from "./Dice";
import { ShowError } from "../../config/notistack";
import Rule from "./Rule";

const DicePage = () => {
  const [finalScoreTxt, setFinalScoreTxt] = useState("");
  const [winner, setWinner] = useState("");
  const [dices, setDices] = useState([1, 1]);

  const dispatch = useDispatch();

  const mode = useSelector(getMode);
  const { playerScore, currentScore, finalScore, playerTurn, startGame } =
    useSelector(getDice);

  useEffect(() => {
    const endGame = () => {
      dispatch(diceSlice.actions.endGame());
    };

    (() => {
      if (
        playerTurn === 0 &&
        playerScore[1] >= finalScore &&
        playerScore[1] > 0
      ) {
        endGame();
        setWinner(1);
      } else if (
        playerTurn === 1 &&
        playerScore[0] >= finalScore &&
        playerScore[0] > 0
      ) {
        endGame();
        setWinner(0);
      }
    })();
  }, [playerScore]);

  const handleSetNewGame = () => {
    if (finalScoreTxt === "") {
      ShowError("please enter final score before!");
    } else {
      dispatch(diceSlice.actions.setNewGame(parseInt(finalScoreTxt)));
      setWinner("");
    }
  };

  const handleRestart = () => {
    dispatch(diceSlice.actions.restart());
    setWinner("");
    setFinalScoreTxt("");
    setDices([1, 1]);
  };

  const handleRollDice = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    if (dice1 === 1 || dice2 === 1) {
      ShowError("You have lost turn!");
      setDices([dice1, dice2]);
      dispatch(diceSlice.actions.lostTurn(playerTurn === 0 ? 1 : 0));
    } else {
      setDices([dice1, dice2]);
      dispatch(diceSlice.actions.rollDice(dice1 + dice2));
    }
  };

  const handleHoldScore = () => {
    dispatch(diceSlice.actions.holdScore(playerTurn === 0 ? 1 : 0));
  };

  return (
    <CustomPaper>
      <Typography variant="h4" textAlign="center" mb={3}>
        Dice game with Redux
      </Typography>
      <Box textAlign="center" mb={2}>
        <ButtonGroup variant="outlined">
          <Rule />
          <Button onClick={handleSetNewGame}>New game</Button>
          <Button onClick={handleRestart}>restart</Button>
        </ButtonGroup>
      </Box>

      <Box width="80%" margin="0 auto" display="flex">
        {/* player 1 */}
        <Box flex={1} textAlign="center">
          <Box position="relative">
            <CustomTypography mode={mode}>
              {winner === 0 ? "WINNER" : "PLAYER 1"}
            </CustomTypography>
            <CustomTypography mode={mode} sx={{ fontSize: 50 }}>
              {playerScore[0]}
            </CustomTypography>
            <ActivePlayer
              display={playerTurn === 0 ? "block" : "none"}
              player={playerTurn}
              mode={mode}
            />
          </Box>
          <CurrentScore>
            <Typography>Current score</Typography>
            <Typography fontSize={20}>
              {playerTurn === 0 ? currentScore : 0}
            </Typography>
          </CurrentScore>
        </Box>

        <Box flex={1} textAlign="center">
          <Box mt={2}>
            <Box>
              <Dice number={dices[0]} />
            </Box>
            <Box mt={2} mb={2}>
              <Dice number={dices[1]} />
            </Box>
          </Box>
          <Box>
            <Button
              size="large"
              startIcon={<AutorenewIcon />}
              onClick={handleRollDice}
              disabled={(winner !== "" && true) || (!startGame && true)}
            >
              roll dice
            </Button>
          </Box>
          <Box>
            <Button
              size="large"
              startIcon={<SystemUpdateAltIcon />}
              onClick={handleHoldScore}
              disabled={(winner !== "" && true) || (!startGame && true)}
            >
              hold score
            </Button>
          </Box>
          <Box width="50%" margin="20px auto">
            {startGame ? (
              <>
                <Avatar sx={{ width: 90, height: 70, margin: "0 auto" }}>
                  {finalScoreTxt}
                </Avatar>
              </>
            ) : (
              <NumericFormat
                customInput={TextField}
                value={finalScoreTxt}
                placeholder="Final score"
                fullWidth
                focused
                onChange={(e) => setFinalScoreTxt(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSetNewGame();
                  }
                }}
                disabled={startGame}
              />
            )}
          </Box>
        </Box>

        {/* player 2 */}
        <Box flex={1}>
          <Box position="relative">
            <CustomTypography mode={mode}>
              {winner === 1 ? "WINNER" : "PLAYER 2"}
            </CustomTypography>
            <CustomTypography mode={mode} sx={{ fontSize: 50 }}>
              {playerScore[1]}
            </CustomTypography>
            <ActivePlayer
              display={playerTurn === 1 ? "block" : "none"}
              player={playerTurn}
              mode={mode}
            />
          </Box>
          <CurrentScore>
            <Typography>Current score</Typography>
            <Typography fontSize={20}>
              {playerTurn === 1 ? currentScore : 0}
            </Typography>
          </CurrentScore>
        </Box>
      </Box>
    </CustomPaper>
  );
};

export default DicePage;
