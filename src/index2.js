import * as fs from "fs/promises";

// paprasta funkcija
function suma(a, b) {
    return a + b;
}
// funkcija suma su dviem reiksmem, kuri grazina ju suma

console.log(suma(1, 2));
// kvieciama funkcija suma su nurodytomis reiksmemis

// Funkcijas galima pazymeti su specialiu modifikatoriumi async

async function suma1(a, b) {
    return a + b;
}
console.log(suma1(2, 3));
// async funkcija automatiskai grazins promisa 
// Promise { 5 }

let reiksmesPromisas = suma1(2, 3);
reiksmesPromisas.then(reiksme => {
    console.log(reiksme + 4);
});
// su then isgauna(islukstenama) reiksme siuop atveju 5, prie reiksmes pridedama 4 ir gaunama 9


// grazins promisa kaip ir async funkcija
function sumaPromise(a, b) {
    return new Promise((resolve, reject) => {
        resolve(suma(a, b));
    })
}
console.log(sumaPromise(4, 3));

async function suma3(a, b) {
    return a + b;
}
let rez = await suma3(5, 5);

console.log(rez); // gaunama reiksme 10, ne promisas, nes naudojama await
console.log(rez + 2);

let rez1 = await suma(2, 2) + await suma(4, 5);
console.log(rez1 + 4);
console.log("Labas");


// gaunamas toks pats rezultatas kaip su await, tik ilgesnis uzrasymas
// let rez1;
// suma(1, 2)
//     .then(v1 => {
//         return new Promise((resolve) => {
//             suma(4, 5)
//                 .then(v2 => {
//                     resolve(v1 + v2);
//                 });
//         });
//     })
//     .then(val => {
//         rez = val;
//         console.log(rez + 4);
//         console.log("labas");
//     });

// await naudojamas vietoj then, pries tai naudoto ir isgaunama promiso reiksme
// pries await yra viena dalis, po await visos komandos bus then'e


async function suma4(a, b) {
    if (a < 0 || b < 0) {
        throw "as sudedu tik teigiamus skaicius";
    }
    return a + b;
}
try {
    let rezultatas = await suma4(1, -2);
    console.log(rezultatas);
} catch (err) {
    console.log("parskrido klaida: " + err);
}
// (err) atspausdinama throw reiksme
// Operatorius throw, ispeja apie klaida, kuria patys apsirasem
// try catch gaudo klaida
// try tikimasi, kad gali  buti klaida
// catch pagauta klaida

let duomenys = "";

try {
    duomenys += await fs.readFile("a.txt");
    //  duomenys += await fs.readFile("a1.txt"); mes klaida, nes nera tokio failo
    duomenys += await fs.readFile("b.txt"); 
    duomenys += await fs.readFile("c.txt");
} catch (err) {
    console.log("Klaida skaitant is failo: ", err);
}
console.log(duomenys);

// kai nera failo ("b.txt"), pradzioje mes klaida, po to atspausdins perskaityta faila a.txt
// nors c.txt failas yra, jo neskaitys, nes b.txt mete klaida ir promisas buvo reject'intas ir toliau nurodymu nevykdo

// be await fs.readfile grazina promisa 
// su await atspausdina perskaityto failo turini, jei nera klaidu