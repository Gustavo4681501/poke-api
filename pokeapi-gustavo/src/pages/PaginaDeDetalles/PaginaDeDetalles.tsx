import "./PaginaDeDetalles.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokeId, getEvolutionChain } from "../../Api/PokeApi";
import PokeCarta from "../../components/PokeCarta/PokeCarta";
import { getTypeColor, getBackground } from "../../utils/pokemonTypeColor";
import PokeDetallesCard from "../../components/PokeDetallesCard/PokeDetallesCard";
function PaginaDeDetalles() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [poke, setPoke] = useState<any>();
  const [pokeCadena, setPokeCadena] = useState<any[]>([]);
  function irInicio() {
    navigate("/");
  }

  async function obtienePokeId() {
    const pokeData: any = await getPokeId(id);
    setPoke(pokeData);
    console.log("pokeeeeeeeeeeeeeeeeeeeee", poke);
    return pokeData;
  }

  async function obtienePokeCadena() {
    const pokeDataCadena: any = await getEvolutionChain(id);
    setPokeCadena(pokeDataCadena);
    console.log("chainnnnnnnnnnnnnnnnnnnnnnnnnnnnn", pokeCadena);

    return pokeDataCadena;
  }

  useEffect(() => {
    obtienePokeId();
    obtienePokeCadena();
  }, [id]);

  function irADetalles(id: number) {
    navigate("/pokemon/" + id);
  }

  return (
    <div className="contienePokeID">
      <button onClick={irInicio} id="BtnSeguir">
        <span id="spanSeguir">back</span>
      </button>
      {poke && (
        <div>
          <PokeDetallesCard
            name={poke.name}
            id={poke.id}
            img={poke.sprites.other["official-artwork"].front_default}
            types={poke.types}
            height={poke.height}
            weight={poke.weight}
            hp={poke.stats[0].base_stat}
            attack={poke.stats[1].base_stat}
            defense={poke.stats[2].base_stat}
            specialAtt={poke.stats[3].base_stat}
            specialDef={poke.stats[4].base_stat}
            speed={poke.stats[5].base_stat}
          ></PokeDetallesCard>
          <div className="pokeCarta ">
            {pokeCadena &&
              pokeCadena.map((pokeData, i) => (
                <div
                  key={i}
                  onClick={() => {
                    irADetalles(pokeData.id);
                  }}
                >
                  <PokeCarta
                    nombre={pokeData.name}
                    imagen={
                      pokeData.sprites.other["official-artwork"].front_default
                    }
                    types={pokeData.types}
                    id={pokeData.id}
                  ></PokeCarta>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaDeDetalles;
