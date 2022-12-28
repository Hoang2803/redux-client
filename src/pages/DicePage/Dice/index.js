import React, { useMemo } from "react";

import dice1 from "../../../assets/dice1.webp";
import dice2 from "../../../assets/dice2.png";
import dice3 from "../../../assets/dice3.webp";
import dice4 from "../../../assets/dice4.webp";
import dice5 from "../../../assets/dice5.webp";
import dice6 from "../../../assets/dice6.webp";
import { DiceFace } from "../style";

const Dice = ({ number }) => {
  const src = useMemo(() => {
    switch (number) {
      case 1:
        return dice1;
      case 2:
        return dice2;
      case 3:
        return dice3;
      case 4:
        return dice4;
      case 5:
        return dice5;
      case 6:
        return dice6;
      default:
        break;
    }
  }, [number]);

  return (
    <DiceFace src={src} alt={number} />

    // <CustomBoxDice number={number}>
    //   <CustomDice src={dice1} alt="dice1" position="front" />
    //   <CustomDice src={dice2} alt="dice2" position="back" />
    //   <CustomDice src={dice5} alt="dice5" position="left" />
    //   <CustomDice src={dice6} alt="dice6" position="right" />
    //   <CustomDice src={dice3} alt="dice3" position="top" />
    //   <CustomDice src={dice4} alt="dice4" position="bottom" />
    // </CustomBoxDice>
  );
};

export default Dice;
