let fs = require("fs");
// Intitializing the readFileLines with the file
const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\r\n");

// Calling the readFiles function with file name
let arraySite = readFileLines("site.txt");

// Printing the response array
// console.log(arraySite);

let login = arraySite[0].toString();
let configIP = arraySite[1].toString();
let typeChange = arraySite[2].toString();
let digitalocean = require("digitalocean");
let client = digitalocean.client(login);

for (let i = 3; i < arraySite.length; i++) {
  let siteUrl = arraySite[i].toString();
  client.domains.listRecords(siteUrl, function (err, domains) {
    console.log(err); // null on success
    if (err) {
      console.log("####:", siteUrl);
      console.log(err);
    }
    for (let i = 0; i < domains.length; i++) {
      if (domains[i].type == typeChange) {
        // console.log("####",i,domains[i]);
        // console.log("####",i,domains[i].id);
        client.domains.updateRecord(
          siteUrl,
          domains[i].id,
          { data: configIP },
          function (err, domains) {
            // if(err){
            //     console.log("####:",siteUrl);
            //     console.log(err);
            // }
            console.log("DONE Update Records");
          }
        );
      }
    }
  });
}
