const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function (selector) {
  if (typeof selector === "string") {
    let arr = Array.from(document.querySelectorAll(selector))
    let dnc = new DOMNodeCollection(arr);
    return dnc;
  } else if (selector instanceof HTMLElement){
    let dnc = new DOMNodeCollection([selector]);
    return dnc;
  } else {}
};
