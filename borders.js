
SCREEN_WIDTH = 1920 / 2;
SCREEN_HEIGHT= 1280 / 2;

function check_position(x,y)
{
  //the function checks if the pen position in in the range.
  // if its in the range the function returns true, else false
  console.log("check_position");
  if ((-SCREEN_WIDTH <= x && x <= SCREEN_WIDTH )&& (-SCREEN_HEIGHT <= y && y <= SCREEN_HEIGHT))
  {
    return true;
  }
  return false;
}

function right_corner_border(x, y)
{
  // the function checks if the pen position is in one of the right corners and
  // changing its position to the opposite corner
  console.log("right_corner_border");
  if (x >= SCREEN_WIDTH && y >= SCREEN_HEIGHT)
  {
    setPosition(-SCREEN_WIDTH,-SCREEN_HEIGHT)
  }
  else if (x >= SCREEN_WIDTH && y <= -SCREEN_HEIGHT)
  {
    setPosition(-SCREEN_WIDTH,SCREEN_HEIGHT)
  }
}

function is_in_right_corner(x,y)
{
  // the function checks if the pen position is in one of the right corners and
  // returns true if the pen is in one of the right corners, else returns false
  if ((x >= SCREEN_WIDTH && y >= SCREEN_HEIGHT)||(x >= SCREEN_WIDTH && y <= -SCREEN_HEIGHT))
  {
    return true;
  }
  return false;
}

function left_corner_border(x, y)
{
  // the function checks if the pen position is in one of the left corners and
  // changing its position to the opposite corner
  console.log("left_corner_border");
  if (x <= -SCREEN_WIDTH && y >= SCREEN_HEIGHT)
  {
    console.log("up left");
    setPosition(SCREEN_WIDTH,-SCREEN_HEIGHT)

  }
  else if (x <= -SCREEN_WIDTH && y <= -SCREEN_HEIGHT)
  {
    console.log("down left");
    setPosition(SCREEN_WIDTH,SCREEN_HEIGHT)
  }
  // x = getX()
  // y = getY()
  // console.log("left_corner_border after", x, y);
}

function is_in_left_corner_border(x, y)
{
  // the function checks if the pen position is in one of the left corners and
  // returns true if the pen is in one of the left corners, else returns false
  if ((x <= -SCREEN_WIDTH && y >= SCREEN_HEIGHT) ||(x <= -SCREEN_WIDTH && y <= -SCREEN_HEIGHT))
  {
    return true;
  }
  return false;
}

function left_border(x,y)
{
  // the function checks if the pen position is in the left border and
  // changing its position to the opposite X value
  console.log("left_border");
  if(( x <= -SCREEN_WIDTH ) && (-SCREEN_HEIGHT <= y <= SCREEN_HEIGHT))
  {
    setPosition(SCREEN_WIDTH, y)
  }
}

function is_in_left_border(x,y)
{
   // the function checks if the pen position is in the left border and
  // returns true if the pen is in the left border, else returns false
    if(( x <= -SCREEN_WIDTH ) && (-SCREEN_HEIGHT <= y <= SCREEN_HEIGHT))
    {
      return true;
    }
    return false;
}
function right_border(x,y)
{
  // the function checks if the pen position is in the right border and
  // changing its position to the opposite X value
  console.log("right_border");
  if(( x >= SCREEN_WIDTH ) && (-SCREEN_HEIGHT <= y <= SCREEN_HEIGHT))
  {
    setPosition(-SCREEN_WIDTH, y)
  }
}

function is_in_right_border(x,y)
{
  // the function checks if the pen position is in the right border and
  // returns true if the pen is in the right border, else returns false
  if(( x >= SCREEN_WIDTH ) && (-SCREEN_HEIGHT <= y <= SCREEN_HEIGHT))
  {
    return true;
  }
  return false;
}

function up_border(x,y)
{
  // the function checks if the pen position is in the up border and
  // changing its position to the opposite Y value
  console.log("up_border");
  if(( y >= SCREEN_HEIGHT ) && (-SCREEN_WIDTH <= x <= SCREEN_WIDTH))
  {
    setPosition(x, -SCREEN_HEIGHT)
  }
}

function is_in_up_border(x,y)
{
  // the function checks if the pen position is in the up border and
  // returns true if the pen is in the up border, else returns false
  if(( y >= SCREEN_HEIGHT ) && (-SCREEN_WIDTH <= x <= SCREEN_WIDTH))
  {
    return true;
  }
  return false;
}

function down_border(x,y)
{
  // the function checks if the pen position is in the down border and
  // changing its position to the opposite Y value
  console.log("down_border");
  if(( y <= -SCREEN_HEIGHT ) && (-SCREEN_WIDTH <= x <= SCREEN_WIDTH))
  {
    setPosition(x, SCREEN_HEIGHT)
  }
}

function is_in_down_border(x,y)
// the function checks if the pen position is in the down border and
// returns true if the pen is in the down border, else returns false
{
  if(( y <= -SCREEN_HEIGHT ) && (-SCREEN_WIDTH <= x <= SCREEN_WIDTH))
  {
    return true;
  }
  return false;
}

function corner_borders(x,y)
{
  // the function checks if the pen is one of the corners and updating his position.
  console.log("corner_borders");
  if(is_in_left_corner_border(x,y)){left_corner_border(x,y);}
  else if (is_in_right_corner(x,y)) {right_corner_border(x,y);}
}

function is_in_corner_borders(x,y)
{
  // the function checks if the pen position is in one of the corners and
  // returns true if the pen is in one of the corners, else returns false
  if(is_in_left_corner_border(x,y)|| is_in_right_corner(x,y)){return true;}
  return false;
}

function side_borders(x,y)
{
  // the function checks if the pen is one of the side borders and updating his position.
  console.log("side_borders");
  if(is_in_up_border(x,y)){up_border(x,y);}
  else if (is_in_down_border(x,y)){down_border(x,y);}
  else if (is_in_left_border(x,y)) {left_border(x,y);}
  else if (is_in_right_border(x,y)) {right_border(x,y);}
}

function is_in_side_borders(x,y)
{
  // the function checks if the pen position is in one of the side borders and
  // returns true if the pen is in one of the side borders, else returns false
  if(is_in_up_border(x,y)|| is_in_down_border(x,y) || is_in_left_border(x,y) || is_in_right_border(x,y)){return true;}
  return false;
}

function update_pen_position(x,y)
{
  //the function updates the pens position based on its position
  console.log("update_pen_position");
  if(is_in_corner_borders(x,y)){corner_borders(x,y);}
  else if(is_in_side_borders(x,y)){side_borders(x,y);}
  console.log("out update_pen_position");
}

function set_pen_position()
{
  // the function checks the pens position and decides whether to updtae its
  //position ot not
  //the function calls the function update_pen_position which update the pens position
  console.log("set_pen_position");
  x = getX()
  y = getY()
  console.log("set_pen_position", x, y);
  if (!check_position(x,y))
  {
    console.log("in");
    pu()
    update_pen_position(x,y);
    pd()
  }
  console.log("out set_pen_position");
}
