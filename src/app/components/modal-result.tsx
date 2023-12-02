import { GameWord } from "../model/game-word";
import { PointDetails } from "../model/point-details";
import { RoundResult } from "../model/round-result";

type ModalResultProps = {
  roundResult: RoundResult,
  word: GameWord,
  isOpen: boolean,
  pointDetails?: PointDetails,
}

export default function ModalResult({roundResult, word, isOpen, pointDetails }: ModalResultProps) {
  return (
    <dialog id="modalResult" className="modal" open={isOpen}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{(roundResult === RoundResult.WIN) ? 'Bravo !' : 'Dommage !'}</h3>
        <p className={`py-2 ${(isOpen && pointDetails) ? '' : 'hidden'}`}>{(isOpen && pointDetails) ? `Votre score : ${pointDetails.nbPointsSpeed + pointDetails.nbPointsTries}`: ''}</p>
        <p className={`py-2 ${(isOpen && pointDetails) ? '' : 'hidden'}`}>{(isOpen && pointDetails) ? `Détail du score :`: ''}</p>
        <p className={`py-2 ${(isOpen && pointDetails) ? '' : 'hidden'}`}>{(isOpen && pointDetails) ? `Score de vitesse: ${pointDetails.nbPointsSpeed}`: ''}</p>
        <p className={`py-2 ${(isOpen && pointDetails) ? '' : 'hidden'}`}>{(isOpen && pointDetails) ? `Score de tentatives: ${pointDetails.nbPointsTries}`: ''}</p>
        <p className={`pt-4 pb-2 ${(isOpen) ? '' : 'hidden'}`}>{(isOpen) ? `Le mot était : ${word.lexeme}` : ''}</p>
        <p className={`py-2 ${(isOpen) ? '' : 'hidden'}`}>{(isOpen) ? `Définition : ${word.definition}`: ''}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}