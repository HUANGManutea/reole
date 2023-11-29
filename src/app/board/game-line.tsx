'use client';

import GameCell from "./game-cell";

type GameLineProps = {
  lineIndex: number,
  valueLine : Array<string>,
}

export default function GameLine({lineIndex, valueLine}: GameLineProps) {
  return (
    <div className="grid grid-cols-5">
      {valueLine.map((v, i) => <GameCell key={`${lineIndex}-${i}`} value={v} lineIndex={lineIndex} cellIndex={i}></GameCell>)}
    </div>
  );
}