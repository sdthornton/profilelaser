// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*
 * Vanilla Masonry v1.0.7
 * Dynamic layouts for the flip-side of CSS Floats
 * http://vanilla-masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b){function e(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function o(a,b,c){if(c.indexOf("%")===-1)return c;var d=a.style,e=d.width,f;return d.width=c,f=b.width,d.width=e,f}function p(a,b,c){var d=b!=="height",e=d?a.offsetWidth:a.offsetHeight,f=d?"Left":"Top",g=d?"Right":"Bottom",h=j(a),i=parseFloat(h["padding"+f])||0,k=parseFloat(h["padding"+g])||0,l=parseFloat(h["border"+f+"Width"])||0,m=parseFloat(h["border"+g+"Width"])||0,p=h["margin"+f],q=h["margin"+g],r,s;n||(p=o(a,h,p),q=o(a,h,q)),r=parseFloat(p)||0,s=parseFloat(q)||0;if(e>0)c?e+=r+s:e-=i+k+l+m;else{e=h[b];if(e<0||e===null)e=a.style[b]||0;e=parseFloat(e)||0,c&&(e+=i+k+r+s+l+m)}return e}function q(b,c,d){b.addEventListener?b.addEventListener(c,d,!1):b.attachEvent&&(b["e"+c+d]=d,b[c+d]=function(){b["e"+c+d](a.event)},b.attachEvent("on"+c,b[c+d]))}function r(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&(a.detachEvent("on"+b,a[b+c]),a[b+c]=null,a["e"+b+c]=null)}function s(a,b){if(!a)return;this.element=a,this.options={};for(var c in s.defaults)this.options[c]=s.defaults[c];for(c in b)this.options[c]=b[c];this._create(),this.build()}"use strict";var c=a.document,d="classList"in c.createElement("div"),f=d?function(a,b){return a.classList.contains(b)}:function(a,b){return e(b).test(a.className)},g=d?function(a,b){a.classList.add(b)}:function(a,b){f(a,b)||(a.className=a.className+" "+b)},h=d?function(a,b){a.classList.remove(b)}:function(a,b){a.className=a.className.replace(e(b)," ")},i=c.defaultView,j=i&&i.getComputedStyle?function(a){return i.getComputedStyle(a,null)}:function(a){return a.currentStyle},k=c.getElementsByTagName("body")[0],l=c.createElement("div"),m=k||c.createElement("body");l.style.marginTop="1%",m.appendChild(l);var n=j(l).marginTop!=="1%";m.removeChild(l);var t=["position","height"];s.defaults={isResizable:!0,gutterWidth:0,isRTL:!1,isFitWidth:!1},s.prototype={_getBricks:function(a){var b;for(var c=0,d=a.length;c<d;c++)b=a[c],b.style.position="absolute",g(b,"masonry-brick"),this.bricks.push(b)},_create:function(){this.reloadItems();var b=this.element.style;this._originalStyle={};for(var c=0,d=t.length;c<d;c++){var e=t[c];this._originalStyle[e]=b[e]||""}this.element.style.position="relative",this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={};var f=j(this.element),h=this.options.isRTL?"paddingRight":"paddingLeft";this.offset.y=parseFloat(f.paddingTop)||0,this.offset.x=parseFloat(f[h])||0,this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var i=this;setTimeout(function(){g(i.element,"masonry")}),this.options.isResizable&&q(a,"resize",function(){i._handleResize()})},build:function(a){this._getColumns(),this._reLayout(a)},_getColumns:function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,b=p(a,"width");this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||p(this.bricks[0],"width",!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},reloadItems:function(){this.bricks=[],this._getBricks(this.element.children)},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.bricks,a)},layout:function(a,b){if(!a||!a.length)return;var c,d,e,f,g,h,i;for(var j=0,k=a.length;j<k;j++){c=a[j];if(c.nodeType!==1)continue;d=Math.ceil(p(c,"width",!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)i=this.colYs;else{e=this.cols+1-d,i=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),i[h]=Math.max.apply(Math,g)}var l=Math.min.apply(Math,i);for(var m=0,n=i.length;m<n;m++)if(i[m]===l)break;c.style.top=l+this.offset.y+"px",c.style[this.horizontalDirection]=this.columnWidth*m+this.offset.x+"px";var o=l+p(c,"height",!0),q=this.cols+1-n;for(h=0;h<q;h++)this.colYs[m+h]=o}var r={};this.element.style.height=Math.max.apply(Math,this.colYs)+"px";if(this.options.isFitWidth){var s=0;j=this.cols;while(--j){if(this.colYs[j]!==0)break;s++}this.element.style.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth+"px"}b&&b.call(a)},_handleResize:function(){function b(){a.resize(),a._resizeTimeout=null}var a=this;this._resizeTimeout&&clearTimeout(this._resizeTimeout),this._resizeTimeout=setTimeout(b,100)},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},reload:function(a){this.reloadItems(),this.build(a)},appended:function(a,b,c){var d=this,e=function(){d._appended(a,c)};if(b){var f=p(this.element,"height")+"px";for(var g=0,h=a.length;g<h;g++)a[g].style.top=f;setTimeout(e,1)}else e()},_appended:function(a,b){this._getBricks(a),this.layout(a,b)},destroy:function(){var b;for(var c=0,d=this.bricks.length;c<d;c++)b=this.bricks[c],b.style.position="",b.style.top="",b.style.left="",h(b,"masonry-brick");var e=this.element.style;d=t.length;for(c=0;c<d;c++){var f=t[c];e[f]=this._originalStyle[f]}h(this.element,"masonry"),this.resizeHandler&&r(a,"resize",this.resizeHandler)}},s.getWH=p,a.Masonry=s})(window);


