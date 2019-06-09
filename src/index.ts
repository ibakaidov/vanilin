import keyboard from './keyboard'
import { speak } from 'say';
import Note from './Note';
import SleepController from './SleepController';
import Storage, { Category } from './storage';
import TermInput from './TermInput';

const storage = Storage.instance;

const sleepController = new SleepController();

sleepController.dontSleep();

const termInput = new TermInput();

const connectNote = new Note('d');
const chooseCategoryNote = new Note('c');
const exitNote = new Note('b');
const capsNote = new Note('f');
const errorNote = new Note('error');
const compilationNote = new Note('a');

let currentCategory: Category | null = null;
let caps: boolean = false;
let compilation: string | null = null;

keyboard.on('found', () => {
  console.log('connected');
  connectNote.play()
})

keyboard.on('key', (key, date) => {
  if (currentCategory == null) {
    currentCategory = storage.findCategoryByKey(key);
    if (currentCategory == null){ 
      errorNote.play();''
      return;
    }
    chooseCategoryNote.play()
    return
  }

  const statement = currentCategory.findStatementByKey(key)
  if (statement == null) return;
  const text = caps ? statement.textUp : statement.textDown;
  if (compilation != null) {
    compilation += ', ' + text;
    compilationNote.playBemol()
  } else {
    speak(text);
  }
  currentCategory = null
})

keyboard.on('pageup', () => {
  currentCategory = null;
  exitNote.play()
})
keyboard.on('pagedown', () => {
  caps = !caps
  if (caps) {
    capsNote.playBemol();
  } else {
    capsNote.play()
  }
})

keyboard.on('space', ()=>{
  if (compilation==null) {
    compilation='';
    compilationNote.playBemol()
  } else {
    compilation = null;
    compilationNote.play()
  }
})
keyboard.on('enter', ()=>{
  speak(compilation)
  compilation=null
})

keyboard.on('error', console.error);


process.on('beforeExit', () => {
  sleepController.sleep();
})

