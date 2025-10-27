const margin = {top:40, right: 30, bottom: 50, left: 70};
const width = 800;
const height = 400;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

let innerChartS;

const tooltipWidth = 65;
const tooltipHeight = 32;

// Colors for the bars
const barColor = "#606464"; // grey
const barHoverColor = "#fffaf0"; // darker orange

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

const binGenerator = d3.bin()
    .value(d => d.energyConsumption)

const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

