import "./PaginaPrincipal.css";
import PokeCarta from "../../components/PokeCarta/PokeCarta";

import { getPokemon, getNav, getPokeName } from "../../Api/PokeApi";
import BtnNavegacion from "../../components/BtnNavegacion/BtnNavegacion";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";

function PaginaPrincipal() {

    const [pokemon, setPokemon] = useState<any[]>([]);
    const [pokeLista, setPokeLista] = useState<any[]>([]);
    const [nav, setNav] = useState<any[]>([]);
    const [loadin, setLoadin] = useState<boolean>(false);
    const [verPoke, setVerPoke] = useState<any>()
    const [pokeInput, setPokeInput] = useState<string>("");

    const pokeSet = (event: any) => {
        setPokeInput(event.target.value);
    };

    const navigate = useNavigate();

    async function cambiaURLNext() {
        if (nav[0] && !loadin) {
            setLoadin(true)
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxx", nav)
            const pokeData: any = await getNav(nav[0]);
            console.log(pokeData.next);
            setPokemon(pokeData.results);
            setNav([pokeData.next, pokeData.previous]);
        }

    }

    async function cambiaURLPrevious() {
        if (nav[1] && !loadin) {
            setLoadin(true)
            const pokeData: any = await getNav(nav[1]);
            console.log(pokeData.previous);
            setPokemon(pokeData.results);
            setNav([pokeData.next, pokeData.previous]);
            console.log("previoussssssssssssssssssssssss", pokeData.previous);
        }
    }

    async function buscador(event: any) {
        event.preventDefault();
        if (pokeInput === "") {
            getPokeName(pokeInput);
        } else {
            const pokeSearch = await getPokeName(pokeInput);
            let auxpoke = [];

            if (pokeSearch.name || pokeSearch.id === pokeInput) {
                auxpoke.push(pokeSearch);
            }
            setVerPoke(pokeSearch);
            setPokeInput("");
            console.log("---------------------------", auxpoke);
        }
    }

    async function obtieneResults() {
        const pokeData: any = await getPokemon();
        console.log("pokedataaaaaaaaaaaaaaaaa", pokeData);
        console.log(pokeData.results);
        setPokemon(pokeData.results);
        setNav([pokeData.next, pokeData.previous]);
        console.log(nav);
        return pokeData;
    }

    useEffect(() => {
        obtieneResults();

    }, []);

    useEffect(() => {
        // for (let i = 0; i < pokemon.length; i++) {
        //     console.log(pokemon[i]?.url);
        // }

        async function loadPokemon() {
            let pokeArreglo = [];
            for (let i = 0; i < pokemon.length; i++) {
                let pokePromesa = await fetch(pokemon[i]?.url);
                let data = await pokePromesa.json();
                pokeArreglo[i] = data;
            }
            setPokeLista(pokeArreglo);
            setLoadin(false);
        }
        loadPokemon();
    }, [pokemon]);


    // useEffect(() => {

    //     document.addEventListener("keyup", detectarKeyUp)
    //     console.log("aa")
    //     return ()=>{document.removeEventListener("keyup", detectarKeyUp)}
    // }, [pokemon]);

    // async function detectarKeyUp (e:any) {
    //     e.preventDefault();
    //     if(e.keyCode===39){
    //         cambiaURLNext();
    //     }else if(e.keyCode===37){
    //         cambiaURLPrevious()
    //     }

    // }

    function irADetalles(id: number) {
        navigate("/pokemon/" + id);
    }




    return (
        <div className="divPadre">
            <SearchBar
                pokeInput={pokeInput}
                pokeSet={pokeSet}
                buscador={buscador}
            ></SearchBar>
            {verPoke && <div
                onClick={() => {
                    irADetalles(verPoke.id);
                }}
            >
                <PokeCarta
                    nombre={verPoke.name}
                    imagen={verPoke.sprites.other["official-artwork"].front_default}
                    types={verPoke.types}
                    id={verPoke.id}
                ></PokeCarta></div>}
            <ul id="pokeContainer">
                {pokeLista.map((poke, i) => (
                    <li
                        className="pokeLi"
                        key={i}
                        onClick={() => {
                            irADetalles(poke.id);
                        }}
                    >
                        <PokeCarta
                            nombre={poke.name}
                            imagen={poke.sprites.other["official-artwork"].front_default}
                            types={poke.types}
                            id={poke.id}
                        ></PokeCarta>
                    </li>
                ))}
            </ul>

            <BtnNavegacion
                cambiaURLNext={cambiaURLNext}
                cambiaURLPrevious={cambiaURLPrevious}
                urlestado={nav}

            ></BtnNavegacion>
            <br />
        </div>
    );
}

export default PaginaPrincipal;
