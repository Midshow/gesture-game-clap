import fs from "node:fs";
import path from "node:path";

export class JsonStore{
  constructor(file){this.file=path.resolve(file);this.state={rooms:{},processed:{}};this.saveChain=Promise.resolve();}
  load(){fs.mkdirSync(path.dirname(this.file),{recursive:true});if(fs.existsSync(this.file)){const parsed=JSON.parse(fs.readFileSync(this.file,"utf8"));this.state={rooms:parsed.rooms||{},processed:parsed.processed||{}};}return this;}
  async save(){const snapshot=JSON.stringify(this.state,null,2),temp=`${this.file}.tmp`;this.saveChain=this.saveChain.catch(()=>{}).then(async()=>{await fs.promises.writeFile(temp,snapshot,"utf8");await fs.promises.rename(temp,this.file);});return this.saveChain;}
}
