import React, { useEffect, useRef } from "react";
import Sunburst from "sunburst-chart";
import * as d3 from "d3";

const SunburstWidget = ({ data }) => {
  const chartRef = useRef(null);
  const color = d3.scaleOrdinal(d3.schemePaired);

  useEffect(() => {
    if (chartRef.current) {
      // Clear the existing chart (if any)
      chartRef.current.innerHTML = "";

      // Render the Sunburst chart
      Sunburst()
        .data(data)
        .width(500)
        .color((d) => color(d.name))
        .height(500)
        // .tooltipContent((node) => `${node.name}: ${node.value}g`)
        .centerRadius([0.0001])
        (chartRef.current as any);
    }
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default SunburstWidget;
