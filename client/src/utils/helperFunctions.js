import {IllegalArgumentError} from '../types/errors';


export function toAppUrl(url) {
    if(url === null || typeof url !== 'string' || arguments.length !== 1) {
        throw new IllegalArgumentError("input must be a url");
    }
    return () => window.location.replace(url);
}

export function getAppsById(selectedIds, reducerArray) {
    if(selectedIds === null || reducerArray === null || !Array.isArray(selectedIds) || arguments.length !== 2) {
        throw new IllegalArgumentError(" inputs must be an array of ids, and a reducer object");
    } 
    return filter(reducerArray, (app) => {
        return !selectedIds.includes(app.id);
    });
}

// see spec for clarification
export function filter(input, predicate) { // Note: predicate must be a function 
    if([...arguments].includes(null) || typeof predicate !== 'function') {
        throw new IllegalArgumentError("predicate must be a function");
    }
    let result = {}, key;

    // essentially the same as the above functinos
    for (key in input) {
        if (input.hasOwnProperty(key) && !predicate(input[key])) {
            result[key] = input[key];
        }
    }

    return result;
}

//https://stackoverflow.com/questions/14802481/get-element-of-js-object-with-an-index
// NOTE: the javascript notations we're using here is essentially indexing an object. example code from stackoverflor
// var myobj = {"A":["B"], "B":["C"]};

// var keysArray = Object.keys(myobj);

// var valuesArray = Object.keys(myobj).map(function(k) {

//    return String(myobj[k]);

// });

// var mydata = valuesArray[keysArray.indexOf("A")]; // B