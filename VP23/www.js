const http = require("http");

http.createServer(function(req, res) {
    //määrame tagastatave andmete päise, et on veebileht
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>kristjansarv vp2023</title></head><body>');
    res.write('<h1>Kristjan Sarv</h1><h5>Informaatika 1. kursuse tudeng</h5><hr><p>more passion, more energy, more footwork</p><hr><p>kursus, mille laades veebileht tehti, on veebiprogrammeerimine</p><p>Leht on loodud <a href="https://www.tlu.ee/" target="_blank">TLÜ-DTI</a> õppetöö raames 07.09.2023 12.55</p>');
    //saadab ära
    return res.end();
}).listen(5218);
