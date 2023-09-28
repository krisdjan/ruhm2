const firstName = "kristjan";
const lastName = "sarv";
const dateInfo = require("./date_timeET");
const fs = require("fs");//failisüsteemi moodul
let folkWisdom = [];

fs.readFile("txtfiles/vanasonad.txt", "utf8", (err, data)=> {
    if(err) {
        console.log(err);
    }
    else {
         
        folkWisdom = data.split(";");
        onScreen();
    
        //console.log(data);
        //console.log(folkWisdom);
        //console.log("Vanasõnu on " + folkWisdom.length + ".");
    }
}); //readFile lõppeb

const onScreen = function() {
    console.log(firstName + " " + lastName);
    console.log(dateInfo.dateNowET());
    //console.log("Tänane vanasõna on:\n " + folkWisdom[Math.floor(Math.random() * folkWisdom.length)]);
    for (let i = 0; i < folkWisdom.length; i++) {
        console.log((i + 1) + ") " + folkWisdom[i]);
    }
    console.log(dateInfo.timeNowET());
    console.log("On " + dateInfo.timeOfDayET() + ".")
}
