export default function ModalPrivacy() {
  return (
    <dialog id="modalPrivacy" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Politique de confidentialité</h3>
        <p className="py-2">Ce site ne stocke aucune donnée.</p>
        <p className="py-2">Il n'y a pas de compte, pas de données envoyées à un serveur tiers.</p>
        <p className="py-2">Et c'est tout.</p>
        <p className="py-2">Si vous voulez garder une trace de votre score, prenez soin de faire des captures d'écran.</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}