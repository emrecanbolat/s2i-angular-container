export {}

declare global {

  interface Array<T> {
    inArray(comparer: any): boolean;
    pushIfNotExist(element: any, comparer: any): void;
  }

}

Array.prototype.inArray = function(comparer) {
  for(let i = 0; i < this.length; i++) {
    if(comparer(this[i])) return true;
  }
  return false;
};

Array.prototype.pushIfNotExist = function(element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};
