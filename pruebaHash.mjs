import bcrypt from "bcrypt";

const password = 'miContra';
const saltRounds = 10;
const hashSync = bcrypt.hashSync(password, saltRounds);
console.log('hashSync', hashSync);

const isMatchSync = bcrypt.compareSync("mio", hashSync);
if (isMatchSync) {
    console.log("Ingreso exitoso");
} else {
    console.log("Contraseña invalida")
};