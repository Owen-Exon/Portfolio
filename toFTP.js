const {page_data} = require('./js/data/page_data.js')
const pageImages = []
fs = require('fs')
page_data.forEach(pageDATA => {
    let currentID = pageDATA.pageID
    
    slideshows = pageDATA.slideshows
    slideshows.forEach(slideshow => {
       slideshow.images.forEach(image => {
            pageImages.push(`!content/${currentID}/${image}`)
       }); 
    });
});

let fileText = "# Ignore Non Used Images\ncontent/**\n"
pageImages.forEach(image => {
    fileText = fileText + `${image}\n`
});

var fs = require('fs')
fs.readFile(".git-ftp-ignore", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var index = data.indexOf("# Ignore Non Used Images")
  var result = data.substring(0,index) + fileText
  fs.writeFile(".git-ftp-ignore", result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});