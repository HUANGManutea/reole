export type GameCellProps = {
  lineIndex: number,
  cellIndex: number,
  value: string
}

export default function GameCell({ lineIndex, cellIndex, value }: GameCellProps) {
  return <div id={`cell-${lineIndex}-${cellIndex}`} className="h-16 aspect-square text-xl text-bold text-center border text-white flex flex-col items-center justify-center"><span>{value}</span></div>;
}