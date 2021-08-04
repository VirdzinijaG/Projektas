import { Server } from "net";

// paleidziama funkcija
// sukuriamas naujoas objektas server
let server = new Server((socket) => {
    console.log("kazkas prisijunge");
    console.log(socket.localAddress,socket.localPort,socket.remoteAddress,socket.remotePort); // is kur i kur
    socket.setEncoding("utf-8"); // UTF-8 yra Unikodo tipo koduotė, kurioje vienam simboliui skiriama nuo 1 baito iki 4 baitų
    let allData = "";
    socket.on("data", (data) => { // duomenu gavimas
        allData += data;
        let lines = allData.split("\r\n");
        if (lines.findIndex(e => e === "") !== -1) { // tikrinama gaunama eilute, is duomanu kuriuos gavau, bent viena eilute yra tuscia
            console.log(allData); // gaunami duomenys is narsykles HTTP protokolas
            console.log("-----------");
            // kai yra gaunami duomenys tada siunciama informacija i narsykle
            let resp = "HTTP/1.1 200 Ok\r\n\r\n"; // HTTP protokole sekanti eilute turi buti rasoma \r\n
            let html = "<html><body><h1>labas pasauli !!!</h1></body></html>"; // atvaizduojama narsykleje
            console.log(resp + html + "\r\n\r\n");
            console.log("=============");
            socket.write(resp + html + "\r\n\r\n", () => { // siunciamas atsakymas narsyklei
                socket.end(); // kai nusiunciama uzdaromas socket
            });
        }
    });
});

server.listen(3000) // 3000 port'o numeris

// narsykleje isivedus localhost:3000 terminale atsispausdins Kazkas prisijunge


// kai ateina uzklausa is narsykles gaunamas specialus objektas socket 