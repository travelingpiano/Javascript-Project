import ImageShow from './image_show';

document.addEventListener('DOMContentLoaded', ()=>{
  const canvasEl = document.getElementsByTagName('canvas')[0];
  let image = new ImageShow(canvasEl);
  image.render();
});
