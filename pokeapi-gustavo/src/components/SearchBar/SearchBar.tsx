import "./SearchBar.css";
interface pokeData {
    pokeInput: any;
    pokeSet: any;
    buscador: any;
}
function SearchBar({pokeInput, pokeSet, buscador}:pokeData) {
    return (
        <div id="navBarContainer">
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img className="pokeImg" src="/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png" alt="PokedexLogo" />

                            <h1>Pokedex</h1>

                    </div>
                    <div className="d-flex">
                        <input
                            value={pokeInput}
                            onChange={pokeSet}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button onClick={buscador} className="btn btn-danger">Search</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default SearchBar;
