import Player from 'play-sound';


const player =  Player();

export default class Note {
  private note: String;
  constructor(note: String) {
    this.note = note;
  }
  play(){
    this.playFile(this.note)
  }
  playBemol(){
    this.playFile(this.note+'b')
  }
  private playFile(note:String) {
    player.play(__dirname+'/../../sounds/'+note+'.wav',  {timeout:20,  afplay: ['-v', 0.05 ] });
    
  }
}