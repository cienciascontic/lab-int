/*globals defineClass extendClass */

if (typeof ISImporter === 'undefined') ISImporter = {};

/**
  Helpers for defining classical-OO style inheritance.
  Adapted from CoffeeScript implementation.
*/
(function() {

  function mixin(dest, src) {
    var hasProp = {}.hasOwnProperty,
        key;

    for (key in src) {
      if (hasProp.call(src, key)) dest[key] = src[key];
    }
  }


  function extend(child, parent) {
    mixin(child, parent);

    function Ctor() {
      this.constructor = child;
    }
    Ctor.prototype  = parent.prototype;
    child.prototype = new Ctor();
    child.__super__ = parent.prototype;
  }


  function defineClass(classProperties) {
    var ctor = function(instanceProperties) {
       mixin(this, instanceProperties);
    };
    mixin(ctor.prototype, classProperties);
    return ctor;
  }


  function extendClass(baseClass, classProperties) {
    var ctor = function(instanceProperties) {
          mixin(this, instanceProperties);
        };
    extend(ctor, baseClass);
    mixin(ctor.prototype, classProperties);
    return ctor;
  }

  // publish defineClass, extendClass globally:
  window.defineClass = defineClass;
  window.extendClass = extendClass;
}());

/**
  Base SensorApplet class appends the appropriate HTML to the DOM.
*/
ISImporter.SensorApplet = defineClass({
  doStuff1: function() {
    console.log("doing stuff 1 as SensorApplet");
  },
  doStuff2: function() {
    console.log("doing stuff 2 as SensorApplet");
  }
});

ISImporter.GoIOApplet = extendClass(ISImporter.SensorApplet, {
  doStuff1: function() {
    console.log("doing stuff 1 as GoIOApplet");
    this.constructor.__super__.doStuff1.apply(this, arguments);
  }
});


ISImporter.main = function() {

  distanceSensor = new ISImporter.GoIOApplet({
    otmlString: 'distance'
  }),

  temperatureSensor = new ISImporter.GoIOApplet({
    otmlString: 'temperature'
  }),

  lightSensor = new ISImporter.GoIOApplet({
    otmlString: 'light'
  });

};


$(document).ready(function() {
  ISImporter.main();
});
