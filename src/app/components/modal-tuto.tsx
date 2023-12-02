import GameCell from "../board/game-cell";

export default function ModalTuto() {
  return (
    <dialog id="modalTuto" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Comment jouer?</h3>
        <p className="py-2">Chaque jour, à partir de 8h00, vous devez deviner un mot aléatoire en tahitien, de 5 lettres.</p>
        <p className="py-2">Vous pouvez taper avec votre clavier, ou utiliser le clavier virtuel adapté à la langue tahitienne, tapez la touche &quot;entrée&quot; pour valider une tentative.</p>
        <p className="py-2">Au cas où, le &apos;eta est une consonne, et compte donc comme une lettre, le &apos;eta correspond à la touche &quot;apostrophe&quot; du clavier.</p>
        <p className="py-2">Vous avez 6 tentatives au total, vous gagnez si vous trouvez le mot en 6 tentatives ou moins.</p>
        <p className="py-2">Une fois la tentative validée, les cases seront colorés tels que:</p>
        <ul className="flex flex-col gap-2">
          <li>
            <div className="flex flex-row items-center gap-2">
              <div className="h-16 w-16 text-xl text-bold text-center border text-white flex flex-col items-center justify-center cell-correct"><span>A</span></div>
              <span>: la lettre est correctement positionnée</span>
            </div>
          </li>
          <li>
            <div className="flex flex-row items-center gap-2">
              <div className="h-16 w-16 text-xl text-bold text-center border text-white flex flex-col items-center justify-center cell-misplaced"><span>A</span></div>
              <span>: la lettre est mal positionnée</span>
            </div>
          </li>
          <li>
            <div className="flex flex-row items-center gap-2">
              <div className="h-16 w-16 text-xl text-bold text-center border text-white flex flex-col items-center justify-center"><span>A</span></div>
              <span>: la lettre n&apos;existe pas dans le mot</span>
            </div>
          </li>
        </ul>
        <p className="py-2">Les points sont calculés de la façon suivante:</p>
        <ul>
          <li>Plus vous répondez vite après que le mot soit généré, plus vous marquez de points.</li>
          <li>Moins vous faites de tentatives pour trouver le mot, plus vous marquez de points.</li>
        </ul>
        <p className="py-2">Fa&apos;aitoito !</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}