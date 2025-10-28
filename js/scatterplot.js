const drawScatterPlot = (data) => {
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xExtent = d3.extent(data, d => d.star);
    const yExtent = d3.extent(data, d => d.screenSize);

    const xScaleS = d3.scaleLinear()
        .domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
        .range([0, innerwidth]);

    const yScaleS = d3.scaleLinear()
        .domain([yExtent[0] - 5, yExtent[1] + 5])
        .range([innerheight, 0])
        .nice();

    colorScaleS
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.screenSize))
        .attr("r", 4)
        .attr("fill", d => colorScaleS(d.screenTech))
        .attr("opacity", 0.5);

    const bottomAxisS = d3.axisBottom(xScaleS);
    const uniqueTechs = Array.from(new Set(data.map(d => d.screenTech)));


    innerChartS
        .append("g")
        .attr("transform", `translate(0,${innerheight})`)
        .call(bottomAxisS);

    svg.append("text")
        .text("Star rating")
        .attr("text-anchor", "end")
        .attr("x",width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    const leftAxisS = d3.axisLeft(yScaleS);
    innerChartS
        .append("g")
        .call(leftAxisS);

    svg.append("text")
        .text("Screen Size (inches)")
        .attr ("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");

    const legend = svg.append("g")
        .attr ("class", "legend")
        .attr ("transform", `translate(${width - margin.right - 140}, ${margin.top})`);

    uniqueTechs.forEach((tech,i) => {
        const g = legend.append("g")
            .attr("transform", `translate(0, ${i * 22})`);
        g.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colorScaleS(tech));
        g.append("text")
            .attr("x", 18)
            .attr("y", 10)
            .text(tech)
        .attr('Class','axis-label');
    });
}



