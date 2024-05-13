const c = 0.25;
const w = 1;
const alfa = convertToRadians(20);
const beta = convertToRadians(12);
const z1 = 21;
const z2 = 42;
console.log(beta)

//Direct and helical
const mn = 3; //mm
const ha = mn;
const hf = 1.25 * mn;
const h = ha + hf;


//Helical
const mt = mn / Math.cos(beta);
const pt = Math.PI * mt;
const st = pt / 2;
const et = pt / 2; // st = et = pt / 2


const d1 = d(21, mt);
const da1 = da(21, mt, ha);
const df1 = df(21, mt, hf);

const d2 = d(42, mt);
const da2 = da(42, mt, ha);
const df2 = df(42, mt, hf);

const db1 = db(d1, alfa);
const db2 = db(d2, alfa);

//?Helper funkcie
//* Prevod radianov na stupne 
function convertToDegrees(radians){
    return radians * (180 / Math.PI);
}
//* Prevod stupnov na radiany
function convertToRadians(degrees){
    return degrees * (Math.PI / 180);
}

//* Rozstupová kružnica -- m sa passuje bud mn alebo mt
function d(z, m){
  return z * m;
}

//* Hlavová kružnica --m sa passuje bud mn alebo mt
function da (z, m, ha){
  return z * m + (2 * ha)
}

//* Pätná kružnica --m sa passuje bud mn alebo mt
function df  (z, m, hf)  {
    return z * m - (2 * hf)
}

//* Základná kružnica 
function db (da, alfa){
  return da * Math.cos(alfa)
}

//* Rozstup
function a (db1, db2){
  return (db1 + db2)/2
}


//! Kombinácia číslo 2, poznáme z1, i, modul mn, uhol beta
//* Krok č.1 - čelný modul mt
//* Krok č.2 - vyjadrenie z2 z prevodového pomeru
function z2I(z1, i) {
    return z1 * i;
}

//! Kombinácia číslo 3, poznáme z2,i, modul mn, uhol beta
//* Krok č.1 - čelný modul mt
//* Krok č.2 - vyjadrenie z1 z prevodového pomeru
function z1I (z2, i){
    return z2 / i;
}

//! Kombinácia číslo 4, poznáme z1, n1, n2, mn, uhol beta
//* Krok č.1 - čelný modul mt
//* Krok č.2 - vyjadrenie prevodového pomeru pomocou otáčok
function in1n2(n1, n2) {
    return n1 / n2;
}
//* Krok č.3 - vyjadrenie z2 alebo z1 z prevodového pomeru.. už taká funkcia je

//! Kombinácia číslo 5, poznáme i, a, mn, uhol beta
//* Krok č.1 - čelný modul mt
//* Krok č.2 - vyjadrenie z1 z osovej vzdialenosti
function az1(a, m, i) {
    return (2 * a)/(m * (1 + i));
}
//* Krok č.3 - vyjadrenie z2 alebo z1 pomocou prevodového pomeru.. už také rovnica je

//! Kombinácia č.6, poznáme z1, z2, a, mn
//* Krok č.1 - vyjadrenie uhlu Beta 
function uholBeta(z1, z2, a, mn) {
    return Math.acos((mn * (z1 + z2)) / (2 * a)) //! Math.acos vráti radiany, preto to treba previesť an stupne cez funkciu 
}
//* Krok č.2 prevod radianov na stupne


//! Kombinácia č.7, poznáme Mk1, Mk2, P, mn, beta ???????????? 
//TODO Dokončiť
//* Krok č.1 - čelný modul mt
//* Krok č.2. - vyjadrenie prevodového pomeru
function mk1mk2i (mk1, mk2) {
    return mk2 / mk1
}


