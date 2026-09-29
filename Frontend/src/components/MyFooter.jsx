import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import Logo from "./ui/Logo";

const USEFUL_LINKS = [
  { to: "/about", label: "Chi siamo" },
  { to: "/contact", label: "Contattaci" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/faq", label: "FAQ" },
];

const EXPLORE_LINKS = [
  { to: "/locations", label: "Location pet-friendly" },
  { to: "/register", label: "Diventa host" },
  { to: "/login", label: "Accedi" },
];

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://twitter.com", label: "X (Twitter)", Icon: FaXTwitter },
  { href: "https://github.com", label: "GitHub", Icon: FaGithub },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-white/60 no-underline transition-colors hover:text-sun">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MyFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-cocoa text-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Viaggia senza pensieri insieme al tuo fedele amico a quattro zampe.
            </p>
          </div>

          <FooterColumn title="Link utili" links={USEFUL_LINKS} />
          <FooterColumn title="Esplora" links={EXPLORE_LINKS} />

          <div>
            <h2 className="text-sm font-semibold text-white">Seguici</h2>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-white/80 transition hover:-translate-y-0.5 hover:bg-sun hover:text-cocoa"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} PetBnb. Tutti i diritti riservati.</p>
          <p>Fatto con cura per chi viaggia con un animale.</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.24em] text-center font-display text-[21vw] leading-none font-extrabold tracking-[-0.06em] text-white/[0.05] select-none"
      >
        PetBnb
      </p>
    </footer>
  );
}

export default MyFooter;
