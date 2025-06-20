import React, { useState, useEffect, useMemo } from 'react'

import "./App.css"

function PoliticianCard({ name, image, position, biography }) {
  console.log("Card")
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{position}</p>
      <p>{biography}</p>
    </div>
  );
}

const MemoPoliticianCard = React.memo(PoliticianCard); // Quando vogliamo avere entrambe le versioni e non solo quella "memoizata", 
// altrimenti si può passare direttamente a PoliticianCard

function App() {

  const [politicians, setPoliticians] = useState([]);

  const [search, setSearch] = useState('');


  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then((response) => response.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error(error));
  }, []);


  const handleChange = (event) => {
    setSearch(event.target.value);
  };


  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const isNameIncluded = politician.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const isBioIncluded = politician.biography
        .toLowerCase()
        .includes(search.toLowerCase());
      return isNameIncluded || isBioIncluded;
    });
  }, [politicians, search]);


  return (
    <>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Cerca per nome o biografia"
      />

      <h1>Lista Politici</h1>
      <div className="politicians-list">
        {filteredPoliticians.map((politician) => (
          <MemoPoliticianCard key={politician.id} {...politician} />
        ))}
      </div>
    </>
  );
}


export default App;