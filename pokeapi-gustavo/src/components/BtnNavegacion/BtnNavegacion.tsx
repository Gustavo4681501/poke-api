import "./BtnNavegacion.css"

interface pokeData {
    cambiaURLNext: any,
    cambiaURLPrevious: any,
    urlestado: any
}
function BtnNavegacion({ cambiaURLNext, cambiaURLPrevious, urlestado }: pokeData) {


    return (
        <div id="btnContainer">

            {urlestado[1] && <button onClick={cambiaURLPrevious} id="BtnSeguir">
                <span id="spanSeguir">Previous</span>
            </button>}

            {urlestado[0] && <button onClick={ cambiaURLNext}  id="BtnSeguir">
                <span id="spanSeguir">Next</span>
            </button>}

        </div>
    );
}

export default BtnNavegacion;
