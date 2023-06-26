require('./style.css')
const {gsap} = require("gsap")

const myFunction = (data) =>{

    // Headline: Read This Before You go
    // Body: We noticed you were going somewhere. We wanted to show you this last minute pop-up. We’d really love to help you.
    // Button 1: Call 0412 123 123
    // Button 2: Message <mailto:test@cjco.com.au|test@cjco.com.au>

    // assets from client
    var imgUrl = data.image
    var bgColor = data.background ? data.background : "#fff";
    var imgColumn = data.image_column;
    var heading = data.heading ? data.heading : "Read This Before You go";
    var bodyText = data.subheading ? data.subheading : "We noticed you were going somewhere. We wanted to show you this last minute pop-up. We’d really love to help you.";

    var full_screen = data.full_screen

    var btn1text = data.call.number;
    var btn1Link = `tel:${data.call.number}`;
    var btn1Bg = data.call.background ? data.call.background : "#5137de"
    var btn1Color = data.call.color ? data.call.color : "white"

    var btn2text = data.message.text;
    var btn2Link =  data.message.url;
    var btn2Bg = data.message.background ? data.message.background : "#f1a233"
    var btn2Color = data.message.color ? data.message.color : "white"

    var radius = data.radius? data.radius : "default";

    var day_interval = data.day_interval ? data.day_interval : false;
    var intervalInMills = (data.day_delay ? data.day_delay : 0) * 24 * 60 * 60 * 1000;


    // create popup
    var docBody = document.body

    var mainPopupWrapper = document.createElement('div')
    mainPopupWrapper.setAttribute('id', 'cjcoexitintentpopup')
    
    // create backdrop
    var popupBackdrop = document.createElement('div')
    popupBackdrop.classList.add('cjco-ei-popup-backdrop');
    mainPopupWrapper.append(popupBackdrop);

    // create a inner wrapper
    var popupInner = document.createElement('div')
    popupInner.setAttribute('id', 'cjcoexitintentpopup-inner')
    popupInner.classList.add('cjco-ei-popup-inner', radius);
    if(full_screen){
        popupInner.classList.add('cjco-ei-popup-fullscreen');
    }
    if(imgColumn == "right"){
        popupInner.classList.add('cjco-ei-popup-img-right');
    }
    mainPopupWrapper.append(popupInner);

    // create close button
    var closeButton = document.createElement('button')
    closeButton.classList.add('cjco-ei-popup-close');
    closeButton.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.45801 1.4585L33.5413 33.5418M1.45801 33.5418L33.5413 1.4585" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    popupInner.append(closeButton);

    // create grid
    var popupInnerGrid = document.createElement('div')
    popupInnerGrid.classList.add('cjco-ei-popup-inner-grid');
    popupInnerGrid.style.backgroundColor = bgColor;
    popupInner.append(popupInnerGrid);

    // columns (left)
    var popupInnerCol1 = document.createElement('div')
    popupInnerCol1.classList.add('cjco-ei-popup-col', 'cjco-ei-popup-col-left');
    popupInnerGrid.append(popupInnerCol1);

    // columns (right)
    var popupInnerCol2 = document.createElement('div')
    popupInnerCol2.classList.add('cjco-ei-popup-col', 'cjco-ei-popup-col-right');
    popupInnerGrid.append(popupInnerCol2);

    // image wrapper
    var imageWrapper = document.createElement('div')
    imageWrapper.classList.add('cjco-ei-popup-img-wrapper');
    if(imgColumn == "right"){
        popupInnerCol2.append(imageWrapper);
    }else{
        popupInnerCol1.append(imageWrapper);
    }

    // create image
    var colImage = document.createElement('img')
    colImage.classList.add('cjco-ei-popup-img');
    colImage.setAttribute('src', imgUrl)
    colImage.setAttribute('srcset', imgUrl)
    imageWrapper.append(colImage);

    // content wrapper
    var contentWrapper = document.createElement('div')
    contentWrapper.classList.add('cjco-ei-popup-content-wrapper');
    if(imgColumn == "right"){
        popupInnerCol1.append(contentWrapper);
    }else{
        popupInnerCol2.append(contentWrapper);
    }

    // create heading
    var headingEl = document.createElement('h2')
    headingEl.classList.add('cjco-ei-popup-heading');
    headingEl.innerHTML = heading;
    contentWrapper.append(headingEl);

    // create body text
    var bodyTextEl = document.createElement('p')
    bodyTextEl.classList.add('cjco-ei-popup-body-text');
    bodyTextEl.innerHTML = bodyText;
    contentWrapper.append(bodyTextEl);

    // create btn wrapper
    var buttonWrap = document.createElement('div')
    buttonWrap.classList.add('cjco-ei-popup-btn-wrap');
    contentWrapper.append(buttonWrap);

    // create btn 1
    var button1 = document.createElement('a')
    button1.classList.add('cjco-ei-popup-button', 'cjco-ei-popup-button-1', radius);
    button1.setAttribute('href', btn1Link)
    button1.innerHTML = btn1text;
    button1.style.backgroundColor = btn1Bg
    button1.style.borderColor = btn1Bg
    button1.style.color = btn1Color
    buttonWrap.append(button1);

    // create btn 2
    var button2 = document.createElement('a')
    button2.classList.add('cjco-ei-popup-button', 'cjco-ei-popup-button-2', radius);
    button2.setAttribute('href', btn2Link)
    button2.innerHTML = btn2text;
    button2.style.backgroundColor = btn2Bg
    button2.style.borderColor = btn2Bg
    button2.style.color = btn2Color
    buttonWrap.append(button2);

    docBody.append(mainPopupWrapper)

    function showPopup(){
        mainPopupWrapper.classList.add('open');
        mainPopupWrapper.setAttribute('aria-hidden', false);
        gsap.fromTo('.cjco-ei-popup-inner', {
            opacity: 0,
            translateY: 600
        },{
            opacity: 1,
            translateY: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.75)"
        })
    }

    function closePopup(){
        mainPopupWrapper.classList.remove('open');
        mainPopupWrapper.setAttribute('aria-hidden', true);
        gsap.to('.cjco-ei-popup-inner', {
            opacity: 0,
            translateY: 600,
            duration: 1.5,
            ease: "elastic.in(1, 0.75)"
        })
    }

    var isExitIntentShown = false;

    function handleExitIntent() {

        var lastVisit = localStorage.getItem('lastVisit');
        var currentTimestamp = Date.now();

        if(day_interval){
            if (!lastVisit || currentTimestamp - lastVisit >= intervalInMills) {
                if (!isExitIntentShown) {
                    isExitIntentShown = true;
                    document.removeEventListener('mouseout', mouseOutEvent);
                    localStorage.setItem('lastVisit', currentTimestamp);
                    showPopup();
                }
            }
        }else{
            if (!isExitIntentShown) {
                isExitIntentShown = true;
                document.removeEventListener('mouseout', mouseOutEvent);
                localStorage.setItem('lastVisit', currentTimestamp);
                showPopup();
            }
        }
        
    }

    const mouseOutEvent = e => {
        mouseY = e.clientY;
        if (!e.toElement && !e.relatedTarget) {
            handleExitIntent()
        }
    };

    window.addEventListener('touchmove', function(e) {
        if (!isExitIntentShown) {
          handleExitIntent();
        }
    });

    document.addEventListener('mouseout', mouseOutEvent);
    closeButton.addEventListener('click', closePopup)
    popupBackdrop.addEventListener('click', closePopup)
}

module.exports = {
    intent: function (data) {
        new myFunction(data);
    }
}