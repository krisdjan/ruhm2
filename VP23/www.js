const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const pageHead = '<!DOCTYPE html><html>\n<head>\n<meta charset="utf-8">\n<title>kristjansarv vp2023</title>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner23.png" alt="Lehe banner">\n';
const pageBody = '<h1>Kristjan Sarv</h1>\n<h5>Informaatika 1. kursuse tudeng</h5>\n<hr>\n<p>more passion, more energy, more footwork</p>\n<hr>\n<p>kursus, mille laades veebileht tehti, on veebiprogrammeerimine</p>\n<p>Leht on loodud <a href="https://www.tlu.ee/" target="_blank">TLÜ-DTI</a> õppetöö raames 07.09.2023 12.55</p>';

http.createServer(function(req, res) {
    console.log(url.parse(req.url, true));
    let currentURL = url.parse(req.url, true);

    if (currentURL.pathname === "/") {

        //määrame tagastatave andmete päise, et on veebileht
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('<p><a href="addName">Lisame nime</a>!</p>')
        //saadab ära
        return res.end();
    } else if (currentURL.pathname === "/addName"){
        
        //määrame tagastatave andmete päise, et on veebileht
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('<h2>Palun lisa oma nimi</h2>')
        //saadab ära
        return res.end();


    } else if (currentURL.pathname === "/banner23.png") { 
        let filePath = path.join(__dirname, "public", "banner/banner23.png");
        fs.readFile(filePath, (err, data) => {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.end(data);
            }
        });
    }

}).listen(5218);
