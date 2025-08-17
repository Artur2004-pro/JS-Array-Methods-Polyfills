Array.prototype.myAt = function(index) {
    if (typeof index !== "number") {
        throw new TypeError('');
    }
    if (index >= this.length) {
        return undefined;
    } 
    if (index < 0) {
        index += this.length;
        if (index < 0) {
            return undefined;
        }
    }
    return this[index];
}

Array.prototype.myConcat = function(...args) {
    const res = [...this];
    for (let item of args) {
        if (Array.isArray(item)) {
            res.push(...item);
        }
        else {
            res.push(item);
        }
    }    
    return res;
}

Array.prototype.myCopyWithin = function(target = 0, start = 0, end = this.length) {  
    target = Number(target);
    start = Number(start);
    end = Number(end);
    if (start < 0) {
        if (start < -this.length) {
            start = 0;
        } else {
            start += this.length;
        }
    } else if (start > this.length) {
        return this;
    }
    if (end < 0) {
        if (end < -this.length) {
            end = 0;
        } else {
            end += this.length;
        }
    } else if (end > this.length) {
        end = this.length
    }
    if (end <= start) {
        return this;
    }
    if (target < 0) {
        if (target < -this.length) {
            target = 0;
        } else {
            target += this.length;
        }
    } else if (target > this.length) {
        return this;
    }    
    let arr = [...this];
    let i = target;
    while (start < end) {
        this[i++] = arr[start++];
    }
    return this;
}

Array.prototype.myEntries = function() {
    const arr = this;
    let index = 0;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index >= arr.length) {
                return {value: undefined, done: true};
            }
            return {value: [index, arr[index++]], done: false}
        }
    }
}

Array.prototype.myFill = function(value, start = 0, end = this.length) {
    start = Number(start);
    end = Number(end);
    if (start < 0) {
        if (start <= -this.length) {
            start = 0;
        } else {
            start += this.length;
        }
    } else {
        if (start > this.length) {
            return this;
        }
    }
    if (end < 0) {
        if (end <= -this.length) {
            end = 0;
        } else {
            end += this.length;
        }
    } else{
        if (end > this.length) {
            end = this.length
        }
    }
    if (end < start) {
        return this;
    }
    while (start < end) {
        this[start++] = value;
    }
    return this;
}

Array.prototype.myFilter = function(callback, thisArg) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }
    const res = [];
    for (let i = 0; i < this.length; ++i) {
        if (callback.call(thisArg, this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
}


Array.prototype.myReduce = function(callback, initialValue) {
    if (typeof callback != "function") {
        throw new TypeError("Callback must be a function");
    }
    let i = 0;
    let acc;
    if (typeof initialValue !== "undefined") {
        acc = initialValue;
    } else {
        if (this.length === 0) {
            throw new TypeError("myReduce of empty array with no initial value")
        }
        acc = this[0];
        i = 1;
    }    
    for(; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) {
            continue;
        }
        acc = callback(acc, this[i], i, this);
    }

    return acc;
}   

Array.prototype.myMap = function(callback) {
    if (typeof callback != "function") {
        throw new TypeError("Callback must be a function");
    }
    const arr = [];
    for(let i = 0; i < this.length; ++i) {
        arr[i] = callback(this[i], i, this);
    }
    return arr;
}

Array.prototype.myEvery = function(callback) {
    if (typeof callback != "function") {
        throw new TypeError("Callback must be a function");
    }
    for (let i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) {
            continue;
        }
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
}

Array.prototype.mySome = function(callback) {
    if (typeof callback != "function") {
        throw new TypeError("Callback must be a function");
    }

    for (let i = 0; i < this.length; ++i) {
        if (!this.hasOwnProperty(i)) {
            continue;
        }
        if (callback(this[i], i, this)) {
            return true;
        }
    }
    return false;
}

Array.prototype.myIncludes = function(searchElement, fromIndex = 0) {
    if (fromIndex < 0) {
        fromIndex += this.length;
        if (fromIndex >= this.length) {
            return false;
        }
    }
    // if searchElement --> NaN
    if (searchElement !== searchElement) { 
        for (let i = fromIndex; i < this.length; ++i) {        
            if (this[i] !== this[i]) {
                return true;
            }
        }
        return false;
    }
    for (let i = fromIndex; i < this.length; ++i) {
        if (this[i] === searchElement) {
            return true;
        }        
    }
    return false;
}

Array.prototype.myFind = function(callback, thisArg) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }

    for (let i = 0; i < this.length; ++i) {
        const value = this[i];
        if (callback.call(thisArg, value, i, this)) {
            return this[i];
        }
        
    }
    return undefined;
}

