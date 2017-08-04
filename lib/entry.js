import * as d3 from 'd3';


let type = 'fortune';

document.getElementsByName('fortune')[0].addEventListener('click', ()=>{
  type = 'fortune';
  createCirclePack('data/fortune100.json');
});

document.getElementsByName('movies')[0].addEventListener('click',()=>{
  type = 'movies';
  createCirclePack('data/movies.json');
});

let customTooltip = d3.select('body')
                      .append('textarea')
                      .attr('class','toolTip')
                      .style('opacity',0);

let createCirclePack = (filename)=>{
  d3.json(filename,(error,root)=>{
    d3.selectAll('.chart > *').remove();
    let body = d3.select('.chart');
    let width = Number(body.style('width').slice(0,-2));
    let height = Number(body.style('height').slice(0,-2));
    if(width> height){
      width = height;
    }else{
      height = width;
    }
    body.attr('width',width).attr('height',height);
    let svg = body.append('svg').attr('class','chart')
                .attr('width',width)
                .attr('height',height),
    margin = 20;
    let diameter = +svg.attr('height');
    let g = svg.append('g').attr('transform',`translate(${diameter/2},${diameter/2})`), //translate to 2, 2 location from default 0,0 location, very minor move
    format = d3.format(',d'); //format number with 0 decimal places
    let pack = d3.pack().size([diameter - margin, diameter - margin]).padding(2); //create new d3 circle packing, size sets the size of the pack by width and height
    if(error) throw error;
    root = d3.hierarchy(root)
             .sum(d=>{
               return d.Revenue; })
             .sort((a,b)=>(b.value-a.value)); //hierarchy, sum and then root acts as a sort method to sort all the child and parent nodes, in this case, from big to small. these needs to be called before
    let color = d3.scaleLinear()
                  .domain([-1, 5])
                  .range(['rgb(38,143,56)', 'rgb(174, 255, 188)'])
                  .interpolate(d3.interpolateRgb);
    let focus = root,
        nodes = pack(root).descendants(),
        view;
    let circle = g.selectAll("circle")
                  .data(nodes)
                  .enter().append('circle')
                  .attr('class',d=>d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root')
                  .attr('fill', d=> (d.children ? color(d.depth) : 'white'))
                  .on('click', d=> {
                    if(focus !== d){
                      zoom(d);
                      d3.event.stopPropagation();
                    }
                  }).on('mouseover',function(d){
                      if(d.parent === focus || this.style.display === 'inline'){
                        customTooltip.transition()
                                     .duration(200)
                                     .style('opacity',.9);
                        customTooltip.html(`${d.data.name} \n ${d.value} millions`)
                                     .style('left',(d3.event.clientX)+'px').style('top',(d3.event.clientY)+'px');
                      }
                    }).on('mouseout',d=>{
                      customTooltip.transition()
                                   .duration(4000)
                                   .style('opacity',0);
                    });
    let text = g.selectAll('text')
                .data(nodes)
                .enter().append('text')
                .attr('class','label')
                .attr('fill-opacity',d=> d.parent===root ? 1:0)
                .attr('display', d => d.parent === root ? 'inline' : 'none')
                .attr('dy','0.3em')
                .attr('text-align','center')
                .attr('color','blue')
                .text(d=> {
                  if(d.children){
                    return d.data.name.substring(0,d.r/3);
                  }else{
                    return d.data.name.substring(0,d.r/3*2);
                  }
                  });
    let node = g.selectAll('circle,text');
    svg.style('background',color(-1))
       .attr('text-anchor','middle')
       .on('click',()=>{zoom(root);});
    zoomTo([root.x, root.y, root.r*2+margin]);

    let zoom = (d) => {
      let focus0 = focus;
      if(!d.children){
        focus = d.parent;
      }else{
        focus = d;
      }
      let transition = d3.transition()
                         .duration(d3.event.altKey ? 7500 : 750)
                         .tween('zoom', function(d){
                           let i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r*2+margin]);
                           return t => {zoomTo(i(t));};
                         })
      transition.selectAll('text')
                .filter(function(d){
                  return d.parent === focus || this.style.display === 'inline';})
                .style('fill-opacity', function(d){return d.parent===focus ? 1:0;})
                .on('start',function(d){
                  if(d.parent === focus){

                    this.style.display = 'inline';
                  }
                }).on('end', function(d){
                  if(d.parent !== focus){
                    this.style.display = 'none';
                  }
                });
      transition.selectAll('circle')
                .filter(function(d){
                  return d.parent === focus || this.style.display === 'inline';
                });
    };

    function zoomTo(v) {
      let k = diameter / v[2];
      view = v;

      node.attr('transform',d=> `translate( ${(d.x-v[0])*k}, ${(d.y - v[1])*k})`);
      circle.attr('r', d=> d.r*k);
    }
  });
};


window.addEventListener('resize',()=>{
  if(type==='movies'){
    createCirclePack('data/movies.json');
  }else{
    createCirclePack('data/fortune100.json');
  }
});

window.addEventListener('DOMContentLoaded',()=>{
  createCirclePack('data/fortune100.json');
});
