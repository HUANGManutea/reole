'use client';

import { faRankingStar, faGear, faCircleQuestion, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPrivacy from "./modal-privacy";
import ModalTuto from "./modal-tuto";
import Link from "next/link";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";

type PageContainerProps = {
  children: React.ReactNode
}

export default function PageContainer({children} : PageContainerProps) {

  const openModal = (id: string) => {
    if (document) {
      const element: HTMLElement | null = document.getElementById(id);
      if (element) {
        const modal: HTMLDialogElement = element as HTMLDialogElement;
        modal.showModal();
      }
    }
  }

  return(
    <>
    <div className="drawer">
    <input id="sideDrawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      {/* Navbar */}
      <div className="w-full navbar bg-base-300 flex flex-row justify-between p-0 sm:p-2 min-h-0">
        <div className="sm:flex-1">
          <label htmlFor="sideDrawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <Link className="sm:flex-1 btn btn-ghost text-xl text-primary" href={'/'}>REOLE</Link>
        <div className="sm:flex-1 sm:flex sm:flex-row sm:justify-end">
          <ul className="menu menu-horizontal sm:gap-2">
            <button className="btn btn-ghost tooltip tooltip-bottom" onClick={() => openModal('modalTuto')} data-tip="comment jouer?"><FontAwesomeIcon icon={faCircleQuestion} /></button>
            <button className="btn btn-ghost tooltip tooltip-left" onClick={() => openModal('modalPrivacy')} data-tip="politique de confidentialité"><FontAwesomeIcon icon={faShieldHalved} /></button>
          </ul>
        </div>
      </div>
      {children}
    </div>
    <div className="drawer-side">
      <label htmlFor="sideDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex flex-col w-80 min-h-full bg-base-200 p-4 text-justify gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">A propos</h2>
          <p>La création de ce site a nécessité l&apos;utilisation de l&apos;appplication mobile Reo. (<Link href="https://play.google.com/store/apps/details?id=pf.culture.sti.reo&hl=ln" className="underline text-primary">Play store</Link>/<Link href="https://apps.apple.com/fr/app/reo/id1245650858" className="underline text-primary">App store</Link>)</p>
          <p>Il n&apos;y a pas d&apos;affiliations avec Reo, mais j&apos;en ai eu grandement besoin, et je remercie les créateurs de cette application sans quoi j&apos;aurai pris beaucoup plus de temps.</p>
          <p>Les icônes proviennent de <Link href="https://fontawesome.com/" className="underline text-primary">Font Awesome</Link>.</p>
          <p>Le nom "REOLE" est un jeux de mot entre "reo" et <Link href="https://www.nytimes.com/games/wordle/index.html" className="underline text-primary">Wordle</Link>, dont ce site s&apos;inspire très fortement.</p>
          <p>Ce site n&apos;a aucun but lucratif. Il est hébergé à titre gracieux et libre d&apos;utilisation.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Contact</h2>
          <p><Link href="https://github.com/HUANGManutea" className="underline text-primary"><FontAwesomeIcon icon={faGithub} /> Github: HUANGManutea</Link></p>
          <p><Link href="https://twitter.com/HManutea" className="underline text-primary"><FontAwesomeIcon icon={faXTwitter} /> X/Twitter: HManutea</Link></p>
        </div>
      </div>
    </div>
  </div>
  <ModalPrivacy />
  <ModalTuto />
  </>
    
  );
}