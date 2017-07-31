class ImageShow {
  constructor(canvasEl){
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
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
      processImage(this);
      ctx.drawImage(testImage,0,0,this.width, this.height);
    };
    // this.testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
    testImage.src = 'images/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
  }

  processImage(image){
    console.log(image.src);
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
