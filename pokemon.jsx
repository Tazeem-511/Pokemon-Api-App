import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);

      const detailPokemonData = data.results.map(async (curPokem) => {
        const res = await fetch(curPokem.url);
        const data = await res.json();
        return data;
      });

      //   console.log(detailPokemonData);

      const detailedResponse = await Promise.all(detailPokemonData);

      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err)
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);


  if(loading) {
    return(
        <div>
            <h1>Loading....</h1>
        </div>
    )
  }

  if(error)
    {
      return(
          <div>
              <h1>{error.message}</h1>
          </div>
      )
    }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>

        <div>
          <ul className="cards">
            {pokemon.map((curPokem) => {
              return <PokemonCard key={pokemon.id} pokemonData={curPokem} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
