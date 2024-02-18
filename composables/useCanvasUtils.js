const useCanvasUtils = () => {
    const drawRoundRect = (ctx, x, y, width, height, radius, background) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.fillStyle = background;
        ctx.fill();
        ctx.closePath();
    };

    const drawImageWithBorderRadius = (
        ctx,
        img,
        x,
        y,
        width,
        height,
        borderRadius
    ) => {
        // Dessiner un rectangle avec des coins arrondis
        ctx.beginPath();
        ctx.moveTo(x + borderRadius, y);
        ctx.arcTo(x + width, y, x + width, y + height, borderRadius);
        ctx.arcTo(x + width, y + height, x, y + height, borderRadius);
        ctx.arcTo(x, y + height, x, y, borderRadius);
        ctx.arcTo(x, y, x + width, y, borderRadius);
        ctx.closePath();

        // Utiliser le rectangle comme un masque de clip
        ctx.save();
        ctx.clip();

        // Dessiner l'image
        ctx.drawImage(img, x, y, width, height);

        // Restaurer le contexte
        ctx.restore();
    };

    const drawText = (ctx, text, x, y, font, color, opacity, maxWidth) => {
        ctx.font = font;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
    
        // Vérifier la largeur du texte
        var textWidth = ctx.measureText(text).width;
    
        // Si la largeur du texte est supérieure à la largeur maximale autorisée
        if (textWidth > maxWidth) {
            // Tronquer le texte et ajouter des points de suspension
            var truncatedText = text.substr(0, findTruncatedTextLength(text, maxWidth, ctx)) + '...';
            // Dessiner le texte tronqué
            ctx.fillText(truncatedText, x, y);
        } else {
            // Dessiner le texte complet
            ctx.fillText(text, x, y);
        }
    
        // Réinitialiser les paramètres du contexte après le dessin
        ctx.globalAlpha = 1.0;
    };
    
    // Fonction pour trouver la longueur du texte tronqué
    function findTruncatedTextLength(text, maxWidth, ctx) {
        var len = text.length;
        var width = ctx.measureText(text).width;
        while (width > maxWidth && len > 0) {
            len--;
            text = text.substring(0, len);
            width = ctx.measureText(text).width;
        }
        return len;
    }

    return {
        drawRoundRect,
        drawImageWithBorderRadius,
        drawText,
    };
};

export default useCanvasUtils;
