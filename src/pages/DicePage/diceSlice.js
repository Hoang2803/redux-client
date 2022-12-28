import { createSlice } from "@reduxjs/toolkit";

const diceSlice = createSlice({
  name: "dice",
  initialState: {
    playerScore: [0, 0],
    currentScore: 0,
    finalScore: 10,
    playerTurn: 0,
    startGame: false,
  },
  reducers: {
    holdScore(state, action) {
      state.playerScore[state.playerTurn] =
        state.playerScore[state.playerTurn] + state.currentScore;
      state.playerTurn = action.payload;
      state.currentScore = 0;
    },
    rollDice(state, action) {
      state.currentScore = state.currentScore + action.payload;
    },
    lostTurn(state, action) {
      state.currentScore = 0;
      state.playerTurn = action.payload;
    },
    setNewGame(state, action) {
      state.playerScore = [0, 0];
      state.currentScore = 0;
      state.finalScore = action.payload;
      state.playerTurn = 0;
      state.startGame = true;
    },
    endGame(state, action) {
      state.startGame = false;
    },
    restart(state, action) {
      state.playerScore = [0, 0];
      state.currentScore = 0;
      state.finalScore = 0;
      state.playerTurn = 0;
      state.startGame = false;
    },
  },
});

export default diceSlice;
