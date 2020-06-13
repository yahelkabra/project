

function set_max_time(time)
{
  // the function get a string param called time.
  // the function returns a string thatthe time that should be at the end of the runnning,
  //one minate after the given time
  time1 = time;
  time1=time.split(":");
  time2 = (parseInt(time1[1])+1).toString();
  if(time2.length < 2)
  {
    time2="0"+time2;
  }
  time1[1]=time2;
  max_time = turn_array_to_string(time1);
  console.log("time: "+time);
  console.log("max_time: "+max_time);
  return max_time;
}

function turn_array_to_string(array)
{
  // the function gets an array and put all its values in a string
  // the function returns the tring
  string =array[0];
  for (var i=1; i < array.length;i++)
  {
    string +=":"+array[i];
  }
  return string;
}

function countdown(time,max_time)
{
  // the function get two string params and ckecks if they are the same.
  // if the params identical the function returns false, ekse returns true
  //the function responsible to check if the runnig time has come to an end
  console.log(" time" +time);
  console.log("max_time" +max_time);
  if (time == max_time)
  {
    return false;
  }
  return true;
}
