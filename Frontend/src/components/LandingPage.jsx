import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-block px-4 py-1 text-sm font-medium bg-indigo-100 text-indigo-600 rounded-full">La nuova casa per i tuoi pet 🐾</div>

        {/* Titolo */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Benvenuto su <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">PetBnb</span>
        </h1>

        {/* Sottotitolo */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Trova o offri ospitalità sicura e amorevole per i tuoi amici a quattro zampe. Una community pensata per chi ama gli animali.
        </p>

        {/* Bottoni */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
          >
            Registrati
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Micro trust line */}
        <p className="mt-8 text-sm text-gray-400">+1000 pet lovers già nella community ❤️</p>
      </div>
    </div>
  );
}

export default LandingPage;
