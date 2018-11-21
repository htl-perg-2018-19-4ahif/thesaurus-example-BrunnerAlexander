"use strict";
var LineByLineReader = require('line-by-line'), lr = new LineByLineReader('openthesaurus.txt');
try {
    if (process.argv.length < 3) {
        throw new Error("Please specify words");
    }
    var counter = 3;
    while (counter <= process.argv.length) {
        searchWord(process.argv[counter - 1]);
        counter++;
    }
}
catch (err) {
    console.log(err.message);
}
function searchWord(search) {
    var arr;
    var found = false;
    lr.on('line', function (line) {
        arr = line.split(";");
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            if (i.indexOf(search) >= 0) {
                printResult(arr, search, i == search);
                found = true;
            }
        }
    });
    lr.on('end', function () {
        try {
            if (found == false) {
                throw new Error("No matches found");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
function printResult(arr, search, perfectMatch) {
    if (perfectMatch) {
        console.log(search + ":");
    }
    else {
        console.log(search + " (teilweise):");
    }
    for (var i = 0; i < arr.length; i++) {
        console.log("\t" + arr[i]);
    }
}
