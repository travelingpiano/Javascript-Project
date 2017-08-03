// let data = [
// {name: "A", value: '.08167'},
// {name: 'B', value: '.01492'},
// {name: 'C', value: '.02782'},
// {name: 'D', value: '.04253'},
// {name: 'E', value: '.12702'},
// {name: 'F', value: '.02288'},
// {name: 'G', value: '.02015'},
// {name: 'H', value: '.06094'},
// {name: 'I', value: '.06966'},
// {name: 'J', value: '.00153'},
// {name: 'K', value: '.00772'},
// {name: 'L', value: '.04025'},
// {name: 'M', value: '.02406'},
// {name: 'N', value: '.06749'},
// {name: 'O', value: '.07507'},
// {name: 'P', value: '.01929'},
// {name: 'Q', value: '.05987'}];

import * as d3 from 'd3';
import d3Tip from 'd3-tip';
d3.tip = d3Tip;

let barHeight = 20;

let type = d => {
  d.value = +d.value;
  return d;
};

let margin = {top: 20, right: 30, bottom: 30, left: 40};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;


let barButton = document.getElementsByName('bar')[0];


let mainBody = d3.select('.main-body');
let chart = mainBody.append('svg').attr('class','chart');
let count = 0;
let customTip = d3.select('.main-body')
                  .append('div')
                  .attr('class','tooltip')
                  .style('opacity',0);
let tip = d3.tip()
            .attr('class','d3-tip')
            .html(d=>{
              return `Frequency: ${d.value}`;
            });
let dataLocal;
let createBarChart = (data) => {
  if(data){
    dataLocal = data;
    let barWidth = width/data.length;
    d3.selectAll('.chart > *').remove();
    height = Number(mainBody.style('height').slice(0,-2));
    width = Number(mainBody.style('width').slice(0,-2));
    chart.attr('width',width)
         .attr('height',height)
         .call(tip);
    let bar = chart.selectAll('.bar')
                .data(data)
                .enter();
    let x = d3.scaleBand()
              .range([0,width])
              .round(.1);

    let y = d3.scaleLinear()
              .range([height,0]);
    let rad = d3.scaleLinear()
                .range([0,400]);
    x.domain(data.map(d=>d.name));
    y.domain([0, d3.max(data, d=>d.value)]);
    bar.append('circle')
       .attr('r',d=>rad(d.value))
       .attr('fill','#000')
       .attr('cursor','pointer')
       .on('mouseover',d=>{
         d3.select(this).transition()
                        .duration(200)
                        .attr('fill','black');
         customTip.transition()
                  .duration(200)
                  .style('opacity',.9);
         customTip.html(d.value)
                  .style('left',(d3.event.clientX-50)+'px')
                  .style('top',(d3.event.clientY)+'px');
       })
       .on('mouseout', d=>{
         customTip.transition()
                  .duration(500)
                  .style('opacity',0);
       });
  }
};

// bar.append('rect')
//    .attr('class','bar')
//    .attr('x',d=>x(d.name))
//    .attr('y',d=>y(d.value))
//    .attr('height',d=>{
//      return height-y(d.value);
//    })
//    .attr('fill','steelblue')
//    .attr('width',barWidth-1)

barButton.addEventListener('click', d3.tsv('./data/data.tsv',(data)=>{
  createBarChart(data);
}));

window.addEventListener('resize',()=>createBarChart(dataLocal));


// let chart = d3.select('.chart')
//             .attr('width',width + margin.left + margin.right)
//             .attr('height',height + margin.top + margin.bottom)
//             .append('g')
//             .attr('transform',`translate( ${margin.left}, ${margin.top})`);

// let xAxis = d3.svg.axis()
//             .scale(x)
//             .orient('bottom');

// let yAxis = d3.axisLeft(y).ticks(10,'%');
//
// chart.append('g')
//      .attr('class', 'x axis')
//      .attr('transform', `translate(0, ${height})`)
//      .call(d3.axisBottom(x));
//
// chart.append('g')
//      .attr('class', 'y axis')
//      .call(yAxis)
//      .append('text')
//      .attr('transform','rotate(-90)')
//      .attr('y',6)
//      .attr('dy', '.71em')
//      .attr('text-anchor','end')
//      .text('Frequency');
//
//
// let barWidth = width/data.length;
// let bar = chart.selectAll('.bar')
//                .data(data)
//                .enter();
// bar.append('rect')
//    .attr('class','bar')
//    .attr('x',d=>x(d.name))
//    .attr('y',d=> y(d.value))
//    .attr('height',d=>(height-y(d.value)))
//    .attr('width', barWidth-1);
// bar.append('text')
//    .attr('x', barWidth/2)
//    .attr('y',d => (y(d.value)+3))
//    .attr('dy','.75em')
//    .text(d => d.value);



// let bar = chart.selectAll('g')
//                .data(data)
//                .enter().append('g')
//                .attr('transform',(d,i)=>`translate(0, ${i*barHeight})`);
//
// bar.append('rect')
//    .attr('width',x)
//    .attr('height',barHeight -1);
//
// bar.append('text')
//    .attr('x',d=>x(d)-3)
//    .attr('y',barHeight/2)
//    .attr('dy','.35em')
//    .text(d=>d);
//
// d3.select('body')
//   .style('color', 'black')
//   .style('background-color', 'blue')
//   .append('div')
//   .text('Hello, world!');
