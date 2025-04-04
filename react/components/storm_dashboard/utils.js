export function ProgressiveAnimation(data) {
    const delayPerPoint = 50; // ms delay between points
  
    const previousY = (ctx) =>
      ctx.index === 0
        ? ctx.chart.scales.y.getPixelForValue(100)
        : ctx.chart
            .getDatasetMeta(ctx.datasetIndex)
            .data[ctx.index - 1]
            .getProps(['y'], true).y;
  
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