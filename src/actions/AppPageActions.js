import replace from 'react-router-redux';

export function toAppUrl(url) {
    return () => replace(url);
}


export function getByIdArray(selectedIds, reducerArray) {
    return selectedIds.map((id) => reducerArray[id]);
}


export function getById(reducerArray) {
    return Object.keys(reducerArray).map((id) => reducerArray[id]);
}


export function filter(obj, predicate) {
    return Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});
}





//https://stackoverflow.com/questions/14802481/get-element-of-js-object-with-an-index
// NOTE: the javascript notations we're using here is essentially indexing an object. example code from stackoverflor
// var myobj = {"A":["B"], "B":["C"]};

// var keysArray = Object.keys(myobj);

// var valuesArray = Object.keys(myobj).map(function(k) {

//    return String(myobj[k]);

// });

// var mydata = valuesArray[keysArray.indexOf("A")]; // B