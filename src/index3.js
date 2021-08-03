
import { resolve } from "path";
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function skaiciausIvedimas(msg) {
    return new Promise(resolve => {
        rl.question(msg, val => {
            resolve(parseInt(val));
        })
    })
}

let skaicius = await skaiciausIvedimas("Ivesk skaiciu ");
// Pradzioje spausdina Ivesk skaiciu, kai ivedamas skaicius apskaiciuojamas jo faktorialas

/* sita funkcija paskaiciuoja faktoriala
jei paduosi neigiama skaiciu visada gausi - 1 */
function fakt(sk) {
    if (sk < 0) {
        return -1;
    }
    if (sk === 0) {
        return 1;
    }
    return sk * fakt(sk - 1);
}

console.log(fakt(5));
console.log(fakt(-5));

// Operatorius throw, ispeja apie klaida, kuria patys apsirasem

function fakt1(sk) {
    if (sk < 0) {
        // throw "Neimanoma paskaiciuoti neigiamo skaiciaus faktorialo";
        throw new Error("Neimanoma paskaiciuoti neigiamo skaiciaus faktorialo");
    }
    if (sk === 0) {
        return 1;
    }
    return sk * fakt1(sk - 1);
}

// console.log(fakt1(-7)); // generuoja klaida, kuria aprasyta su throw

// prie throw yra specialus objektas, tada prie generuojamos klaidos atsiranda ERROR objektas
// throw new Error ("Neimanoma paskaiciuoti neigiamo skaiciaus faktorialo")

try {
    console.log(fakt1(skaicius)); // po skaiciaus ivedimo apskaiciuoja fakoriala, paskutis skaicius terminale atsispausdina
}
catch (err) {
    console.log("Blogas skaicius " + err.message); // isvedama jei yra klaida
}

rl.close()

// try - tikuosi, kad sitame bloke gali ivykti klaida
// jeigu klaida neivyko tada tesiama kas yra toliau
// jei klaida ivyko su catch ji pagaunama is throw i kintamaji err