Array.prototype.myFindLast = function(callback, thisArg) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }

    for (let i = this.length - 1; i >= 0; --i) {
        if (Object.hasOwn(this, i)) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
    }
    return undefined;
}

Array.prototype.findIndex = function(callback, thisArg) {
    if(typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }
    if (typeof thisArg !== "undefined") {
        for (let i = 0; i < this.length; ++i) {
            if(callback.call(thisArg, this[i], i, this)) {
                return i;
            }
        }
        return -1;
    } else {
        for (let i = 0; i < this.length; ++i) {
            if (callback(this[i], i , this)) {
                return i;
            }
        }
    }
    return -1;
}

Array.prototype.myFindLastIndex = function(callback, thisArg) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }

    for (let i = this.length -1; i >= 0; --i) {
        const value = this[i];
        if (callback.call(thisArg, value, i, this)) {
            return i;
        }
    }
    return -1;
}

Array.prototype.myFlat = function(depth = 1) {
    if (!Array.isArray(this)) {
        throw new TypeError("flat called on non-array");
    }
    if (typeof depth != "number") {
        throw new TypeError("");
    }
    if (depth !== depth || depth < 0) {
        throw new TypeError("Depth must be a non-negative number")
    }

    if (depth <= 0) {
        return this.slice();
    }

    const flat = (array, depth, arr = []) => {
        for (let i = 0; i < array.length; ++i) {
            if (!array.hasOwnProperty(i)) {
                continue;
            }
            if (Array.isArray(array[i])) {
                if (depth > 1) {
                    flat(array[i], depth - 1, arr);
                } else {
                    let tmp = array[i];
                    for (let j = 0; j < tmp.length; ++j) {
                        if (!tmp.hasOwnProperty(j)) {
                            continue;
                        }
                        arr.push(tmp[j]);
                    } 
                }
            } else {
                arr.push(array[i]);
            }
        }
        return arr;
    }
    return flat(this, depth);
}

Array.prototype.myFlatMap = function(callback, thisArg) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }
    const arr = [];
    for (let i = 0; i < this.length; ++i) {
        arr.push(callback.call(thisArg, this[i], i, this));
    }
    const res = [];
    for (let i = 0; i < arr.length; ++i) {
        if (Array.isArray(arr[i])) {
            res.push(...arr[i]);
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

Array.prototype.myForEach = function(callback, thisArg) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }
    for (let i = 0; i < this.length; ++i) {
        if (Object.hasOwn(this, i)) {
            callback.call(thisArg, this[i], i, this);
        }
    }
}

Array.prototype.myIndexOf = function(searchElement, fromIndex = 0) {
    fromIndex = Number(fromIndex);
    if (fromIndex < 0) {
        if (fromIndex < -this.length) {
            fromIndex = 0;
        } else {
            fromIndex += this.length;
        }
    } 
    if (fromIndex >= this.length) {
        return -1;
    }
    
    for (let i = fromIndex; i < this.length; ++i) {
        if (Object.hasOwn(this, i)) {
            if (searchElement === this[i]) {
                return i;
            }
        }
    }
    return -1;
}

Array.prototype.myJoin = function(separator) {
    if (typeof separator == "undefined") {
        separator = ",";
    }
    let res = "";
    if (this.length < 1) {
        return res;
    }
    if (this.length === 1) {
        return res + this[0];
    } 
    for (let i = 0; i < this.length; ++i) {
        if (i + 1 === this.length) {
            res += this[i] ?? "";
            break;
        }
        res += this[i] + separator;
    } 
    return res;
}

Array.prototype.myKeys = function() {
    const arr = this;
    let index = 0;
    return {
        [Symbol.iterator](){
            return this;
        },
        next(){
            while (index < arr.length) {
                if (Object.hasOwn(arr, index)) {
                    return {value: index++, done: false};
                } else {
                    index++;
                }
            }
            return {value: undefined, done: true};
        }
    }
}

Array.prototype.myLasIndexOf = function(searchElement, fromIndex) {
    if (typeof fromIndex === "undefined") {
        fromIndex = this.length -1;
    }
    if (fromIndex < -this.length) {
        return -1;
    } else if (fromIndex >= this.length) {
        fromIndex = this.length -1
    }
    if (fromIndex < 0) {
        fromIndex += this.length;
    }

    for (let i = fromIndex; i >= 0; --i) {
        if (Object.hasOwn(this, i)) {
            if (searchElement === this[i]) {
                return i;
            }
        }
    }
    return -1;
}

Array.prototype.myPop = function() {
    if (this.length === 0) {
        return undefined;
    }
    let lasindex = this.length -1;
    const deletedElm = this[lasindex];
    delete this[lasindex];
    this.length = lasindex;
    return deletedElm;
}


