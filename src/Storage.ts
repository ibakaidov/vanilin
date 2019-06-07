import data from '../data'

const EXP = /\[(.*)\/(.*)\]/g;

class Item{
  keys:Array<String>
  constructor(object:any){
    this.keys=object.keys;
  }
}
export class Category extends Item{
  statements: Array<Statement>
  constructor(object:any){
    super(object)
    this.statements = object.statements;
  }

  findStatementByKey(key:String):Statement{
    const object = Storage.findByKey(this.statements, key);
    if(!object) return null;
    return new Statement(object);
  }
}
export class Statement extends Item {
  private  text:string;
  constructor(object:any){
    super(object);
    this.text=object.text;;
    
  }
  get textUp():string{
    return this.text.replace(EXP, '$1')
  }
  get textDown():string{
    return this.text.replace(EXP, '$2')
  }

}
class Storage {
  findCategoryByKey(key: String) :Category{
    const object  = Storage.findByKey(data, key);
    return object==null?null:new Category(object)
  }
   static findByKey(object: Array< Item>, key: String):Item {
    return object.find((value) => {
      return value? value.keys.includes(key):false
    })
  }
}

export default Storage;