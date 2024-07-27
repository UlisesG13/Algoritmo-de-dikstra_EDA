import LinkedList from './LinkedList.mjs';
import Bus from './Bus.mjs';

export class Grafo {
  #matrizAdyacencia = [];
  #map = new Map();
  #matrizAristas = [];

  constructor() { }

  addVertices(...vertices) {
    for (let value of vertices) {
      this.#matrizAdyacencia.push(new LinkedList());
      this.#map.set(value, this.#matrizAdyacencia.length - 1);
    }
  }

  addV(value) {
    this.#matrizAdyacencia.push(new LinkedList());
    this.#map.set(value, this.#matrizAdyacencia.length - 1);
  }

  printMatrizAristas() {
    console.log("#matrizAristas:");
    for (let i = 0; i < this.#matrizAristas.length; i++) {
      if (this.#matrizAristas[i]) {
        console.log(`${Array.from(this.#map.keys())[i]}: ${this.#matrizAristas[i].join(" ")}`);
      } else {
        console.log(`${Array.from(this.#map.keys())[i]}: []`);
      }
    }
  }

  getSize() {
    return this.#matrizAdyacencia.length;
  }

  addConexion(start, end, weight = 1) {
    if (this.#map.has(start) && this.#map.has(end)) {
      this.#matrizAdyacencia[this.#map.get(start)].push(end, weight);
      if (!this.#matrizAristas[this.#map.get(start)]) {
        this.#matrizAristas[this.#map.get(start)] = new Array(this.#matrizAdyacencia.length).fill(0);
      }
      if (!this.#matrizAristas[this.#map.get(end)]) {
        this.#matrizAristas[this.#map.get(end)] = new Array(this.#matrizAdyacencia.length).fill(0);
      }
      this.#matrizAristas[this.#map.get(start)][this.#map.get(end)] = weight;
      this.#matrizAristas[this.#map.get(end)][this.#map.get(start)] = weight;
      return true;
    }
    return false;
  }

  bfs(callback) {
    let queue = [];
    let list = [];
    const entries = [...structuredClone(this.#map)];
    for (let i = 0; i < this.#matrizAdyacencia.length; i++)
      list[i] = false;

    let [key] = entries[0];
    queue.push(key);

    while (queue.length > 0) {
      let val = queue.shift();
      callback(val);
      list[this.#map.get(val)] = true;
      const neighbors = this.#matrizAdyacencia[this.#map.get(val)].iterator();
      for (const neighbor of neighbors) {
        if (!list[this.#map.get(neighbor.cityName)] && !queue.includes(neighbor.cityName))
          queue.push(neighbor.cityName);
      }
    }
  }

  busquedaProfundidad(callback) {
    let pila = [];
    let lista = [];
    const entries = [...structuredClone(this.#map)];
    for (let i = 0; i < this.#matrizAdyacencia.length; i++)
      lista[i] = false;
    let [indexCero] = entries[0];
    pila.push(indexCero);
    while (pila.length > 0) {
      let val = pila.pop();
      if (!lista[this.#map.get(val)]) {
        callback(val);
        lista[this.#map.get(val)] = true;
        const vecinosEncontrados = this.#matrizAdyacencia[this.#map.get(val)].iterator();
        for (let i = vecinosEncontrados.length - 1; i >= 0; i--) {
          let vecino = vecinosEncontrados[i].cityName;
          if (!lista[this.#map.get(vecino)])
            pila.push(vecino);
        }
      }
    }
  }

  dijkstra(start, end, callback) {
    const distances = new Map();
    const previousVertices = new Map();
    const visitedVertices = new Set();
    const priorityQueue = [];

    for (const vertex of this.#map.keys()) {
      distances.set(vertex, Infinity);
      previousVertices.set(vertex, null);
    }
    distances.set(start, 0);

    priorityQueue.push({ vertex: start, distance: 0 });

    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.distance - b.distance);
      const { vertex: currentVertex, distance: currentDistance } = priorityQueue.shift();

      if (visitedVertices.has(currentVertex)) {
        continue;
      }

      visitedVertices.add(currentVertex);

      if (currentVertex === end) {
        break;
      }

      const neighbors = this.#matrizAdyacencia[this.#map.get(currentVertex)].iterator();
      for (const neighbor of neighbors) {
        const alt = currentDistance + neighbor.distance;
        if (alt < distances.get(neighbor.cityName)) {
          distances.set(neighbor.cityName, alt);
          previousVertices.set(neighbor.cityName, currentVertex);
          priorityQueue.push({ vertex: neighbor.cityName, distance: alt });
        }
      }
    }

    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = previousVertices.get(current);
    }

    // Llamar al callback con los resultados
    callback({
      distance: distances.get(end),
      path
    });
  }

}

export default Grafo;
