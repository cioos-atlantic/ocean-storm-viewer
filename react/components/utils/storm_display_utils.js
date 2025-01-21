import { Icon, DivIcon, Point } from 'leaflet'


/**
 * The function `change_icon_url` asynchronously fetches an SVG file, replaces specific colors and
 * strokes in the SVG content, and returns a new Icon object with the updated icon URL.
 * @returns The `change_icon_url` function returns a new `Icon` object with updated icon URLs based on
 * the provided SVG content and colors. If there is an error during the process, the function will log
 * the error and return the original `icon` object as a fallback.
 */
export async function change_icon_url(icon, svgPath, arcColor, arcStroke, ellipseColor, textColor) {
    try {
        const response = await fetch(svgPath);
        if (!response.ok) throw new Error(`Failed to fetch SVG: ${response.statusText}`);

        let svgContent = await response.text();
        svgContent = svgContent
            .replace(/var\(--arc-fill\)/g, arcColor)
            .replace(/var\(--ellipse-stroke\)/g, ellipseColor)
            .replace(/var\(--text-color\)/g, textColor)
            .replace(/var\(--arc-stroke\)/g, arcStroke);

        const updatedIconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

        return new Icon({
            ...icon.options, // Preserve existing options
            iconUrl: updatedIconUrl,
            iconRetinaUrl: updatedIconUrl,
        });
    } catch (error) {
        console.error("Error updating SVG icon:", error);
        return icon; // Return the original icon as a fallback
    }
}