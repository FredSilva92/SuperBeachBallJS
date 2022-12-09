const { Platform } = require("./entities/platform");
const {tile1} = require("../resources/tile1.png")

function createImage(src) {
  const image = new Image()
  image.src = src;
  return image;
}

/*function buildLevel(context) {
  const platforms = [];
  const elemXSize = 60;
  const elemYSize = 60;

  const a = ['------------------------------',
             '------------------------------',
             '----------------p-------------',
             '------------------------------',
             '---------ss-------------------',
             'ppppppppppppp-p-pppppppppppppp']

  let revertedY = a.length,
    xAxis = 0;

  for (let i = 0; i <a.length; i++) {
    
    var line = a[i];

    for(let j = 0; j < line.length; j++) {
      
      switch(line[j]) {
      
        case 'p':
          let tile = createImage(tile1),
            x = xAxis,
            y = innerHeight - elemYSize * revertedY;

          platforms.push(new Platform(context, x, y, elemXSize, elemYSize, tile));
          break;

        case 's':
          break;  
      }

      xAxis+=elemXSize;
      
    }

    revertedY--;
    xAxis = 0;
  }

  return platforms;
}*/

function createDiv(src) {
  const newDiv = document.createElement("div");
  
}

module.exports = {createImage}
