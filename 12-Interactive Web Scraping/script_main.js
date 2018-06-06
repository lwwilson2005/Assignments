// json
let parameters = {
    columns: [
        {
            title: 'datetime',
            html: function (row) { return row.datetime; }
        },

        {
            title: 'city',
            html: function (row) { return row.city; }
        },

        {
            title: 'state',
            html: function (row) { return row.state; }
        },

        {
            title: 'country',
            html: function (row) { return row.country; }
        },

        {
            title: 'shape',
            html: function (row) { return row.shape; }
        },

        {
            title: 'comments',
            html: function (row) { return row.comments; }
        },
    ],
    data: null,
    filtered_data: null
};

let tableUFO = d3.select('#ufo-list');
let singleDate = d3.select('#dateInput');

function handleSubmitClick() {
    let selectValue = d3.select('#dateInput')
        .property('value');
    // console.log(selectValue);
    parameters.filtered_data = [];
    for (let row of ufoData) {
        if (selectValue === row.datetime) {
            parameters.filtered_data.push(row);
        }
    }
    //console.log(parameters.filtered_data);
    createTables();
}


let submitBtn = document.querySelector('#search-ufo');

submitBtn.addEventListener('click', handleSubmitClick);

function onchange() {
    // clean filtered data
    parameters.filtered_data = [];

    createTables();
}



// //from here

let tableUFO1 = d3.select('#ufo-list');
let multipleDate = d3.select("#dateInput1");
let UFOInput2 = d3.select("#ufo-city");
let UFOInput3 = d3.select("#ufo-state");
let UFOInput4 = d3.select("#ufo-country");
let UFOInput5 = d3.select("#ufo-shape");

function handleSubmitClick2() {
    let selectValue = d3.select('#dateInput1')
        .property('value');
    let selectValue2 = d3.select('#ufo-city')
        .property('value');
    let selectValue3 = d3.select('#ufo-state')
        .property('value');
    let selectValue4 = d3.select('#ufo-country')
        .property('value');
    let selectValue5 = d3.select('#ufo-shape')
        .property('value');
    // console.log(selectValue2);
    parameters.filtered_data = [];
    for (let row of ufoData) {
        // console.log(selectValue);
        // console.log(selectValue2);
        if ((!selectValue || selectValue === row.datetime) && (!selectValue2 || selectValue2 === row.city) && (!selectValue3 || selectValue3 === row.state) && (!selectValue4 || selectValue4 === row.country) && (!selectValue5 || selectValue5 === row.shape))
        {
            parameters.filtered_data.push(row);
        }
    }
    // console.log(parameters.filtered_data);
    createTables();
}


let submitBtn2 = document.querySelector('#search-ufo2');

submitBtn2.addEventListener('click', handleSubmitClick2);

function onchange() {
    // clean filtered data
    parameters.filtered_data = [];

    createTables();
}


function init(ufoData) {
    console.log(ufoData);
    parameters.data = ufoData;
    parameters.filtered_data = ufoData;
    createTables();
}

let ufoList = d3.select('#ufo-list');
init(ufoData);

function createTables() {
    ufoList.html('');
    let table = d3.select('#ufo-list').append('table').attr('class', 'table');

    table.append('thead').append('tr')
        .selectAll('th')
        .data(parameters['columns'])
        .enter()
        .append('th')
        .text(function (data) { return data.title; });

    table.append('tbody')
        .selectAll('tr') // create row for each row of data
        .data(parameters.filtered_data)
        .enter()
        .append('tr')
        .selectAll('td')
        .data(function (row) {
            // evaluate column objects against the current row
            return parameters.columns.map(function (column) {
                var cell = {};
                d3.keys(column).forEach(function (k) {
                    if (typeof (column[k]) === 'function') {
                        cell[k] = column[k](row)
                    }
                });
                return cell;
            });
        }).enter()
        .append('td')
        .text(function (data) { return data.html; });

}