/*
 * jQuery Transition - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);


/*
 * Fast Buttons
 */
 (function() {
  /** 
   * From: http://code.this.com/mobile/articles/fast_buttons.html
   * Also see: http://stackoverflow.com/questions/6300136/trying-to-implement-googles-fast-button 
   */
   
  /** For IE8 and earlier compatibility: https://developer.mozilla.org/en/DOM/element.addEventListener */
  function addListener(el, type, listener, useCapture) {
    if (el.addEventListener) { 
      el.addEventListener(type, listener, useCapture);
      return { 
        destroy: function() { el.removeEventListener(type, listener, useCapture); } 
      };
    } else {      
      // see: http://stackoverflow.com/questions/5198845/javascript-this-losing-context-in-ie
      var handler = function(e) { listener.handleEvent(window.event, listener); }
      el.attachEvent('on' + type, handler);
      
      return { 
        destroy: function() { el.detachEvent('on' + type, handler); }
      };
    }   
  }
  
  var isTouch = "ontouchstart" in window;

  /* Construct the FastButton with a reference to the element and click handler. */
  this.FastButton = function(element, handler, useCapture) {
    // collect functions to call to cleanup events 
    this.events = [];
    this.touchEvents = [];
    this.element = element;
    this.handler = handler;
    this.useCapture = useCapture;
    if (isTouch) 
      this.events.push(addListener(element, 'touchstart', this, this.useCapture));    
    this.events.push(addListener(element, 'click', this, this.useCapture));
  };
  
  /* Remove event handling when no longer needed for this button */
  this.FastButton.prototype.destroy = function() {
    for (i = this.events.length - 1; i >= 0; i -= 1)
      this.events[i].destroy();    
    this.events = this.touchEvents = this.element = this.handler = this.fastButton = null;
  };
  
  /* acts as an event dispatcher */
  this.FastButton.prototype.handleEvent = function(event) {
    switch (event.type) {
      case 'touchstart': this.onTouchStart(event); break;
      case 'touchmove': this.onTouchMove(event); break;
      case 'touchend': this.onClick(event); break;
      case 'click': this.onClick(event); break;
    }
  };
  
  /* Save a reference to the touchstart coordinate and start listening to touchmove and
   touchend events. Calling stopPropagation guarantees that other behaviors don’t get a
   chance to handle the same click event. This is executed at the beginning of touch. */
  this.FastButton.prototype.onTouchStart = function(event) {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    this.touchEvents.push(addListener(this.element, 'touchend', this, this.useCapture));
    this.touchEvents.push(addListener(document.body, 'touchmove', this, this.useCapture));
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  };
  
  /* When /if touchmove event is invoked, check if the user has dragged past the threshold of 10px. */
  this.FastButton.prototype.onTouchMove = function(event) {
    if (Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
      this.reset(); //if he did, then cancel the touch event
    }
  };
  
  /* Invoke the actual click handler and prevent ghost clicks if this was a touchend event. */
  this.FastButton.prototype.onClick = function(event) {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    this.reset();
    // Use .call to call the method so that we have the correct "this": https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
    var result = this.handler.call(this.element, event);
    if (event.type == 'touchend') 
      clickbuster.preventGhostClick(this.startX, this.startY);    
    return result;
  };
  
  this.FastButton.prototype.reset = function() {
    for (i = this.touchEvents.length - 1; i >= 0; i -= 1) 
      this.touchEvents[i].destroy();    
    this.touchEvents = [];
  };
  
  this.clickbuster = function() {}
  
  /* Call preventGhostClick to bust all click events that happen within 25px of
   the provided x, y coordinates in the next 2.5s. */
  this.clickbuster.preventGhostClick = function(x, y) {
    clickbuster.coordinates.push(x, y);
    window.setTimeout(clickbuster.pop, 2500);
  };
  
  this.clickbuster.pop = function() {
    clickbuster.coordinates.splice(0, 2);
  };
  
  /* If we catch a click event inside the given radius and time threshold then we call
   stopPropagation and preventDefault. Calling preventDefault will stop links
   from being activated. */
  this.clickbuster.onClick = function(event) {
    for (var i = 0; i < clickbuster.coordinates.length; i += 2) {
      var x = clickbuster.coordinates[i];
      var y = clickbuster.coordinates[i + 1];
      if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
        event.preventDefault ? event.preventDefault() : (event.returnValue=false);
      }
    }
  };
    
  if (isTouch) {
    // Don't need to use our custom addListener function since we only bust clicks on touch devices
    document.addEventListener('click', clickbuster.onClick, true);
    clickbuster.coordinates = [];
  }
})(this);

(function($) {
  $.event.special.fastClick = {
        setup: function () {
            $(this).data('fastClick', new FastButton(this, $.event.special.fastClick.handler));
        },
        teardown: function () {
           $(this).data('fastClick').destroy();
           $(this).removeData('fastClick');
        },
        handler: function (e) {
            // convert native event to jquery event
            e = $.event.fix(e);
            e.type = 'fastClick';
        
            /*
            event.handle is deprecated and removed as of version 1.9
            use event.dispatch instead,
            $.event.handle.apply(this, arguments);
            */
            $.event.dispatch.apply(this, arguments);
        }
    };

    $.fn.fastClick = function(fn) {
        return $(this).each(function() {
            return fn ? $(this).bind("fastClick", fn) : $(this).trigger("fastClick");
        });
    };
}(jQuery));
