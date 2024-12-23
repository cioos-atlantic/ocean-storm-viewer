import { Icon, DivIcon, Point } from 'leaflet'


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