import * as HID from "node-hid";
import { EventEmitter } from "events";


const SERIAL = "54-46-6b-00-bd-31"
const APLHABET = "abcdefghijklmnopqrstuvwxyz1234567890";

interface KeyMap {
  [id: number]: string
}

const keymap: KeyMap = {
  75: 'pageup',
  78: 'pagedown',
  40: 'enter',
  44:'space',
  82: 'up',
  81: 'down',
  80: 'left',
  79: 'right'
}


const emitter = new EventEmitter;



function main() {


  const keyboard = HID.devices().find((device) => device.serialNumber == SERIAL);

  
  if (keyboard) {
    try {
      const hid = new HID.HID(keyboard.path);

      
      emitter.emit('found')
      hid.on('error', (e) => { emitter.emit('error', e); main() })
      hid.on("data", (buffer: Buffer) => {
        const type = buffer.length;
        if (type === 9) {
          const key = buffer[3];
          if (key === 0) {
            return;
          }

          
          if (keymap[key] != null) {
            emitter.emit(keymap[key])
          }
          if (key > 3 && key < 40) {
            const symbolid = key - 4;
            const symbol = APLHABET[symbolid]
            emitter.emit('key', symbol, new Date);

          }

          return;
        }
      })
    } catch (error) {
      console.error(error);
      
      main()
    }
  } else {
    console.error('keyboard doesnt found, find again');
    emitter.emit('finding')
    setTimeout(() => {
      main()
    }, 3000);
  }
}

setTimeout(() => {
  main()

}, 1);

export default emitter;