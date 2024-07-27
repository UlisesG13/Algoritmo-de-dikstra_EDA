    import Grafo from "../models/Grafo.mjs";

    const EstacionMap = new Grafo();

    const agregarBtton = document.getElementById('newCuidad_button');
    agregarBtton.addEventListener('click', () => {
        const cityNameInput = document.getElementById('newCuidad_input');
        const cityName = cityNameInput.value.trim();

        if (!verificarCampoVacio(cityName, 'Nombre de la cuidad')) {
            return;
        }

        EstacionMap.addV(cityName);
        swal("Cuidad agregada con éxito");
        console.log(`Vértice agregado: ${cityName}`);
        limpiarInput(cityNameInput);
    });

        const agregarAristaBtton = document.getElementById('agregarAristaBtn');
        agregarAristaBtton.addEventListener('click', () => {
        const PuntoAInput = document.getElementById('PuntoInicio_input');
        const PuntoBInput = document.getElementById('PuntoFinal_input');
        const PesoInput = document.getElementById('distanciaEntreVertices_input');

        const PuntoA = PuntoAInput.value.trim();
        const PuntoB = PuntoBInput.value.trim();
        const Peso = parseInt(PesoInput.value);

        if (!verificarCampoVacio(PuntoA, 'Punto Inicial') ||
            !verificarCampoVacio(PuntoB, 'Punto Final') ||
            isNaN(Peso)) {
            return;
        }

        EstacionMap.addConexion(PuntoA, PuntoB, Peso);
        EstacionMap.printMatrizAristas()
        swal("Distancia agregada con éxito");
        console.log(`Arista de ${PuntoA} a ${PuntoB} con peso ${Peso}`);
        limpiarInput(PuntoAInput);
        limpiarInput(PuntoBInput);
        limpiarInput(PesoInput);
    });

    const recorridoProfundidad = document.getElementById('recorridoProfundidadBtn');
    recorridoProfundidad.addEventListener('click', () => {
        if(EstacionMap.getSize!=0){
        const recorrido = [];
        EstacionMap.busquedaProfundidad((callback) => {
            recorrido.push(callback);
            console.log(callback);
            swal(recorrido.join());
        });
        } else {
            swal ("Lista vacia!")
        }
    });

    const buscarRutaMasCorta = document.getElementById('buscarRutaMasCorta_Btn');
    buscarRutaMasCorta.addEventListener('click', () => {
        if(EstacionMap.getSize!=0){
        if (EstacionMap.getSize>0){}
        const puntoAinput = document.getElementById('puntoInicioRuta_input');
        const puntoBinput = document.getElementById("puntoFinalRuta_input")
        let puntoA = puntoAinput.value.trim();
        let puntoB = puntoBinput.value.trim();

        if (!verificarCampoVacio(puntoA, 'Punto A') || !verificarCampoVacio(puntoB, 'Punto A')){
            return;
            }
            puntoA = puntoA.toString();
            puntoB = puntoB.toString();

            EstacionMap.dijkstra(puntoA, puntoB, ({ distance, path }) => {
                let mensaje = `Caminos más cortos desde ${puntoA} a ${puntoB}\n`;
                mensaje += `Distancia: ${distance} km\n`;
                mensaje += `Ruta: ${path.join(' -> ')}\n`;
                swal(mensaje);
            });
        } else {
            swal ("Lista vacia!")
        }
    });
    

    const verificarCampoVacio = (valor, mensaje) => {
        if (!valor) {
            swal(`¡Error! ${mensaje} no puede estar vacío.`);
            return false;
        }
        return true;
    };

    const limpiarInput = (inputElement) => {
        inputElement.value = '';
    };
