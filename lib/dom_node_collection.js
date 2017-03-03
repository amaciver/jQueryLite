class DOMNodeCollection {
  constructor(els){
    this.htmlElements = els;
  }

  html(string) {
    if (string === undefined) {
      return this.htmlElements[0].innerHTML;
    } else {
      this.htmlElements.forEach ((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.htmlElements.forEach ((el) => {
      el.html = "";
    });
  }

  append(...args) {
    args.forEach ( arg => {
      if (arg instanceof DOMNodeCollection) {
        let allH = arg.htmlElements.map( el => el.outerHTML).join('');
        // arg.htmlElements.forEach (argEl => {
        //   let outerH = argEl.outerHTML;
          this.htmlElements.forEach (theseEl => {
            theseEl.innerHTML += allH;
          });
        // });
      } else if (arg instanceof HTMLElement) {
        this.htmlElements.forEach (theseEl => {
          theseEl.innerHTML += arg.outerHTML;
        });
      } else {
        this.htmlElements.forEach (theseEl => {
          theseEl.innerHTML += arg;
        });
      };
    });
  }

  attr(name, value) {
    if (value === undefined) {
      return this.htmlElements[0].getAttribute(name);
    } else {
      this.htmlElements.forEach ((el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(string) {
    this.htmlElements.forEach ((el) => {
      if (!el.className.includes(string)) {
        el.className += (string + ' ');
      }
    });
  }

  removeClass(string) {
    this.htmlElements.forEach ((el) => {
      if (el.className.includes(string)) {
        let classString = el.className;
        const idx = classString.indexOf(string);
        const begin = classString.slice(0, idx);
        const end = classString.slice(idx+string.length);
        el.className = begin + end;
        console.log(begin, end);
      }
    });
  }

  children() {
    let arr = [];
    this.htmlElements.forEach ((el) => {
      arr = arr.concat(el.children);
    });
    return new DOMNodeCollection(arr);
  }

  parents() {
    let arr = [];
    this.htmlElements.forEach ((el) => {
      arr.push(el.parentNode);
    });
    return new DOMNodeCollection(arr);
  }

  find(selector) {
    let arr = [];
    this.htmlElements.forEach ((el) => {
      arr = arr.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(arr);
  }




}

module.exports = DOMNodeCollection;
