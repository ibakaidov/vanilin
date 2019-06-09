import fs  from 'fs'

import data from '../data'
import functions from '../data/functions'



const EXP = /\[(.*?)\/(.*?)\]/g;

class Item {
  keys: Array<String>
  constructor(object: any) {
    this.keys = object.keys;
  }
}
export class Category extends Item {
  statements: Array<Statement>
  title: String;
  constructor(object: any) {
    super(object)
    this.title = object.title
    this.statements = object.statements;
  }

  findStatementByKey(key: String): Statement {
    const object = Storage.findByKey(this.statements, key);
    if (!object) return null;
    return new Statement(object);
  }
  createStatement( text: string, keys: string[]) :Statement{
    let obj;
    if(text.indexOf('f:')===0){
      obj = {keys, function: text.slice(2)}
    } else{
      obj = {keys, text}
    }
    const statement = new Statement(obj)
    this.statements.push(statement)
    Storage.instance.commit();
    return statement
  }
  
}
export class Statement extends Item {
  private text: string;
  private executor: Function;
  function: string;
  constructor(object: any) {
    super(object);

    if (object.function != null) {
      this.function = object.function;
      this.executor = functions[object.function]
    } else {
      this.text = object.text;
    }

  }

  get value() {
    if (this.executor != null) {
      return this.executor(this);
    }
    return this.text;
  }

  get textUp(): string {

    return this.value.replace(EXP, '$1')
  }
  get textDown(): string {
    return this.value.replace(EXP, '$2')
  }

}
class Storage {
  static instance: Storage = new Storage();

  findCategoryByKey(key: String): Category {
    const object = Storage.findByKey(data, key);
    return object == null ? null : new Category(object)
  }
  static findByKey(object: Array<Item>, key: String): Item {
    
    return object.find((value) => {
      
      return value!=undefined&&value.keys!=undefined ? value.keys.includes(key) : false
    })
  }
  createCategory(title: string, keys: string[]): Category {
    const category = new Category({ title, keys, statements: [] })
    data.push(category)
    this.commit()
    return category
  }
   commit(){
    fs.writeFileSync(__dirname+'/../data/index.json', JSON.stringify(data))
  }
}

export default Storage;