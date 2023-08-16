import "./PokeDetallesCard.css";
import { getTypeColor } from "../../utils/pokemonTypeColor";
interface pokeDetalles {
  id:any;
  name: any;
  img: any;
  types:any[];
  height:any;
  weight:any;
  hp: any;
  attack: any; 
  defense: any;
  specialAtt: any;
  specialDef: any;
  speed: any;
}

function PokeDetallesCard({ id, name, img, types,height,weight, hp, attack, defense, specialAtt, specialDef, speed }: pokeDetalles) {
  return (
    <div className="detallesCard">
      
      <span className="number-pokemon">#0{id}</span>
      <main className="container main-pokemon">
        <div className="header-main-pokemon">
          <div className="container-img-pokemon">
            <img src={img} alt="pokemon"></img>
          </div>

          <div >
            <h1>{name}</h1>
            <div >
              <span className="sp-tp">
              {types.map((pokemon, i) => (
                      <div
                      className="tipoContainer text-center"
                        style={{
                          backgroundColor: getTypeColor(pokemon.type.name),
                          border: "black 2px solid",

                        }}
                        key={i}
                      >
                        {pokemon.type.name}

                      </div>
                    ))}
              </span>
            </div>
            <div className="info-pokemon">
              <div className="group-info">
                <p>Altura</p>
                <span>{height/10} m</span>
              </div>
              <div className="group-info">
                <p>Peso</p>
                <span>{weight/10} Kg.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-stats">
          <h1>Estadísticas</h1>
          <div className="stats">
            <div className="stat-group">
              <span>Hp</span>
              <progress className="bar" max="120" value={hp}> </progress>
              <span className="counter-stat">{hp}</span>
            </div>
            <div className="stat-group">
              <span>Attack</span>
              <progress className="bar" max="120" value={attack}> </progress>
              <span className="counter-stat">{attack}</span>
            </div>
            <div className="stat-group">
              <span>Defense</span>
              <progress className="bar" max="120" value={defense}> </progress>
              <span className="counter-stat">{defense}</span>
            </div>
            <div className="stat-group">
              <span>Special Attack</span>
              <progress className="bar" max="120" value={specialAtt}> </progress>
              <span className="counter-stat">{specialAtt}</span>
            </div>
            <div className="stat-group">
              <span>Special Defense</span>
              <progress className="bar" max="120" value={specialDef}> </progress>
              <span className="counter-stat">{specialDef}</span>
            </div>
            <div className="stat-group">
              <span>Speed</span>
              <progress className="bar" max="120" value={speed}> </progress>
              <span className="counter-stat">{speed}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PokeDetallesCard;
