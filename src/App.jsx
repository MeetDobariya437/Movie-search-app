import './App.css';
import './index.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=9367f377&s=${query}`);
      const data = await res.json();

      if (data.Response === 'False') {
        setErr('Movie not found.');
        setMovie([]);
      } else {
        setMovie(data.Search);
      }
    } catch (err) {
      setErr('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (m) => {
    const exists = favorites.some((fav) => fav.imdbID === m.imdbID);
    if (!exists) {
      const updated = [...favorites, m];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10 relative font-sans">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 drop-shadow-md">
        🎬 Movie Search Portal
      </h1>

      {/* Floating Favorites Button with Count */}
      <div className="absolute top-6 right-6">
        <Link to="/fevorite">
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition font-semibold shadow-lg hover:shadow-pink-500/50">
            ❤️ Favorites
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
              {favorites.length}
            </span>
          </button>
        </Link>
      </div>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full max-w-md px-5 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
        >
          🔎 Search
        </button>
      </form>

      {/* Loading or Error Messages */}
      {loading && <p className="text-center text-yellow-400 text-lg mb-4">Searching...</p>}
      {err && <p className="text-center text-red-500 mb-4">{err}</p>}

      {/* Movie Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {movie.map((m) => (
          <div
            key={m.imdbID}
            className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-5 
              shadow-[0_4px_20px_rgba(255,0,150,0.2),_0_0_30px_rgba(99,102,241,0.15)] 
              transition-all duration-300 hover:scale-[1.03] 
              hover:shadow-[0_8px_40px_rgba(255,0,150,0.35),_0_0_50px_rgba(99,102,241,0.25)] 
              min-h-[420px]"
          >

            <img 
              src={ m.Poster} 
              alt={m.Title}
              className="w-40 h-60 object-cover mb-4 rounded-xl shadow-md"
            />
            <p className="text-lg font-semibold text-center mb-1">{m.Title}</p>
            <p className="text-sm text-gray-400 mb-4">({m.Year})</p>
            <button
              className="mt-auto px-5 py-1.5 rounded-full border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition font-medium text-sm shadow-md hover:shadow-pink-400/30"
              onClick={() => addToFavorites(m)}
            >
              ❤️ Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
