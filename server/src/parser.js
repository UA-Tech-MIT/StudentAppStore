
import Papa from 'papaparse';
function parseFile(file) {
const config = {
   delimiter: "",	// auto-detect
   newline: "",	// auto-detect
   quoteChar: '"',
   escapeChar: '"',
   header: true,
   trimHeaders: true,
   dynamicTyping: true,
   preview: 0,
   encoding: "",
   worker: false,
   comments: false,
   step: undefined,
   complete: undefined,
   error: undefined,
   download: false,
   skipEmptyLines: false,
   chunk: undefined,
   fastMode: undefined,
   beforeFirstChunk: undefined,
   withCredentials: undefined,
   transform: undefined
};
let results = Papa.parse(file, config);
console.log(results);
for(let result of results) {
   let author = result.author;
   let email = result.email;
   let isOfficial = result.isOfficialResource;
   console.log(author, email, isOfficial);
}
console.log(results);
}
export default parseFile; 