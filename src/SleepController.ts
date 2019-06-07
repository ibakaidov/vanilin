import { exec } from "child_process";

class SleepController {
  dontSleep() {
    exec('sudo pmset -b sleep 0; sudo pmset -b disablesleep 1')
  }
  sleep() {
    exec('sudo pmset -b sleep 0; sudo pmset -b disablesleep 0')
  }
}

export default SleepController;