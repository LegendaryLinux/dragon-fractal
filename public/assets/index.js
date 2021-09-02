let canvasElement = null;

const initFractal = () => {
    if (canvasElement) { document.body.removeChild(canvasElement); }

    // Setup canvas element and context
    canvasElement = document.createElement('canvas');
    canvasElement.setAttribute('id', 'dragon-canvas')
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    document.body.appendChild(canvasElement);

    // Draw the curve
    drawDragonCurve(canvasElement);
};

window.addEventListener('load', initFractal);
window.addEventListener('resize', initFractal);
