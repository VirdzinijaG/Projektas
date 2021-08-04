import { Server } from "net";
import * as fs from "fs/promises";
import * as path from "path";

const WEB_DIR = "web"; // direktorija, kurioje gules visas web content'as

// paleidziama funkcija
// sukuriamas naujoas objektas server
let server = new Server((socket) => {
    // console.log("kazkas prisijunge");
    // console.log(socket.localAddress,socket.localPort,socket.remoteAddress,socket.remotePort); // is kur i kur
    socket.setEncoding("utf-8"); // UTF-8 yra Unikodo tipo koduotė, kurioje vienam simboliui skiriama nuo 1 baito iki 4 baitų
    let allData = "";
    socket.on("data", async (data) => { // duomenu gavimas
        allData += data;
        let lines = allData.split("\r\n");
        if (lines.findIndex(e => e === "") !== -1) { // tikrinama gaunama eilute, is duomanu kuriuos gavau, bent viena eilute yra tuscia
            let fileName = lines[0].split(" ")[1]; // split skaido per tarpa
            let resp;
            if (fileName === "/end") {
                resp = "HTTP/1.1 200 Ok\r\n\r\n";
                resp += "<html><body><b>Server is going down. Bye bye.</b></body></html>"
            } else {
                let realFile = path.join(WEB_DIR, fileName);
                console.log(realFile);
                try {
                    resp = "HTTP/1.1 200 Ok\r\n\r\n"; // HTTP protokole sekanti eilute turi buti rasoma \r\n
                    const stats = await fs.stat(realFile);
                    let html;
                    if (stats.isDirectory()) {
                        if (!fileName.endsWith("/")) {
                            fileName += "/";
                        }
                        const filesInDir = await fs.readdir(realFile);
                        html = "<html><body>";
                        if (fileName !== "/") {
                            html += "<a href = \"" + fileName + "../\">..</a><br>";
                        }
                        for (const f of filesInDir) {
                            html += "<a href = \"" + fileName + f + "\">" + f + "</a><br>";
                        }
                        html += "</body></html>";
                    } else {
                        html = await fs.readFile(realFile, { // failo skaitymas
                            encoding: "utf-8"
                        });
                    }
                    resp += html;
                } catch (err) {
                    console.log(err);
                    resp = "HTTP/1.1 404 Not Found\r\n\r\n"; // HTTP protokole sekanti eilute turi buti rasoma \r\n
                }
            }

            socket.write(resp + "\r\n\r\n", () => { // siunciamas atsakymas narsyklei
                socket.end(); // kai nusiunciama uzdaromas socket
                if (fileName === "/end") {
                    socket.destroy();
                    server.close();
                }
            });
            // console.log(fileName, realFile);
            // web/index.html - unix
            // web\index.htm - windows
            // console.log(allData); // gaunami duomenys is narsykles HTTP protokolas
            // console.log("-----------");
            // kai yra gaunami duomenys tada siunciama informacija i narsykle
            // let html = "<html><body><h1>labas pasauli !!!</h1></body></html>"; // atvaizduojama narsykleje
            console.log(resp + "\r\n\r\n");
            // console.log("=============");
        }
    });
});

server.listen(3000) // 3000 port'o numeris

// narsykleje isivedus localhost:3000 terminale atsispausdins Kazkas prisijunge


// kai ateina uzklausa is narsykles gaunamas specialus objektas socket 