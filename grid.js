// Based on: https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

var gridData = [
    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],

    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],

    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],

    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  false,   false,  false,  false,  false,  false,  false, false,  true],
    [true,  true,    true,   true,   true,   true,   true,   true,  true,   true],
];

// height, width
var cellDimensions = [50, 50];

/**
 * Generates a 2D array of the same shape of grid containing all the data needed to render a D3 grid
 * @param grid - A grid of booleans indicating if a cell is traversable (true) or not (false)
 * @param cellDimensions - The pixel height, width of a cell in the grid
 */
function getGridDataForD3(grid, cellDimensions) {
    var data = new Array();
    // starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var xPosition = 1;
    var yPosition = 1;
    // Dimensions of the cell in pixels
    var cellHeight = cellDimensions[0];
    var cellWidth = cellDimensions[1];

    var numRows = grid.length;
    var numCols = grid[0].length;

    // iterate for rows
    for (var row = 0; row < numRows; row++) {
        data.push( new Array() );

        // iterate for cells/columns inside rows
        for (var column = 0; column < numCols; column++) {
            data[row].push({
                x: xPosition,
                y: yPosition,
                width: cellWidth,
                height: cellHeight,
                traversable: grid[row][column]
            });

            // increment the x position. I.e. move it over by 50 (width variable)
            xPosition += cellWidth;
        }
        // reset the x position after a row is complete
        xPosition = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        yPosition += cellHeight;
    }
    return data;
}

// Render Grid with D3

var grid = d3.select("#grid")
    .append("svg")
    .attr("width", cellDimensions[1] * gridData[0].length + 10 + "px")
    .attr("height", cellDimensions[0] * gridData.length + 10 + "px");

var row = grid.selectAll(".row")
    .data(getGridDataForD3(gridData, cellDimensions))
    .enter().append("g")
    .attr("class", "row");

var column = row.selectAll(".square")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class","square")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .attr("fill", function (d) {
        if (d.traversable) {
            return "#fff";
        } else {
            return "#ddd";
        }
    })
    .style("stroke", "#222");
