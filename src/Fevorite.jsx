import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Fevorite() {
  const [favList, setFavList] = useState([]);
  const [fadingIds, setFadingIds] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavList(favs);
  }, []);

  const removeFromFav = (movieToRemove) => {
    const id = movieToRemove.imdbID;
    setFadingIds((prev) => [...prev, id]);

    setTimeout(() => {
      const updated = favList.filter((fav) => fav.imdbID !== id);
      setFavList(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFadingIds((prev) => prev.filter((f) => f !== id));
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-md">
          ❤️ Your Favorite Movies
        </h2>
        <Link to="/">
          <button className="px-5 py-2 rounded-full bg-white/10 border border-indigo-500 text-indigo-300 hover:bg-indigo-600 hover:text-white shadow-md transition font-medium">
            ⬅ Back to Search
          </button>
        </Link>
      </div>

      {/* Empty State */}
      {favList.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-24">
          <p>No favorites added yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Search and tap ❤️ to save your favorite movies.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favList.map((m) => {
            const isFading = fadingIds.includes(m.imdbID);

            return (
              <div
                key={m.imdbID}
                className={`flex flex-col items-center bg-white/10 backdrop-blur-lg p-5 rounded-3xl border border-white/10 
                  shadow-[0_4px_20px_rgba(255,0,150,0.2),_0_0_30px_rgba(99,102,241,0.15)] 
                  transition-all duration-400 ease-in-out transform
                  hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(255,0,150,0.35),_0_0_50px_rgba(99,102,241,0.25)]
                  min-h-[420px] ${isFading ? "opacity-0 scale-90 pointer-events-none" : ""}`}
              >
                <img
                  src={
                    m.Poster !== "N/A"
                      ? m.Poster
                      : "https://via.placeholder.com/150x220?text=No+Image"
                  }
                  alt={`${m.Title} poster`}
                  className="mb-4 w-40 h-60 object-cover rounded-xl shadow-md"
                />
                <p className="text-center text-lg font-semibold mb-1">{m.Title}</p>
                <p className="text-sm text-gray-400 mb-4">({m.Year})</p>
                <button
                  onClick={() => removeFromFav(m)}
                  className="mt-auto px-5 py-1.5 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition font-medium text-sm shadow-sm hover:shadow-red-500/30"
                >
                  🗑 Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Fevorite;
