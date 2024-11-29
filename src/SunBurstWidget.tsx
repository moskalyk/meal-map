import { useEffect, useRef } from "react";
import Sunburst from "sunburst-chart";
// @ts-ignore
import * as d3 from "d3";

const SunburstWidget = ({ data }: any) => {
  const chartRef = useRef(null);
  const color = d3.scaleOrdinal(d3.schemePaired);

  useEffect(() => {
    if (chartRef.current) {
      // Clear the existing chart (if any)
        // @ts-ignore

      chartRef.current.innerHTML = "";

      // Render the Sunburst chart
      Sunburst()
        // @ts-ignore

        .data(data)
        // @ts-ignore

        .width(500)
        // @ts-ignore

        .color((d) => color(d.name))
        // @ts-ignore

        .height(500)
        // .tooltipContent((node) => `${node.name}: ${node.value}g`)
        // @ts-ignore
        .centerRadius([0.0001])
        (chartRef.current as any);
    }
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default SunburstWidget;
