(function(root, factory){
  if(typeof define === 'function' && define.amd){
      define([], function(){
          return factory(root);
      });
  }else if(typeof exports === 'object'){
      module.exports = factory(root);
  }else{
      root.beforeEffectslider = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function(root){

'use strict';

const logError = message => console.log(`%c ${message} `, "color:red;font-weight:bold;");

const createNode = element => document.createElement(element);

const append = (parent, el) => parent.appendChild(el);

const onMultiListener = (el, s, fn)  => {
  s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

const setAttributes = elem => {
    for (let i = 1; i < arguments.length; i+=2) {
        elem.setAttribute(arguments[i], arguments[i+1]);
    }
}

const supports = 'querySelectorAll' in document && 'addEventListener' in root;

const beforeEffectslider = options => {

    if(!supports) return logError("beforeEffectslider is not supported on this browser");
    if(!!options && typeof options !== 'object') return logError("Option error, please check the documentation");

    const defaults = {
      Selector: "#beforeEffectslider",
      Vertical: false,
      BeforeImage: "https://raw.githubusercontent.com/aminejafur/before-effect-slider.js/master/img/before.jpg",
      BeforeAlt: "Before image",
      AfterImage: "https://raw.githubusercontent.com/aminejafur/before-effect-slider.js/master/img/after.jpg",
      AftereAlt: "After image",
      DragFrom:50,
      MaxDrag: 0,
      MinDrag: 30,
      DragIcon: 'â†”',
      IconSize: '24',
      IconColor:'#FFF',
      LineColor:'#282828',
      ButtonGradient:['#282828','#000000'],
      ButtonBorder:'#000000',
      ButtonRaduis:50,
      Cursor:'ew-resize',
      Buttons:true,
      ButtonsText:{
        before:'Before',
        after:'After'
      },
      Border:{
              width:5,
              style:'solid',
              color:'black'
             },
      callbackBefore: () => {},
      callbackAfter: () => {}
    };

  if(!!options){
    if(!!options.Border){
      Object.assign(options.Border, Object.assign(defaults.Border, options.Border));
    }
    if(!!options.ButtonsText){
      Object.assign(options.ButtonsText, Object.assign(defaults.ButtonsText, options.ButtonsText));
    }
  } 

  Object.assign(defaults, options || {});

  const mainElement = document.querySelector(defaults.Selector);

  (root.beforeEffectsliderElements = root.beforeEffectsliderElements || []).push(mainElement);

  if(!!!mainElement){
      logError(`beforeEffectslider : Error cannot find ${defaults.Selector} element`);
      return false;
  }

  let mainDiv = null , 
    beforeImage = null , 
    resizeDiv = null , 
    afterImage = null , 
    handler = null;

  let mainDivClass = '.before-effect-main-div',
      resizableDivClass = '.before-effect-resizable-div',
      lineClass = 'before-effect-line',
      pluginBeforeButton = 'before-effect-button',
      pluginLeftButton = 'after-effect-button',
      pluginRightButton = 'before-effect-button-right',
      dragginClass = 'dragging',
      resizingClass = 'resizable';

  const beforeEffect = {
        init: function() {
                defaults.callbackBefore();

                mainDiv = createNode("div");
                mainDiv.classList.add('before-effect-main-div');
                beforeImage = createNode("img");
                beforeImage.src=defaults.BeforeImage;
                beforeImage.alt=defaults.BeforeAlt;

                mainDiv.style.border = `${defaults.Border.width}px ${defaults.Border.style} ${defaults.Border.color} `;

                append(mainDiv,beforeImage);

                resizeDiv = createNode("div");
                resizeDiv.classList.add('before-effect-resizable-div');

                if(defaults.Buttons){

                let beforeButton = createNode("div");
                beforeButton.classList.add(pluginBeforeButton);
                beforeButton.classList.add(pluginRightButton);
                beforeButton.innerHTML = defaults.ButtonsText.before

                append(mainDiv,beforeButton); 
                let afterButton = createNode("div");
                afterButton.classList.add(pluginBeforeButton);
                afterButton.classList.add(pluginLeftButton);
                afterButton.innerHTML = defaults.ButtonsText.after

                append(resizeDiv,afterButton); 
                } 

                resizeDiv.style.width = defaults.Vertical ? '100%' : `${defaults.DragFrom}%`;
                resizeDiv.style.height = defaults.Vertical ? `${defaults.DragFrom}%` : '100%';

                afterImage = createNode("img");
                afterImage.src=defaults.AfterImage;
                afterImage.alt=defaults.AftereAlt;
                append(resizeDiv,afterImage);
                append(mainDiv,resizeDiv);
              
                handler = createNode("span");
                handler.classList.add(lineClass);

                handler.style.setProperty('--icon',`"${defaults.DragIcon}"`)
                handler.style.setProperty('--LineColor',`${defaults.LineColor}`)
                handler.style.setProperty('--buttonG1',`${defaults.ButtonGradient[0]}`)
                handler.style.setProperty('--buttonG2',`${defaults.ButtonGradient[1]}`)
                handler.style.setProperty('--ButtonBorder',`${defaults.ButtonBorder}`)
                handler.style.setProperty('--ButtonRaduis',`${defaults.ButtonRaduis}%`)
                handler.style.setProperty('--IconSize',`${defaults.IconSize}px`)
                handler.style.setProperty('--IconColor',`${defaults.IconColor}`)
                handler.style.setProperty('--Cursor',`${defaults.Cursor}`)
                
                handler.style.top = defaults.Vertical ? `${defaults.DragFrom}%` : '0';
                handler.style.left = defaults.Vertical ? '0' : `${defaults.DragFrom}%`;
                handler.style.width = defaults.Vertical ? '100%' : '4px';
                handler.style.height = defaults.Vertical ? '4px' : '100%';
                handler.style.setProperty('--IconPosT',defaults.Vertical ? '0' : '50%')
                handler.style.setProperty('--IconPosR',defaults.Vertical ? '50%' : '-27')

                append(mainDiv,handler);
              
                append(mainElement,mainDiv);

                this.adjustwidth();

                window.onresize = function(){
                  this.adjustwidth()
                }.bind(this)

                defaults.callbackAfter();

                this.draggingStarted(handler, resizeDiv, mainDiv);
        },
        adjustwidth: function() {
              [...beforeEffectsliderElements].forEach(el => {
                mainDiv = el.querySelector(mainDivClass);
                let width = mainDiv.getBoundingClientRect().width+'px';

                mainDiv.querySelector(resizableDivClass).querySelector('img').style.width = width;
                mainDiv.querySelector('img').style.width = width;
              })
        },
        draggingStarted: function(dragdHandler, resizableImage, parentNode) {
            
            onMultiListener(dragdHandler, 'mousedown touchstart', e => {
        
              dragdHandler.classList.add(dragginClass);
              resizableImage.classList.add(resizingClass);
              
              let CursorStartPos = defaults.Vertical 
                    ? (e.pageY) 
                      ? e.pageY 
                      : e.originalEvent.touches[0].pageY 
                    : (e.pageX) 
                      ? e.pageX 
                      : e.originalEvent.touches[0].pageX;

              let parentNodeBorder = parseInt(parentNode.style.borderWidth.replace(/px|%|/g,  (x) => '')),
                  dragOffset_h_w = defaults.Vertical ? dragdHandler.offsetHeight : dragdHandler.offsetWidth,
                  dragOffset_t_l = defaults.Vertical ? dragdHandler.offsetTop : dragdHandler.offsetLeft,
                  calcPos = dragOffset_t_l + dragOffset_h_w + parentNodeBorder - CursorStartPos,
                  parentNodeOffset = defaults.Vertical ? parentNode.offsetHeight : parentNode.offsetWidth;

              let minDrag = defaults.MinDrag;
              let MaxDrag = parentNodeOffset - dragOffset_h_w - defaults.MaxDrag;
              
              onMultiListener(parentNode, 'mousemove touchmove', e => {

                let cursorCurrentPos = defaults.Vertical 
                    ? (e.pageY) 
                      ? e.pageY 
                      : e.originalEvent.touches[0].pageY 
                    : (e.pageX) 
                      ? e.pageX 
                      : e.originalEvent.touches[0].pageX;
          
                let leftOrTopValue = cursorCurrentPos + calcPos - dragOffset_h_w;
                
                if ( leftOrTopValue < minDrag) {
                  leftOrTopValue = minDrag;
                } else if (leftOrTopValue > MaxDrag) {
                  leftOrTopValue = MaxDrag;
                }
                
                let currentDragPosition = (leftOrTopValue + dragOffset_h_w/2)*100/parentNodeOffset+'%';

                if(!!document.querySelector(`.${dragginClass}`)){ 
                  if(defaults.Vertical){
                    document.querySelector(`.${dragginClass}`).style.top = currentDragPosition;
                    resizableImage.style.height = currentDragPosition;
                  }else{
                    document.querySelector(`.${dragginClass}`).style.left = currentDragPosition;
                    resizableImage.style.width = currentDragPosition;
                  }
              }
          
              });
        
              onMultiListener(parentNode, 'mouseup touchend touchcancel', e => {
                dragdHandler.classList.remove(dragginClass);
                resizableImage.classList.remove(resizingClass);
              });

              e.preventDefault();
            });
              onMultiListener(root, 'mouseup', e => {
                dragdHandler.classList.remove(dragginClass);
                resizableImage.classList.remove(resizingClass);
              });
        },
  }

  return beforeEffect.init();
}

  return beforeEffectslider;

});
