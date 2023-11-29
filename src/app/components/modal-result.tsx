import { GameWord } from "../model/game-word";
import { RoundResult } from "../model/round-result";

type ModalResultProps = {
  roundResult: RoundResult,
  word: GameWord,
  isOpen: boolean;
}

export default function ModalResult({roundResult, word, isOpen }: ModalResultProps) {
  return (
    <dialog id="modalResult" className="modal" open={isOpen}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{(roundResult === RoundResult.WIN) ? 'Bravo !' : 'Dommage !'}</h3>
        <p className="py-4">{(roundResult === RoundResult.WIN) ? `Le mot était : ${word.lexeme}` : ''}</p>
        <p className="py-4">{(roundResult === RoundResult.WIN) ? `Définition : ${word.definition}`: ''}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}