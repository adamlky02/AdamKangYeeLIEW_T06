// module-scoped tooltip references so we don't rely on innerChartS variable
let tooltipEl = null;
let isSvgTooltip = false;

const populateFilters = (data) => {
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)

        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            if(!d.isActive)  {
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

                updateHistogram(d.id, data);

            }
        });

    const updateHistogram = (filterId, data) => {

        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerheight - yScale(d.length));
    };

}

const createTooltip = () => {
    if (tooltipEl) return tooltipEl;

    const inner = d3.select("#scatterplot").select("svg").select("g");
    if (!inner.empty()) {
        inner.selectAll(".tooltip").remove();

        const g = inner.append("g")
            .attr("class", "tooltip")
            .style("opacity", 0);

        g.append("rect")
            .attr("width", tooltipWidth)
            .attr("height", tooltipHeight)
            .attr("fill", barColor)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("opacity", 0.75);

        g.append("text")
            .text("NA")
            .attr("x", tooltipWidth / 2)
            .attr("y", tooltipHeight / 2 + 2)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", "white")
            .style("font-weight", 900);

        tooltipEl = g;
        isSvgTooltip = true;
        return tooltipEl;


    };

}

const handleMouseEvent = () => {
    // select the scatterplot inner group (works even if innerChartS var was never exposed)
    const inner = d3.select("#scatterplot").select("svg").select("g");
    if (inner.empty()) return;

    // ensure tooltip exists (SVG or HTML fallback)
    createTooltip();

    inner.selectAll("circle")
        .on("mouseover", (e, d) => {
            console.log("Mouse entered circle", d);

            if (isSvgTooltip) {
                tooltipEl.select("text").text(d.screenSize);

                const cx = +e.target.getAttribute("cx");
                const cy = +e.target.getAttribute("cy");

                tooltipEl
                    .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                    .transition()
                    .duration(200)
                    .style("opacity", 1);
            } else {
                d3.select(".tooltip-html")
                    .style("left", (e.pageX + 8) + "px")
                    .style("top", (e.pageY - 8) + "px")
                    .style("display", "block")
                    .text(`Screen Size: ${d.screenSize}`);
            }
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            if (isSvgTooltip) {
                tooltipEl
                    .transition()
                    .duration(150)
                    .style("opacity", 0);
            } else {
                d3.select(".tooltip-html")
                    .style("display", "none");
            }
        });
};



