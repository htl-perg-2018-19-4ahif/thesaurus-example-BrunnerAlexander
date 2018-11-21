var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('openthesaurus.txt');

try{
    if(process.argv.length < 3){
        throw new Error("Please specify words");
    }

    let counter:number = 3;
    while(counter <= process.argv.length){
        searchWord(process.argv[counter-1]);
        counter++;
    }

} catch (err){
    console.log(err.message);
}


function searchWord(search:string){
    let arr:string[];
    let found:boolean = false;

    lr.on('line', function (line:string) {

        arr = line.split(";");
        for(let i of arr){
            if(i.indexOf(search) >= 0){
                printResult(arr, search, i == search);
                found = true;
            }
        }
        
    });

    lr.on('end', function () {
        try{
            if(found == false){
                throw new Error("No matches found");
            }
        }catch(err){
            console.log(err.message);
        }
    });

}


function printResult(arr:String[], search:string, perfectMatch:boolean){
    if(perfectMatch){
        console.log(`${search}:`);
    }else{
        console.log(`${search} (teilweise):`);
    }
    for(let i = 0; i<arr.length; i++){
        console.log(`\t${arr[i]}`);
    }
}