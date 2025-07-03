export function ProgressiveAnimation(data) {
  const delayPerPoint = 5; // ms delay between points

  const previousY = (ctx) => {
    try {
      if (ctx.index === 0) {
        // Use the base line value (can be adjusted)
        return ctx.chart.scales.y.getPixelForValue(100);
      }

      const meta = ctx.chart.getDatasetMeta(ctx.datasetIndex);
      const previousElement = meta.data[ctx.index - 1];

      if (previousElement && previousElement.getProps) {
        return previousElement.getProps(['y'], true).y;
      }

      // Fallback if previous point is undefined
      return ctx.chart.scales.y.getPixelForValue(100);
    } catch (err) {
      console.error("Error in animation 'previousY':", err);
      return ctx.chart.scales.y.getPixelForValue(100);
    }
  };
  const animation = {
    x: {
      type: 'number',
      easing: 'easeInOutCubic',
      duration: delayPerPoint,
      from: NaN,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) return 0;
        ctx.xStarted = true;
        return (ctx.datasetIndex * 1000) + (ctx.index * delayPerPoint);
      }
    },
    y: {
      type: 'number',
      easing: 'easeInOutCubic',
      duration: delayPerPoint,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) return 0;
        ctx.yStarted = true;
        return (ctx.datasetIndex * 1000) + (ctx.index * delayPerPoint);
      }
    }
  };

  return animation;
}