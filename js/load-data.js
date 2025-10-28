d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {
    console.log(data);

    drawHistogram(data);
    drawScatterPlot(data);
    populateFilters(data);

    createTooltip();
    handleMouseEvent()


}).catch(error => {
    console.error("Error loading the data: ", error);
})