//URL de los pokemons del API
const urlPokeApi = "https://pokeapi.co/api/v2/pokemon/"

//Funcion para obtener los pokemones del api
export async function getPokemon() {
    const llamadoApi = await fetch(urlPokeApi);
    const data = await llamadoApi.json();

    return data
}

export async function getNav(url){
    const llamadoApi = await fetch(url);
    const data = await llamadoApi.json();

    return data
}

export async function getPokeId(id){
    const llamadoApi = await fetch(urlPokeApi+id);
    const data = await llamadoApi.json();

    return data
}

export async function getPokeName(name){
    const llamadoApi = await fetch(urlPokeApi+name);
    const data = await llamadoApi.json();

    return data
}

function getEvolution(list, chain) {
    if (chain.evolves_to.length > 0) {
        for (let index = 0; index < chain.evolves_to.length; index++) {
            const evolution = chain.evolves_to[index];
            list.push(evolution.species.name);
            getEvolution(list, evolution)
        }
    }
    return list;
}

export async function getEvolutionChain(pokemonId) {

    try {

        //Get the species
        const pokemonSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonId);
        const pokemonSpeciesData = await pokemonSpecies.json();
        if (!pokemonSpeciesData?.evolution_chain) {
            return [];
        }
        console.log("Especie", pokemonSpeciesData)

        //Get the evolution
        const requestPokemon = await fetch(pokemonSpeciesData.evolution_chain.url);
        const pokemonData = await requestPokemon.json();

        var evolutionList = [pokemonData.chain.species.name];

        getEvolution(evolutionList, pokemonData.chain)

        console.log("Nombres Evoluciones", evolutionList)


        //Get the images
        var evolutionListData = [];

        for (let index = 0; index < evolutionList.length; index++) {
            const evolution = evolutionList[index];
            const requestPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + evolution);
            const evolutionData = await requestPokemon.json();
            evolutionListData.push(evolutionData);
        }


        console.log("Data Evoluciones", evolutionListData)

        return evolutionListData;

    } catch (error) { //Se ejecuta si hubo algun error
        console.error("Hubo un error al llamar al api")
        return []
    }

}

