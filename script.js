var scrollet;
scrollet = {
  real_diff: 0,
  alert: document.createElement('DIV'),
  prepareAlert: function() {
    var a;
    a = scrollet.alert;
    a.id = 'ts_alert';
    a.innerHTML = 'Tilt scrolling enabled';
    a.style.position = 'absolute';
    a.style.zIndex = 99;
    a.style.left = 0;
    a.style.top = 0;
    a.style.opacity = 0;
    a.style.background = 'rgba(0,0,0,0.5)';
    a.style.font = 'bold 18px "Helvetica Neue", Helvetica';
    a.style.color = '#fff';
    a.style.width = '100%';
    a.style.padding = '8px 0px';
    a.style.textAlign = 'center';
    a.style.webkitTransition = 'opacity 0.2s linear';
    a.style.mozTransition = 'opacity 1s linear';
    document.getElementsByTagName('body')[0].appendChild(a);
    return window.setTimeout('scrollet.toggleAlert()', 100);
  },
  setMozDiff: function(o) {
    var diff, _ref;
    (_ref = scrollet.initial_y) != null ? _ref : scrollet.initial_y = o.y;
    diff = o.y - scrollet.initial_y;
    if (Math.abs(diff) > 0.05) {
      return scrollet.real_diff = parseInt(-10 * diff);
    } else {
      return scrollet.real_diff = 0;
    }
  },
  setDiff: function(o) {
    var diff, y_var, _ref;
    switch (window.orientation) {
      case 90:
        y_var = -0.5 * o.gamma;
        break;
      case -90:
        y_var = 0.5 * o.gamma;
        break;
      default:
        y_var = o.beta;
    }
    (_ref = scrollet.initial_y) != null ? _ref : scrollet.initial_y = y_var;
    diff = y_var - scrollet.initial_y;
    if (Math.abs(diff) > 5) {
      return scrollet.real_diff = parseInt(-0.2 * diff);
    } else {
      return scrollet.real_diff = 0;
    }
  },
  resetY: function() {
    return scrollet.initial_y = null;
  },
  setOrientation: function(e) {
    return scrollet.resetY();
  },
  moveAlert: function() {
    return scrollet.alert.style.top = window.pageYOffset + 'px';
  },
  toggleAlert: function() {
    if (parseInt(scrollet.alert.style.opacity) === 1) {
      scrollet.alert.style.opacity = 0;
      return window.setTimeout('document.getElementsByTagName("body")[0].removeChild(scrollet.alert)', 200);
    } else {
      scrollet.alert.style.opacity = 1;
      scrollet.moveAlert();
      return window.setTimeout('scrollet.toggleAlert()', 2000);
    }
  },
  scroll: function() {
    if (this.real_diff !== 0) {
      window.scrollBy(0, this.real_diff);
      return scrollet.moveAlert();
    }
  },
  setup: function() {
    window.addEventListener('MozOrientation', scrollet.setMozDiff, true);
    window.addEventListener('deviceorientation', scrollet.setDiff, true);
    window.addEventListener('orientationchange', scrollet.setOrientation, true);
    window.setInterval('scrollet.scroll()', 20);
    document.onclick = scrollet.resetY;
    document.ontouchend = scrollet.resetY;
    window.onscroll = scrollet.moveAlert;
    return scrollet.prepareAlert();
  }
};
scrollet.setup();