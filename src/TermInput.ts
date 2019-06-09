import * as readline from 'readline';
import Storage from './storage';

const storage = Storage.instance

class TermInput {
  private reader: readline.Interface
  currentCategory: import("/Users/aacidov/node/aac/vanillin/src/storage").Category;

  constructor() {
    this.reader = readline.createInterface(process.stdin, process.stdout);
    this.reader.setPrompt('>> ')
    this.reader.prompt(true)
    this.reader.on('line', (line) => this.onLine(line))
  }

  onLine(line: string) {
    const [command, ...args] = line.split(' ')
    if (command === 'cc') {
      const category = storage.createCategory(args[0], args[1].split(','))
      console.log('category %s created', category.title)
    } else if (command === 'sc') {
      const category = storage.findCategoryByKey(args[0])
      if (category == null) {
        console.log('not found');
        return;
      }
      this.currentCategory = category;
      console.log('category %s selected', category.title)
      this.reader.setPrompt(category.title + '>> ')
    }
    else if (command === 'cs') {
      if(this.currentCategory==null){
        console.log('category doesn\'t selected');
        return
      }
      const statement = this.currentCategory.createStatement(args[0], args[1].split(','))
      console.log('statement %s created', statement.value)

    }
    else {

    }
    this.reader.prompt()

  }
}

export default TermInput;