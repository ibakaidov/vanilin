module.exports = [{
  "keys": ["g"],
  "statements": [{
    "keys": ["1"],
    "text": "[привет/здравствуйте]"
  },
  {
    keys: ["2"],
    get text() {
      const hour = (new Date).getHours();
      if (hour > 23 || hour < 6) {
        return "Доброй ночи"
      }
      else if (hour < 12) {
        return "Доброе утро"
      }
      else if (hour < 16) {
        return "Добрый день"
      }
      else {
        return "Добрый вечер"
      } 
    }
  }]
}]