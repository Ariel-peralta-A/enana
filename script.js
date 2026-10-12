
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const simbolos = ["<", ">", "/", "{", "}", ";", "01", "♥"];
const fuente = 15;
const anchoColumna = 35;

let columnas = 0;
let gotas = [];

function ajustarCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columnas = Math.ceil(window.innerWidth / anchoColumna);

    gotas = Array.from(
        { length: columnas },
        () => Math.random() * -40
    );
}

function dibujar() {
    ctx.clearRect(
        0, 0, window.innerWidth, window.innerHeight
    );

    ctx.font = `${fuente}px monospace`;

    for (let i = 0; i < columnas; i++) {
        const simbolo =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        const x = i * anchoColumna;
        const y = gotas[i] * fuente;

        ctx.fillStyle = Math.random() > 0.85
            ? "rgba(255, 105, 180, 0.65)"
            : "rgba(180, 90, 140, 0.22)";

        ctx.fillText(simbolo, x, y);

        if (y > window.innerHeight && Math.random() > 0.98) {
            gotas[i] = -Math.random() * 20;
        } else {
            gotas[i] += 0.25;
        }
    }

    requestAnimationFrame(dibujar);
}

window.addEventListener("resize", ajustarCanvas);

ajustarCanvas();
dibujar();
