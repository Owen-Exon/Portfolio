




page = { //Portfolio
    pageID: 'DigitalPortfolio',
    title: 'This Digital Portfolio',
    description: '',

    slideshows: [
        {
            showTitle: 'The Process',
            images: [''],
            cards: [
                {
                    title: '',
                    description: '',
                    linknum: 1
                },
                {
                    title: '',
                    description: '',
                    linknum: 2
                }
            ]
        }
    ],

    path: '',
    classes: 'code',
    addhtml: [{
        key:"",
        style:"",
        src:""
    }]
}

extensions = {
    "mp4":"video",
    "jpg":"img"
}

let sliding = false

function loadSlideslow(slideshow, i, pageID) {
    
    let newSlides = document.createElement("div")
    newSlides.classList.add("slideshow", "S"+i)

    if (slideshow.showTitle != null) {
        let title = document.createElement("h1")
        title.classList.add("SlideshowTitle")
        title.innerHTML =slideshow.showTitle
        newSlides.appendChild(title)
    }

    let images = document.createElement("div")
    images.classList.add("slideshowImages", "S"+ i)
    
    n=0
    slideshow.images.forEach(image => {
        n+=1
        imageExtension = image.split(".").at(-1)
        imageType = extensions[imageExtension]
        
        let slideImage = document.createElement(imageType)
        if (imageType == "video") {
            let videoSource = document.createElement("source")
            videoSource.src = `content/${pageID}/${image}`
            videoSource.type = `video/${imageExtension}`
            slideImage.controls = true
            slideImage.appendChild(videoSource)
            slideImage.addEventListener("click", (e) => {
                e.preventDefault()
            })
        } else {
            slideImage.src = `content/${pageID}/${image}`
        }
        slideImage.classList.add("SlideImage", "S"+ i)
        slideImage.draggable = false
        images.appendChild(slideImage)
    })
    images.dataset.mouseDownAt = 0
    images.dataset.lastpos = window.innerWidth/2

    images.onmousedown = e => handleOnDown(e,i);
    images.ontouchstart = e => handleOnDown(e.touches[0],i);

    images.style.transform = `translateX(${window.innerWidth/2}px)`

    GradL = document.createElement("div")
    GradR = document.createElement("div")
    GradL.classList.add("slideshowGrad","Left")
    GradR.classList.add("slideshowGrad","Right")

    newSlides.appendChild(images)
    newSlides.appendChild(GradL)
    newSlides.appendChild(GradR)
    document.getElementById("slideshows").appendChild(newSlides)

}


document.body.dataset.WhatSlide = -1
window.onmouseup = e => handleOnUp(e,parseFloat(document.body.dataset.WhatSlide));
window.ontouchend = e => handleOnUp(e.touches[0],parseFloat(document.body.dataset.WhatSlide));
window.onmousemove = e => handleOnMove(e,parseFloat(document.body.dataset.WhatSlide));
window.ontouchmove = e => handleOnMove(e.touches[0],parseFloat(document.body.dataset.WhatSlide));

function handleOnDown(e, i) {
    let images = document.getElementsByClassName("slideshowImages S"+i)[0]
    document.body.dataset.WhatSlide = i
    images.dataset.mouseDownAt = e.clientX;
    images.style.cursor = "e-resize"
}


function handleOnUp(e, i) {
    if (i!= -1) {
        let images = document.getElementsByClassName("slideshowImages S"+i)[0]
        images.dataset.mouseDownAt = "0"; 
        document.body.dataset.WhatSlide = -1
        images.style.cursor = ""
    }
}
    
function handleOnMove(e, i) {
    if (i!= -1) {
        let images = document.getElementsByClassName("slideshowImages S"+i)[0]
        let downAt = parseFloat(images.dataset.mouseDownAt)
        if (downAt != 0) {
            let offset = (downAt-e.clientX)*2
            if (offset > 10) {
                sliding = true
            } else {
                sliding = false
            }
            let newpos = parseFloat(images.dataset.lastpos) - offset
            newpos = Math.max(Math.min(newpos,window.innerWidth/2),-images.offsetWidth + window.innerWidth/2)
            
            images.animate({transform: `translateX(${newpos}px)`}, { duration: 1500, fill: "forwards" });
            images.dataset.mouseDownAt = e.clientX
            images.dataset.lastpos = newpos
        }
    }
}

function loadPage(page) {
    document.getElementById("ProjectTitle").innerHTML = page.title.replace('<br>',' ')
    document.getElementById("webTitle").innerHTML = page.title.replace('<br>',' ')
    document.getElementById("ProjectDesc").innerHTML = page.description

    let i = 0
    page.slideshows.forEach(slideshow => {
        loadSlideslow(slideshow,i,page.pageID)
        i+= 1
    })


    if (page.addhtml != null) {
        page.addhtml.forEach(item => {
            newHTML = document.createElement(item.key)
            newHTML.style = item.style
            newHTML.classList = item.classes
            newHTML.src = item.src

            document.body.appendChild(newHTML)
        })
    }
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


function loadAll() {
    let urlID = getQueryParam('urlID');

    page_data.forEach(page => {
        if (page.pageID==urlID) {
            loadPage(page)
        }
    });
}

loadAll()
