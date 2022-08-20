import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as d3a from "d3-svg-annotation";
import { AppContext } from "../context/AppContext";
import { useTransition, animated } from "react-spring";
import { BsCheck2 } from "react-icons/bs";

export default function StatsPopup() {
  const { App, data, displayTemp, startData, latestStat } =
    useContext(AppContext);

  //   const [data] = useState([123, 124, 236, 645, 383, 635, 234]);
  const svgRef = useRef();

  const containerTransition = useTransition(displayTemp, {
    config: { mass: 1, tension: 150, friction: 10 },
    from: { x: 400, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 900, opacity: 0 },
  });

  useEffect(() => {
    const w = 500;
    const h = 220;
    const names = ["Hard", "Medium", "Easy", "Very Easy"];
    const diff = data
      .map((v, i) => v - startData[i])
      .map((v) => {
        if (v > 0) {
          return `+${v}`;
        } else if (v === 0) {
          return 0;
        } else {
          return `-${Math.abs(v)}`;
        }
      });
    const colors = [
      "rgba(240, 91, 91, 0.85)",
      "rgba(240, 213, 91, 0.85)",
      "rgba(146, 240, 91, 0.85)",
      "rgba(91, 240, 195, 0.85)",
    ];

    const annotations = [
      {
        note: {
          label: data[0],
          align: "center", // try right or left
          wrap: 200, // try something smaller to see text split in several lines
          padding: 10, // More = text lower
        },
        color: ["#69b3a2"],
        x: 0,
        y: 0,
      },
    ];

    const margin = { top: 20, bottom: 50, left: 50, right: 50 };
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .attr("viewbox", [0, 0, w, h]);

    // const makeAnnotations = d3a.annotation().annotations(annotations);

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, w - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 1000])
      .range([h - margin.bottom, margin.top]);

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("fill", (d, i) => colors[i])
      .attr("class", "bar")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d))
      .attr("height", (d) => y(0) - y(d))
      .attr("width", x.bandwidth());

    const texts = svg
      .selectAll(".myTexts")
      .data(data)
      .enter()
      .append("text")
      .style("fill", "rgba(255,255,255,0.2)")
      .style("font-family", "monospace");

    // New amounts in difficulties (difference in data[i] before the session started and when ended)
    const diffText = svg
      .selectAll(".myTexts")
      .data(data)
      .enter()
      .append("text")
      .style("fill", "rgba(255,255,255,0.1)")
      .style("font-family", "monospace");

    diffText
      .attr("class", "diff-text")
      .data(diff)
      .attr("x", function (d, i) {
        return x(i) + x.bandwidth() / 2;
      })
      .attr("y", function (d, i) {
        return y(data[i]) - 30;
      })
      .text(function (v, i) {
        return v == 0 ? "" : v;
      })
      .style("fill", (v, i) => {
        if (v > 0) {
          return "rgba(146, 240, 91, 0.5)";
        } else if (v === 0) {
          return 0;
        } else {
          return "rgba(240, 91, 91, 0.5)";
        }
      });

    texts
      .attr("class", "label-text")
      .attr("x", function (d, i) {
        return x(i) + x.bandwidth() / 2;
      })
      .attr("y", function (d, i) {
        return y(d) - 10;
      })
      .text(function (d, i) {
        return d;
      });

    function xAxis(g) {
      g.attr("transform", `translate(0, ${h - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => `${names[i]}`))
        .attr("font-size", "12px");
    }

    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`).call(
        d3.axisLeft(y).ticks(6, data.format)
      );
    }

    svg.append("g").call(yAxis);
    svg.append("g").call(xAxis);

    svg.node();
  }, [data]);

  return containerTransition((style, item) =>
    item ? (
      <animated.div className="statsGraph" style={style}>
        <div className="boxInfo">
          <p>
            <span id="check">{<BsCheck2 />}</span> Session Complete
          </p>
          <div className="recent-details">
            <p id="recentStats">Most recent session stats:</p>
            <div className="tags">
              <div className="tag">
                {`${latestStat.totalDuration.toFixed(2)}s`}
              </div>
              <div className="tag">{`${latestStat.num} Words`}</div>
              <div className="tag">{`${latestStat.listDifficulty.toString()}`}</div>
            </div>
          </div>
        </div>
        <svg ref={svgRef}></svg>
      </animated.div>
    ) : (
      ""
    )
  );
}
