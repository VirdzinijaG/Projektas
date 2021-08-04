/* sukurti 2 JSON failus, kuriuose butu string'u masyvai
 
perskaityti abu failus, suparsinti, apjungti i viena masyva
 
surusiuoti masyva pagal string'o ilgi
 
atspausdinti masyva */


// Tomo sprendimas
console.log("pradzia");
 
import * as fs from "fs/promises";
 
let s1 = ""; // tuscias string'as
let s2 = "";
try {
s1 += await fs.readFile("failas1.json"); // failo skaitymas ir failo idejimas i tuscia string'a
s2 += await fs.readFile("failas2.json");
// s2 += await fs.readFile("failas3.json");
// neesant failui mestu klaida ir nevykdytu toliau uzduociu, atspausdintu tik perskaityta faila, kuris yra, bet nerusiuotu
} catch (err) {
console.log("Klaida skaitant is failo:", err);
}
console.log(s1, s2);
 
try {
    let m1 = JSON.parse(s1); // pavercia i objekta
    let m2 = JSON.parse(s2);
    console.log(m1, m2);
    let m = m1.concat(m2); // conacat apjunge i viena masyva m1 ir m2
    console.log(m);
    m.sort((e1, e2) => e1.length - e2.length); // rusiavimas ilgejimo tvarka
    console.log(m);
} catch (err) {
    console.log("Tai ne JSON'as");
}
   
console.log("pabaiga");