import "./PokeCarta.css";
import { getTypeColor } from "../../utils/pokemonTypeColor";
interface pokeDatos {
    nombre?: string;
    imagen?: any;
    types: any[];
    id: number
}

function PokeCarta({ nombre, imagen, types , id}: pokeDatos) {
    return (
            <div className="pokedex-container">
                <div className="pokemon-card " style={{ backgroundColor: getTypeColor(types[0].type.name) }}>
                    <div className="info">
                        <span className="number"><h6>#0{id}</h6></span>
                        <p className="name">{nombre}</p>
                        <div className="kinds">
                        <ul className="ulTipo">
                            {types.map((type, i) => (
                                <li
                                    className="liTipo"
                                    key={i}
                                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                                >
                                    {type.type.name}
                                </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    <div className="image">
                        <img src={imagen} alt="pokemon"/>
                    </div>
                </div>
                
            </div>

    );
}

export default PokeCarta;
