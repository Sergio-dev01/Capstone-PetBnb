import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { PET_PHOTOS } from "../lib/images";

// La zampa del logo ricostruita con foto di animali: stesse proporzioni,
// stesso contorno cacao e la linguetta rossa sotto il cuscinetto.
const TOES = [
  { src: PET_PHOTOS.corgi, alt: "Corgi su sfondo arancione", left: "1.5%", top: "30.9%", depth: 26, delay: 0.35, tilt: -10 },
  { src: PET_PHOTOS.pug, alt: "Carlino su sfondo giallo", left: "19.6%", top: "1.6%", depth: 34, delay: 0.45, tilt: -6 },
  { src: PET_PHOTOS.mintCat, alt: "Gattino su sfondo menta", left: "52.9%", top: "1.6%", depth: 34, delay: 0.55, tilt: 6 },
  { src: PET_PHOTOS.terrier, alt: "Terrier su sfondo rosa", left: "71%", top: "30.9%", depth: 26, delay: 0.65, tilt: 10 },
];

const PAD_PATH =
  "M47,0 C63.9,0 70.5,14 74.3,30 C78,46 94,52 94,74 C94,92 81.8,100 66.7,100 C57.3,100 52.6,95.5 47,95.5 C41.4,95.5 36.7,100 27.3,100 C12.2,100 0,92 0,74 C0,52 16,46 19.7,30 C23.5,14 30.1,0 47,0 Z";

function Toe({ toe, pointerX, pointerY }) {
  const x = useTransform(pointerX, (v) => v * toe.depth);
  const y = useTransform(pointerY, (v) => v * toe.depth);

  return (
    <motion.div className="absolute aspect-square w-[27.3%]" style={{ left: toe.left, top: toe.top, x, y }}>
      <motion.div
        className="size-full overflow-hidden rounded-full bg-sun-soft shadow-lift ring-[5px] ring-cocoa sm:ring-[6px]"
        initial={{ scale: 0, rotate: toe.tilt * 2 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: toe.delay }}
        whileHover={{ scale: 1.06, rotate: toe.tilt }}
      >
        <img src={toe.src} alt={toe.alt} className="size-full object-cover" draggable={false} />
      </motion.div>
    </motion.div>
  );
}

export default function PawCollage() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 120, damping: 18 });
  const padX = useTransform(pointerX, (v) => v * 14);
  const padY = useTransform(pointerY, (v) => v * 14);

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      className="relative mx-auto aspect-[469/427] w-full max-w-[540px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Alone giallo dietro la zampa */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(255_193_7/0.35),transparent_68%)] blur-2xl"
      />

      {/* Cuscinetto */}
      <motion.div className="absolute" style={{ left: "24.3%", top: "38.4%", width: "51.2%", x: padX, y: padY }}>
        <motion.svg
          viewBox="-3 -3 100 111"
          className="block w-full overflow-visible drop-shadow-[0_28px_40px_rgb(31_8_2/0.28)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          role="img"
          aria-label="Bulldog francese con felpa gialla"
        >
          <defs>
            <clipPath id="paw-pad-clip">
              <path d={PAD_PATH} />
            </clipPath>
          </defs>
          <rect x="0" y="0" width="94" height="100" fill="#a9daf8" clipPath="url(#paw-pad-clip)" />
          <image
            href={PET_PHOTOS.frenchie}
            x="0"
            y="0"
            width="94"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#paw-pad-clip)"
          />
          <path d={PAD_PATH} fill="none" stroke="#1f0802" strokeWidth="3.4" strokeLinejoin="round" />

          {/* Linguetta del logo */}
          <motion.path
            d="M40.5,94 L53.5,94 L53.5,100 C53.5,104.5 50.6,107 47,107 C43.4,107 40.5,104.5 40.5,100 Z"
            fill="#ef4f2d"
            stroke="#1f0802"
            strokeWidth="2.6"
            strokeLinejoin="round"
            style={{ transformBox: "fill-box", originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 11, delay: 1.05 }}
          />
        </motion.svg>
      </motion.div>

      {TOES.map((toe) => (
        <Toe key={toe.alt} toe={toe} pointerX={pointerX} pointerY={pointerY} />
      ))}
    </div>
  );
}
