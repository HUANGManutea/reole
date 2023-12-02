'use client';

import { useEffect, useRef, useState } from "react";
import GameBoard from "../board/game-board";
import Keyboard, { KeyboardLayoutObject } from "react-simple-keyboard";
import 'simple-keyboard/build/css/index.css';
import { GameWord } from "../model/game-word";
import { RoundResult } from "../model/round-result";
import ModalResult from "./modal-result";
import { differenceInHours, startOfDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { mod } from "../utils/utils";
import { PointDetails } from "../model/point-details";

enum Correctness {
  CORRECT,
  MISPLACED,
  INCORRECT
}

const layout: KeyboardLayoutObject = {
  'ty': [
    "F H M N P R T V ' {backspace}",
    '{shift} A E I O U {enter}',
  ],
  'shift-ty': [
    "f h m n p r t v ' {backspace}",
    '{shift} Ā Ē Ī Ō Ū {enter}',
  ],
}

const display: { [button: string]: string; } = {
  "{enter}": "↵",
  "{shift}": "⇧",
  "{backspace}": "⌫",
}

const voyelsToTaravaVoyels: { [voyel: string]: string; } = {
  'A': 'Ā',
  'E': 'Ē',
  'I': 'Ī',
  'O': 'Ō',
  'U': 'Ū',
}

const allLetters = "FHMNPRTVAEIOU'";

type GameComponentProps = {
  word: GameWord
}

export default function GameComponent({ word }: GameComponentProps) {
  const [input, setInput] = useState<string[]>(['', '', '', '', '']);
  const [charIndex, setCharIndex] = useState(0);
  const [tries, setTries] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [tryIndex, setTryIndex] = useState(0);
  const [layoutName, setLayoutName] = useState('ty');
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResult>(RoundResult.ONGOING);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointDetails, setPointDetails] = useState<PointDetails>();
  const keyboard = useRef();

  // trigger once after loading the DOM
  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) => handleKeyDown(event);

    if (document) {
      document.addEventListener('keydown', handleKeyDownWrapper);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDownWrapper);
    }
  }, [input, isShiftActive]);

  useEffect(() => {
    if (roundResult !== RoundResult.ONGOING) {
      setIsModalOpen(true);
    }
  }, [roundResult]);

  const checkWord = (): Correctness[] => {
    const result: Correctness[] = [];
    const tempInput = [...input];
    for (let index = 0; index < tempInput.length; index++) {
      if (tempInput[index] === word.chars[index]) {
        result.push(Correctness.CORRECT);
      } else if (word.lexeme.includes(tempInput[index].toLowerCase())) {
        result.push(Correctness.MISPLACED);
      } else {
        result.push(Correctness.INCORRECT);
      }
    }
    return result;
  }

  const updateColors = (correctnesses: Correctness[]) => {
    for (let index = 0; index < correctnesses.length; index++) {
      const cellElement = document.getElementById(`cell-${tryIndex}-${index}`);
      if (cellElement) {
        if (correctnesses[index] === Correctness.CORRECT) {
          cellElement.classList.add('cell-correct');
        } else if (correctnesses[index] === Correctness.MISPLACED) {
          cellElement.classList.add('cell-misplaced');
        }
      }
    }
  }

  const isWin = (correctnesses: Correctness[]) => {
    return correctnesses.filter(c => c === Correctness.CORRECT).length === input.length;
  }

  const computePoints = () => {
    // points for speed
    const now = Date.now();
    // we start at 8am Tahiti time
    const dayStartZoned: Date = startOfDay(utcToZonedTime(now, 'Pacific/Tahiti'));
    dayStartZoned.setHours(8);
    let diffHours: number = differenceInHours(now, dayStartZoned);
    if (diffHours > 24) {
      diffHours = 24;
    }
    const nbPointsSpeed: number = mod(24 - diffHours, 24) * 100;
    // points for number of tries
    const nbPointsTries = (6 - tryIndex) * 10;
    setPointDetails({
      nbPointsSpeed: nbPointsSpeed,
      nbPointsTries: nbPointsTries
    });
  }

  const submitInput = () => {
    if (charIndex === 5 && tryIndex < 6) { // Ensure a complete input is given
      const checkWordResult: Correctness[] = checkWord();
      updateColors(checkWordResult);
      if (isWin(checkWordResult)) {
        computePoints();
        setRoundResult(RoundResult.WIN);
      } else if (tryIndex === 5) {
        // not a win and reached the end
        setRoundResult(RoundResult.LOSE);
      } else {
        setInput(['', '', '', '', '']); // Reset input for the next try
        setTryIndex((prevTryIndex) => prevTryIndex + 1); // Move to the next try
        setCharIndex(0); // Reset the character index
      }
    }
  }

  const addKeyToInput = (key: string) => {
    if (charIndex < 5) {
      setInput((prevInput) => {
        const newInput = [...prevInput];
        newInput[charIndex] = key;
        // Update the current try with the new input
        setTries((prevTries) => {
          const newTries = [...prevTries];
          newTries[tryIndex] = newInput;
          return newTries;
        });
        return newInput;
      });
      setCharIndex((prevCharIndex) => prevCharIndex + 1);
    }
  };

  const handleShift = () => {
    setIsShiftActive(prevState => {
      const newState = !prevState;
      setLayoutName(newState ? 'shift-ty' : 'ty');
      return newState;
    });
  };

  const handleBackspace = () => {
    if (charIndex > 0) {
      setCharIndex((prevCharIndex: number) => {
        setInput((prevInput: string[]) => {
          const newInput = [...prevInput];
          newInput[prevCharIndex - 1] = ''; // Clear the character at the previous index
          // Update the current try with the new input
          setTries((prevTries) => {
            const newTries = [...prevTries];
            newTries[tryIndex] = newInput;
            return newTries;
          });
          return newInput;
        });
        return prevCharIndex - 1;
      }); // Decrement the character index
    }
  };

  const onKeyboardKeyPress = (value: string) => {
    if (roundResult === RoundResult.ONGOING) {
      if (value === "{enter}") {
        submitInput();
      } else if (value === "{backspace}") {
        handleBackspace();
      } else if (value === "{lock}" || value === "{shift}") {
        handleShift();
      } else {
        addKeyToInput(value);
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (roundResult === RoundResult.ONGOING) {
      event.preventDefault();
      let key = event.key;
      if (event.key === 'Shift') {
        handleShift();
      } else if (event.key === 'Enter') {
        submitInput();
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (isShiftActive && voyelsToTaravaVoyels[event.key.toUpperCase()]) {
        key = voyelsToTaravaVoyels[event.key.toUpperCase()];
        addKeyToInput(key);
      } else if (allLetters.includes(event.key.toUpperCase())) {
        addKeyToInput(key.toUpperCase());
      }
      // highlight button
      const button = document.querySelector(`[data-skbtn="${key.toUpperCase()}"]`);
      if (button) {
        button.classList.add('hg-activeButton');
        setTimeout(() => { button.classList.remove('hg-activeButton') }, 100);
      }
    }
  }

  return (
    <>
      <GameBoard input={input} tries={tries}></GameBoard>
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layoutName}
        onKeyPress={onKeyboardKeyPress}
        display={display}
        layout={layout}
      />
      <ModalResult roundResult={roundResult} word={word} isOpen={isModalOpen} pointDetails={pointDetails}/>
    </>
  );
}