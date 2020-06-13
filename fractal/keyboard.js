window.oct_string = "";
console.log("in keyboard file");

LANGUAGE = {1:8,2:9,3:10,4:11,5:12,6:13,7:14,8:15};
KEYS = [];

// recive the key that was pressed and makes an array that contains the pressed keys.
document.body.addEventListener("keydown", function(event)
{
  console.log("uniCharCode");
  var char = event.keyCode;
  KEYS.push(char);
  if (KEYS[0] == 89 && char == 32)
  {
    update_oct_string();
    KEYS = [];
  }
  console.log("out uniCharCode");
});

function read()
{
  // the function reads the message that was written and returns an array that contains the words
  console.log("read");
  var sum = 0;
  var array = [];
  for (var i = 0; i < KEYS.length; i++)
  {
    if (KEYS[i] == 13)
    {
      sum+=1;
    }
    else
    {
      if(sum>0)
      {array.push(sum);}
      sum=0;
    }
    console.log("sum: "+sum);
  }
  return array;
  console.log("out read");
}

function update_oct_string()
{
  // the function updates the global string oct_string.
  //This string contains the message in octal
  console.log("translate_to_frac");
  var mess_array = read();
  window.oct_string = turn_to_oct(mess_array);
  console.log("out translate_to_frac");
}

function turn_to_oct(mess_array)
{
  //the function is getting mess_array which contains the words in the message.
  //the function returns a string that contains th emessage in octal
  console.log("turn_to_oct");
  var oct_string = "";
  for (var i = 0; i < mess_array.length; i++)
  {
    oct_string += (LANGUAGE[mess_array[i]]).toString(8)+"r";
  }
  return oct_string;
}


console.log(" well done you");
