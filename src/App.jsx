import { useState, useEffect, useMemo } from 'react'

import "./App.css"

function App() {

  const [politicians, setPoliticians] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(response => response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))

  }, []);


  const handleChange = (event) => {
    setSearch(event.target.value);
  };


  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isNameIncluded = politician.name.toLowerCase().includes(search.toLowerCase())
      const isBioIncluded = politician.biography.toLowerCase().includes(search.toLowerCase())
      return isNameIncluded || isBioIncluded;
    })
  }, [politicians, search])

  return (
    <>
      <input type="text" value={search} onChange={handleChange} />

      <h1>Lista Politici</h1>
      <div className="politicians-list">
        {filteredPoliticians.map((politician) =>
          <div className="card" key={politician.id}>
            <img src={politician.image} alt={politician.name} />
            <h2>{politician.name}</h2>
            <p>{politician.position}</p>
            <p>{politician.biography}</p>
          </div>)}
      </div>
    </>
  )

}

export default App
