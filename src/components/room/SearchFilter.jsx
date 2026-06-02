import React from "react";

const SearchFilter = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4">

      <input
        type="text"
        placeholder="Search location..."
        className="border p-3 rounded-lg w-full"
      />

      <input
        type="number"
        placeholder="Max price"
        className="border p-3 rounded-lg w-full"
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
        Search
      </button>

    </div>
  );
};

export default SearchFilter;