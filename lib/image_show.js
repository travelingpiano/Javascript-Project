class ImageShow {
  constructor(canvasEl){
    this.canvas = canvasEl;
    // this.ctx = canvasEl.getContext('2d');
    let ctx = canvasEl.getContext('2d');
    let testImage = new Image();
    this.testImage = new Image();
    this.imageReady = false;
    let width;
    let height;
    let canvas = this.canvas;
    let processImage = this.processImage;
    testImage.onload = function(){
      // this.imageReady = true;
      canvas.width = this.width;
      canvas.height = this.height;
      console.log(this.width);
      console.log(this.height);
      processImage(this.src);
      ctx.drawImage(testImage,0,0,this.width, this.height);
// let image = ctx.getImageData(0,0,1280,1014);
    };

    // console.log(image);
    // this.testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
    testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
  }

  processImage(imagePath){
    // let file = new XMLHttpRequest('/images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg');
    let reader = new FileReader();
    reader.onload = ()=>{
      console.log(reader);
    };
  }

  render(){
    // console.log(this.ctx);
    // this.testImage.onload(this.ctx);
    // if(this.imageReady){
    //   this.ctx.drawImage(this.testImage,0,0);
    //   console.log(this.testImage);
    // }
  }
}

export default ImageShow;
