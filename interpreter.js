var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function interpret(source) {
  var array = Array.apply(null, new Array(30000)).map(Number.prototype.valueOf,0);
  var stack = new Array();
  var ptr = 0;
  var source = source.split(" ");

  i = 0;
  j = 1;
  while (j < source.length) {
    switch (source[i] + " " + source[j]) {
      case "Ook. Ook?":
        ptr++;
        break;
      case "Ook? Ook.":
        ptr--;
        break;
      case "Ook. Ook.":
        array[ptr]++;
        break;
      case "Ook! Ook!":
        array[ptr]--;
        break;
      case "Ook! Ook.":
        console.log(String.fromCharCode(array[ptr]));
        break;
      case "Ook. Ook!":
        rl.question("INPUT> ", function(answer) {
          array[ptr] = answer.charCodeAt(0);
          rl.close();
        });
        break;
      case "Ook! Ook?":
        if (array[ptr] !== 0) {
          stack.push(i);
          break;
        } else {
          i += 2;
          j += 2;
          var open = 0;
          var found_closing_banana = false
          for (;!found_closing_banana && j < source.length;i += 2, j += 2) {
            switch (source[i] + " " + source[j]) {
              case "Ook! Ook?":
                open++;
                break;
              case "Ook? Ook!":
                if (open > 0) {
                  open--;
                } else {
                  found_closing_banana = true;
              }
            }
          }
          continue;
        }
      case "Ook? Ook!":
        if (stack.length > 0) {
          i = stack.pop();
          j = i + 1;
          continue;
        }
    }
    j += 2;
    i += 2;
  }
}

module.exports = interpret;
