'use client'
function TopCityButton({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Delhi",
    },
    {
      id: 2,
      title: "Goa",
    },
    {
      id: 3,
      title: "Karnataka",
    },
    {
      id: 4,
      title: "Tokyo",
    },
    {
      id: 5,
      title: "England",
    },
  ];

  return (
    <div className="flex items-center justify-around gap:9px md:my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-sm  md:text-[1.5rem] md:font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopCityButton;