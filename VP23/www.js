const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { parse } = require("querystring");
const dateInfo = require("./date_timeET");
const pageHead = '<!DOCTYPE html><html>\n<head>\n<meta charset="utf-8">\n<title>kristjansarv vp2023</title>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner23.png" alt="Lehe banner">\n';
const pageBody = '<h1>Kristjan Sarv</h1>\n<h5>Informaatika 1. kursuse tudeng</h5>\n<hr>\n<p>more passion, more energy, more footwork</p>\n<hr>\n<p>kursus, mille laades veebileht tehti, on veebiprogrammeerimine</p>\n<p>Leht on loodud <a href="https://www.tlu.ee/" target="_blank">TLÜ-DTI</a> õppetöö raames 07.09.2023 12.55</p>';

http.createServer(function(req, res) {
    if (req.method === 'POST') {
        //res.end("tuligi Post");
        /*
        collectRequestData(req,result => {
            res.write(result);
            res.end();
        });
        */
        fs.open('public/log.txt', 'a', (err, file) => {
        if (err) {
            throw err
        } else {
            fs.appendFile('public/log.txt', 'tekst lisatud', (err) => {
               if (err) {
                throw err;
               } else {
                res.end('lisati tekst');
               }
            });
            fs.close(file, (err) => {
                if (err) {
                     throw err;
                    }
                });
            }
        });
     } else {
        console.log(url.parse(req.url, true));
        let currentURL = url.parse(req.url, true);

        if (currentURL.pathname === "/") {

            //määrame tagastatave andmete päise, et on veebileht
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(pageHead);
            res.write(pageBanner);
            res.write(pageBody);
            res.write('\n\t <p>lehe avamise hetk oli ' + dateInfo.dateNowET() + '. Kell oli ' + dateInfo.timeNowET());
            res.write('<p><a href="addName">Lisame nimeeeee</a>!</p>');
            res.write('<p><a href="semesterprogress">Semestri seis</a></p>');
            //saadab ära
            return res.end();

        } else if (currentURL.pathname === "/addName") {

            //määrame tagastatave andmete päise, et on veebileht
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(pageHead);
            res.write(pageBanner);
            res.write(pageBody);
            res.write('<h2>Palun lisa oma nimi</h2>')
            res.write('<form method="POST">\n<label for="nameInput">Eesnimi</label>\n<input type="text" id="nameInput" name="nameInput" placeholder="Sinu eesnimi....">\n<br>\n<label for="lastnameInput">Perekonnanimi</label>\n<input type="text" id="lastnameInput" name="lastnameInput" placeholder="Sinu perekonnanimi....">\n<input type="submit" name="submit" value="salvesta">\n</form>');
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

        } else if (currentURL.pathname === "/semesterprogress") {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(pageHead);
            res.write(pageBanner);
            res.write(pageBody);
            res.write('\n\t<hr>');
            res.write('\n\t<p><a href="/">tagasi avalehele</a></p>');
            res.write(pageFoot);
            //saadab ära
            return res.end();

        } else if (currentURL.pathname === "/tluphoto") {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(pageHead);
            res.write(pageBanner);
            res.write(pageBody);
            res.write('\n\t<hr>');
            res.write('\n\t<img src="tlu_42.jpg" alt="tlü foto">');
            res.write('\n\t <p><a href="/">tagasi avalehele</a></p>');
            res.write(pageFoot);
            //et see kõik valmiks ja ära saadetaks
            return res.end();
        } else if (currentURL.pathname === "/tlu_42.jpg") {
            console.log("tahan jpg pilti");
            let filePath = path.join(__dirname, "public", "tluphotos/tlu_42.jpg");
            fs.readFile(filePath, (err, data)=> {
                if (err) {
                    throw err;
                } else {
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    res.end(data);
                }
            });

        } else if (req.method === 'POST') {





        } else {
            res.end("ERROR 404");
        }
    }





}).listen(5218);


function tluPhotoPage(photoHTML) {
    console.log(photoHTML);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pageBody); 
    res.write('\n\t<hr>');
    res.write(photoHTML);
    res.write('\n\t<img src="tlu_42.jpg" alt="TLÜ foto">');
    res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
    res.write(pageFoot);
    //et see kõik valmiks ja ära saadetaks
    return res.end();
}

function semesterInfo() {
    let htmlOutput = '<p>info puudub</p>';
    const semesterBegin = new Date('08/28/2023');
    const semesterEnd = new Date('01/28/2024');
    const today = new Date();

    if(today < semesterBegin) {
        htmlOutput = '<p>2023/2024 sügissemester pole veel alanud</p>';
    } else if (today > semesterEnd) {
        htmlOutput = '<p>2023/20204 sügissemester on möödas</p>';
    } else {
        const semesterDuration = Math.floor((semesterEnd.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
        const semesterLastedFor = Math.floor((today.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
		htmlOutput = '<p>2023/2024 sügissemester on kestnud juba ' + semesterLastedFor + ' päeva</p>';
		htmlOutput += '\n\t <meter min="0" max="' + semesterDuration + '" value="' + semesterLastedFor + '"></meter>';
    }
    return '\n\t' + htmlOutput;

}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(receivedData));
        });
    }
    else {
        callback(null);
    }
}


