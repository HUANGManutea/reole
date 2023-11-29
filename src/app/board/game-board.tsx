'use client';

import { useState } from "react";
import GameLine from "./game-line";

type GameBoardProps = {
  input: string[],
  tries: string[][]
}

export default function GameBoard({input, tries}: GameBoardProps) {

  return (
    <div className="grid grid-rows-6">
      {tries.map((t, i) => <GameLine key={`line-${i}`} lineIndex={i} valueLine={t}></GameLine>)}
    </div>
  );
}