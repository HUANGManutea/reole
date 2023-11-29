export default function ModalPrivacy() {
  return (
    <dialog id="modalPrivacy" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Politique de confidentialité</h3>
        <p className="py-4">Lorem Ipsum</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}