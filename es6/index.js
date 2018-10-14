window.onload = () => {
    // Setup canvas element and context
    let canvasElement = document.getElementById('dragon-canvas');
    canvasElement.width = 1280;
    canvasElement.height = 720;

    // Draw the curve
    drawDragonCurve(canvasElement);
};