
import nvt from 'node-virustotal'
import fs from 'fs'

const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n');

let arraySite = readFileLines('site.txt');

const defaultTimedInstance = nvt.makeAPI();
const theSameKey = defaultTimedInstance.setKey('6f1e9e675f2ba8fa29b1706465298cb3943762336092373145d222c6a8d4dea9');

for ( let i = 0; i<arraySite.length;i++){
    let siteUrl = arraySite[i].toString();
    // console.log("siteUrl####",siteUrl)
const theSameObject = defaultTimedInstance.domainLookup(siteUrl, function(err, res){
  if (err) {
    console.log('Well, crap.');
    console.log(err);
    return;
  }
  let at= JSON.parse(res)
  let p = at.data;
  resultTest(p,siteUrl)
  return;
});
}
function resultTest (ob, site ){
  let malicious =  ob.attributes.last_analysis_stats.malicious;
  let suspicious = ob.attributes.last_analysis_stats.suspicious;
  if (malicious>0 ){
      console.log("Site dangerous malicious ", site);
      fs.appendFileSync("res.txt", `Site dangerous malicious ${site} \n`)
      return;
  }else if (suspicious>0 ){
    console.log("Site dangerous suspicious ", site);
    fs.appendFileSync("res.txt", `Site dangerous suspicious ${site} \n`)
    return;
  }else {
    console.log('all OK ',site );
    
  }

}