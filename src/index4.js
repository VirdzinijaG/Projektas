let tekstas = "{\"savybe\":15}";
console.log(tekstas); // atspausdina teksta

try {
    let o = JSON.parse(tekstas);
    console.log(o); // JSON.parse pavercia i objekta
    console.log(o.savybe + 3); // atspaudina 18
} catch (err) {
    console.log("Tai ne JSON'as");
}
console.log("Pabaiga");

