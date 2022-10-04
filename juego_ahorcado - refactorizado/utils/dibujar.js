export const dibujarCirculo = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,25,0,2*3.14);
    ctx.stroke();

}

export const dibujarLinea = (ctx, inicialX, inicialY, finalX, finalY, color) => {
    ctx.beginPath();
    ctx.moveTo(inicialX,inicialY)
    ctx.lineTo(finalX,finalY);
    ctx.strokeStyle = color;
    ctx.stroke();
}

export const dibujarRectangulo = (ctx, x, y, base, altura, color) => {
    ctx.fillStyle=color;
    ctx.fillRect(x, y, base, altura);
}

export const dibujarOjosEnCruz = (ctx, xOjo1, yOjo1, xOjo2, yOjo2, color, largo) => {
    
    dibujarLinea(ctx, xOjo1, yOjo1, xOjo1 + largo, yOjo1 +largo, color);
    dibujarLinea(ctx, xOjo1 + largo, yOjo1, xOjo1, yOjo1 +largo, color);
    dibujarLinea(ctx, xOjo2, yOjo2, xOjo2 + largo, yOjo2 +largo, color);
    dibujarLinea(ctx, xOjo2 + largo, yOjo2, xOjo2, yOjo2 +largo, color);
    

}