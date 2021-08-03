import * as fs from "fs/promises";

fs.readFile("./a.txt")
.then(tekstas => {
    console.log("" + tekstas); 
    // pirma atspausdino baitu buffer pridejus "" + paverte i sting'a
})
.catch(err => {
    console.log("Nesigavo perskaityti failo");
});

// bando perskaityti faila, jei pasiseke suveike then, jei ne suveikia catch
// kiekvienas then, kiekvienas catch grazina po savo promisa 

let tekstas = await fs.readFile("./a.txt");
console.log(tekstas); // atspausdina baitu buffer
console.log("" + tekstas); // "" + pavercia i string'a