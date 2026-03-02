import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-pink-100"></div>

      {/* Gradient overlay glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.25),transparent_40%)]"></div>

      {/* Content */}
      <div className="relative max-w-4xl text-center backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-10 md:p-14">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-600 rounded-full shadow-sm">
          🐾 La nuova casa per i tuoi pet
        </div>

        {/* Titolo */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Benvenuto su <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">PetBnb</span>
        </h1>

        {/* Divider */}
        <div className="mt-6 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"></div>

        {/* Sottotitolo */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Trova o offri ospitalità sicura e amorevole per i tuoi amici a quattro zampe. Una community moderna pensata per chi ama davvero gli animali.
        </p>

        {/* Bottoni */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-decoration-none"
          >
            Registrati
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold bg-white/70 backdrop-blur hover:bg-white hover:scale-105 transition-all duration-300 text-decoration-none"
          >
            Accedi
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-gray-400">
          ❤️ Più di <span className="font-semibold text-gray-600">1000 pet lovers</span> già nella community
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
