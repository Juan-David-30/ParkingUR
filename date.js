/*const date = new Date();
const options = { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

const newYorkTime = date.toLocaleString( options);
console.log(newYorkTime);
*/
const { Timestamp } = require('firebase/firestore')

const current_timestamp = Timestamp.fromDate(new Date())
const d = current_timestamp.toDate();

console.log(d)