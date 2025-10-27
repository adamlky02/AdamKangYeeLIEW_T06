const drawHistogram = (data) => {
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const bins = binGenerator(data);
    console.log(bins);

    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    xScale.domain([minEng, maxEng]).range([0, innerwidth]);
    yScale.domain([0, binsMaxLength]).range([innerheight, 0]).nice();

    // Create the bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerheight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", barHoverColor)
        .attr("stroke-width", 2);

    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("transform", `translate(0,${innerheight})`)
        .call(bottomAxis);

    svg
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", margin.left + innerwidth / 2)
        .attr("y", height - 6)
        .attr("text-anchor", "middle")
        .attr("class", "axis-label");

    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .call(leftAxis);

    svg
        .append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
}