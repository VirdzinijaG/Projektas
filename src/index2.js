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