Array.prototype.myPush = function(...params) {
    let count = params.length;
    for (let i = 0; i < count; ++i) {
        this[this.length + i] = params[i];
    }
    this.length += count;
    return this.length;
}

Array.prototype.myReduceRight = function(callback, initialValue) {
    if (typeof callback != "function") {
        throw new TypeError('');
    }
    if (this.length == 0 && initialValue === undefined) {
        throw new TypeError('');
    }
    let index = this.length -1;
    if (typeof initialValue == "undefined") {
        for (let i = this.length -1; i >= 0; --i) {
            if (!Object.hasOwn(this, i)) {
                continue;
            } 
            initialValue = this[i];
            index = i;
            break;
        }
    }
    let acc = initialValue;
    for (let i = index -1; i >= 0; --i) {
        if (!Object.hasOwn(this, i)) {
            continue;
        }
        acc = callback(acc, this[i], i, this);
    }

    return acc;
}

Array.prototype.myReverse = function() {
    let start = 0;
    let end = this.length-1;
    while(start < end) {
        ;[this[start],this[end]] = [this[end],this[start]];
        start++;
        end--;
    }
    return this;
}

Array.prototype.myShift = function(){
    let len = this.length -1;
    const deletedElm = this[0];
    for(let i = 1; i <= len; ++i) {
        this[i-1] = this[i] 
    }
    delete this[len];
    this.length = len;
    return deletedElm;
}

Array.prototype.mySlice = function(start = 0, end) {
    if (start == 0 && typeof end == "undefined") {
        return true;
    }
    if (typeof start != "number") {
        throw new TypeError('');
    }
    if (typeof end == "undefined") {
        end = this.length;
    }
    if (typeof end != "number") {
        throw new TypeError('');
    }
    if (start < -this.length) {
        start = 0;
    } else if (start < 0) {
        start += this.length;
    } else {
        if (start > this.length) {
            return [];
        }
    }
    if (end < -this.length) {
        end = 0;
    } else if (end < 0) {
        end += this.length;
    } else {
        end = this.length;
    }
    let res = [];
    while(start < end) {
        res.push(this[start++]);
    }
    return res;
}

Array.prototype.mySplice = function(start = 0, deleteCount = Infinity, ...args) {
    if (typeof start != "number" || typeof deleteCount != "number") {
        throw new TypeError('');
    }
    if (start < 0) {
        if (start < -this.length) {
            start = 0;
        } else {
            start += this.length;
        }
    } else {
        if (start >= this.length) {
            deleteCount = 0;
        }
    } if (deleteCount > this.length) {
        deleteCount = this.length - start;
    }

    const deletedElms = [];
    for (let i = 0; i < deleteCount; ++i) {
        deletedElms.push(this[start+i])
    }
    let tmp = [];
    for (let i = start + deleteCount; i < this.length; ++i) {
        tmp.push(this[i]);
    }
    this.length = start;
    for (let i = 0; i < args.length; ++i) {
        this.push(args[i]);
    } 
    this.push(...tmp);
    return deletedElms;
}

Array.myFrom = function(arrayLike, mapFn, thisArg) {
    if (typeof thisArg == "undefined") {
        thisArg = this;
    }
    const proto = Object.getPrototypeOf(arrayLike);
    const arr = [];
    if (typeof proto[Symbol.iterator] != "function") {
        if (typeof mapFn === "function") {
            arr.push(mapFn.call(thisArg, arrayLike, 0, arrayLike));
        } else {
            arr.push(arrayLike);
        }
    } else {
        if (typeof mapFn === "function") {
            let index = 0;
            for (let elm of arrayLike) {
                arr.push(mapFn.call(thisArg, elm, index, arrayLike));
                index++;
            }
        } else {
            arr.push(...arrayLike);
        }
    }
    return arr;
}

Array.myIsArray = function(arg) {
    if (typeof arg != 'object') {
        return false;
    }

    return Object.prototype.toString.call(arg) === '[object Array]';
}

Function.prototype.myCall = function(context, ...params) {
    context ??= globalThis;
    let fn = Symbol('');
    context[fn] = this;
    const res = context[fn](...params);
    delete context[fn];
    return res;
}

Function.prototype.myApply = function(context, paramsArr) {
    context ??= globalThis;
    let fn = Symbol('');
    context[fn] = this;
    let res;
    if (paramsArr == undefined) {
        res = context[fn]();
    } else {
        res = context[fn](...paramsArr);
    }
    delete context[fn];
    return res;
}

Function.prototype.myBind = function(context, ...params) {
    context ??= globalThis;
    let fn = Symbol('');
    return (...args) => {
        if(new.target == undefined) {
            context[fn] = this;
        }
        let allParams = [...params, ...args];
        const res =  context[fn](...allParams);
        delete context[fn];
        return res;
    }
}

