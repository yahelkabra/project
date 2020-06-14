const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");

const FADE_TIME = 120

console.log("top page");
var d = new Date();

X = 0;
Y = 0;

ht()
pd()

PEN_WIDTH = 3;
SPEED = 2;

setWidth(PEN_WIDTH)
setSpeed(SPEED)

BOX_SIZE = 500;
RADIUS = 200;
LEAVES = 100;
LENGTH_KOCH = 5;
DEPTH_KOCH = 5;
SPECIAL_CIRCLE = 500;
SPIRALA_LOOP = 600;
DOUBLE_RADIUS = 20;
LENGTH = 10;

  function pencolor()
  {
    //the function changes the color of the pen
    console.log("pencolor");
    color =[Math.random() * 1,Math.random() * 1, Math.random() * 1];
    console.log(color);
    setColor(color[0],color[1],color[2], 1)
    console.log("out pencolor ");
  }

  function line_for_box(box_size)
  {
    // the function draws a line based on the length that was given
    console.log("line_for_box");
    fd(box_size)
    lt(90)
    console.log("out line_for_box");
  }

  function box(box_size)
  {
    //box get an int parameter called box_size,
    //the function draws a box
    console.log("box");
    i = 0
    while (i < 4)
    {
      line_for_box(box_size);
      i++;
    }
    setHeading(0)
    fd(20)
    console.log("out box");
  }

  function private_multi_rectangels(box_size,time,max_time)
  {
    //private_multi_rectangels get string parameters: time and max_time
    //These parameters limit the runtime of the function
    // the function recive an int param: box_size
    //the function draws lots of boxes
    console.log("private_multi_rectangels");
    if((!countdown(time,max_time)) || (box_size < 20))
    {
      console.log(" out private_multi_rectangels");
      return;
    }
    set_pen_position();
    box(box_size);
    pencolor();
    private_multi_rectangels(box_size-20,d.toLocaleTimeString(),max_time);
  }

  function multi_rectangels(time,max_time)
  {
    //multi_rectangles get string parameters: time and max_time
    //These parameters limit the runtime of the function
    //the function calles the function private_multi_rectangels that draws lots of boxes
    console.log("multi_rectangels");
    setSpeed(SPEED)
    private_multi_rectangels(BOX_SIZE,time,max_time);
    console.log("out multi_rectangels");
  }

  function private_circle(radius,time,max_time)
  {
    //private_circle get string parameters: time and max_time
    //These parameters limit the runtime of the function
    // the function recive an int param: radius
    //he function draws lots of circles
    console.log("private_circle");
    if ((!countdown(time,max_time)) ||(radius < 10))
    {
      console.log(" out private_circle");
      return;
    }
    set_pen_position();
    pencolor();
    startFill(0,0,0)
    arc(360,radius)
    endFill()
    setX(getX()+10)
    private_circle(radius-10, d.toLocaleTimeString(),max_time);
  }

  function circle(time,max_time)
  {
    //tree get string parameters: time and max_time
    //These parameters limit the runtime of the function
    //the function calles the function private_circle that draws lots of circles
    console.log("circle");
    setSpeed(SPEED-1)
    private_circle(RADIUS,time,max_time);
    console.log("out circle");
  }

  function draw_tree(leaves,time,max_time)
  {
    //draw_tree get string parameters: time and max_time
    //  These parameters limit the runtime of the function
    //  and an int parameter leaves.
    //  the function draws lots of lines that creates a tree
    console.log("draw_tree");
    if ((!countdown(time,max_time)) || leaves < 5)
    {
      pencolor();
      return;
    }
    else
    {
      set_pen_position();
      fd(leaves)
      lt(30)
      draw_tree(3*leaves/4, d.toLocaleTimeString(),max_time)
      rt(60)
      draw_tree(3*leaves/4, d.toLocaleTimeString(),max_time)
      lt(30)
      bk(leaves)
    }
    console.log("out draw_tree");
  }

  function tree(time,max_time)
  {//tree get string parameters: time and max_time
    //These parameters limit the runtime of the function
    //the function calles the function draw_tree that draws a tree
    console.log("tree");
    setSpeed(10)
    rt(90)
    draw_tree(LEAVES,time,max_time);
    console.log("out tree");
  }

  function recursive_koch(length,depth,timer, max_time)
  {
    //recursive_koch get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    //and an int parameters: length, depth
    //the function draws lots of lines that creates a snowflake
    console.log("recursive_koch");
    if ((!countdown(time,max_time)) || depth == 0)
    {
      fd(length)
      set_pen_position();
      pencolor();
      return;
    }
    else
    {
      set_pen_position();
      recursive_koch(length, depth-1, d.toLocaleTimeString(), max_time)
      rt(60)
      recursive_koch(length, depth-1, d.toLocaleTimeString(), max_time)
      lt(120)
      recursive_koch(length, depth-1,d.toLocaleTimeString(), max_time)
      rt(60)
      recursive_koch(length, depth-1, d.toLocaleTimeString(), max_time)
    }
    console.log("out recursive_koch");
  }

  function koch(time,max_time)
  {
    //koch get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    //the function calles the function recursive_koch that draws a snowflake
    console.log("koch");
    setSpeed(10);
    lt(90)
    bk(40)
    recursive_koch(LENGTH_KOCH,DEPTH_KOCH,time,max_time);
    console.log("out koch");
  }

  function private_draw_special_circle(loop,time,max_time)
  {
    //private_draw_special_circle get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    //and an int parameters: loop
    //the function draws a circle from lots of triangles
    console.log("private_draw_special_circle");
    if((!countdown(time,max_time))||(loop <= 10))
    {
      console.log("out private_draw_special_circle");
      return;
    }
    pencolor();
    fd(150)
    lt(123)
    private_draw_special_circle(loop-10,d.toLocaleTimeString(),max_time);
  }

  function draw_special_circle(time,max_time)
  {
    //draw_special_circle get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // the function calles the function private_draw_special_circle that draws
    // a circle from lots of triangles
    console.log("draw_special_circle");
    setSpeed(SPEED-1)
    private_draw_special_circle(SPECIAL_CIRCLE,time,max_time);
    console.log("out draw_special_circle");
  }

  function private_draw_spirala(loop,time,max_time)
  {
    //private_draw_spirala get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // and an int parameters: loop
    // the function draws a spirala
    console.log("draw_spirala");
    if(!countdown(time,max_time) || loop <= 0)
    {
      return;
    }
    pencolor();
    setWidth(loop/100 + 1)
    fd(loop)
    lt(59)
    private_draw_spirala(loop-1,d.toLocaleTimeString(),max_time);
    console.log("out draw_spirala");
    setWidth(PEN_WIDTH)
  }

  function draw_spirala(time,max_time)
  {
    //draw_spirala get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // the function calles the function private_draw_spirala that draws
    // a spirala
    console.log("draw_spirala");
    setSpeed(10)
    private_draw_spirala(SPIRALA_LOOP,time,max_time);
    console.log("out draw_spirala");
  }

  function private_double_circle(radius,time,max_time)
  {
    //private_double_circle get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // and an int parameters: radius
    // the function draws a flower from circles
    console.log("private_double_circle");
    if ((!countdown(time,max_time)) ||(radius > 400))
    {
      console.log(" out private_double_circle");
      return;
    }
    set_pen_position();
    pencolor();
    lt(90)
    fd(radius)
    arc(360,radius)
    rt(180)
    fd(radius)
    arc(360,radius)
    private_double_circle(radius+10, d.toLocaleTimeString(),max_time);
  }

  function double_circle(time,max_time)
  {
    //double_circle get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // the function calles the function private_double_circle that draws
    // a flower from circles
    console.log("double_circle");
    setSpeed(SPEED)
    private_double_circle(DOUBLE_RADIUS,time,max_time);
    console.log("out double_circle");
  }

  function draw_triangle(length)
  {
    //the function get an int param: length
    //the size of the triangle is based on length
    console.log("draw_triangle");
    pencolor();
    rt(120)
    fd(length)
    rt(120)
    fd(length)
    rt(120)
    fd(length)
    console.log("out draw_triangle");
  }

  function private_draw_something(length,time,max_time)
  {
    //private_draw_triangles get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // and an int parameters: length
    // the function draws a spirala from triangels
    console.log("private_draw_something");
    if((!countdown(time,max_time)) ||(length>600))
    {
      console.log("out private_draw_something");
      return;
    }
    rt(10)
    draw_triangle(length);
    private_draw_something(length+10, d.toLocaleTimeString(),max_time);
  }

  function draw_triangles(time,max_time)
  {
    //draw_triangles get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // the function calles the function private_draw_triangles that draws
    // a spirala from triangels
    console.log("draw_something");
    setSpeed(SPEED+1);
    private_draw_something(LENGTH,time,max_time);
    console.log("out draw_something");
  }

  function zigzag(length)
  {
    //the function get an int param: length
    //the size of the zigzag circle is based on length
    for (var i = 0; i < 10; i++)
    {
      pencolor();
      rt(60)
      fd(length)
      lt(120)
      fd(length)
      rt(10)
    }
  }

  function a_lot_of_zigzags(length,time,max_time)
  {
    //a_lot_of_zigzags get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    //the function get an int param: length
    //the function draws a lots of zigzag circles
    console.log("a_lot_of_zigzags");
    if ((!countdown(time,max_time)) || (length > 100))
    {
      console.log("out a_lot_of_zigzags");
      return;
    }
    zigzag(length);
    a_lot_of_zigzags(length+10,time,max_time);
  }

  function draw_zigzags(time,max_time)
  {
    //draw_zigzags get string parameters: time and called max_time
    //These parameters limit the runtime of the function
    // the function calles the function a_lot_of_zigzags that draws
    // a lots of zigzag circles
    console.log("draw_zigzags");
    setSpeed(SPEED)
    a_lot_of_zigzags(LENGTH,time,max_time);
    console.log("out draw_zigzags");
  }

  function canvas_screen()
  {
    // the function change the background to black
    console.log("canvas");
    pu()
    setPosition(960,-640)
    startFill(0,0,0)
    box(2*960);
    endFill()
    pd()
    console.log("out canvas");
  }

  function fade()
  {
    //the function craetes a fading effect
    console.log("fade");

    CONTEXT.fillStyle = "rgba(0, 0, 0, 0.1)";
    CONTEXT.fillRect(-(CANVAS.width/2), -(CANVAS.height/2), CANVAS.width, CANVAS.height);

    setTimeout(fade, FADE_TIME);

    console.log("out fade");
  }

  function run_function(index)
  {
    //run_function get an int parameter called index
    //the function call the fractal's function according to the index
    time = d.toLocaleTimeString();
    max_time = set_max_time(time)
    set_pen_position();
    if (index == 8)
    {
      draw_zigzags(time,max_time);
    }
    else{FUNCTIONS[index](time,max_time);}
  }

  function is_oct_string_empty()
  {
    // the function checks if there is a message
    // the function returns true if oct_string is empty,else returns false
    if (window.oct_string == "")
    {
      return true;
    }
    return false;
  }

  function random_run()
  {
    // the function calls run_function by a random index
    console.log("random_run");
    var i = Math.floor(Math.random()*FUNCTIONS.length)
    run_function(i);
    console.log("out random_run");
  }

  function run_by_mess()
  {
    //the function calls run_function by the message that was given
    console.log("run_by_mess");
    for (var i = 0; i < window.oct_string.length; i++)
    {
      if(window.oct_string.charAt(i)=="r")
      {
        run_function(8);
      }
      else{run_function(parseInt(window.oct_string.charAt(i)));}
    }
    console.log("out run_by_mess");
  }

  function run()
  {
    //the function calls the right function based on if there is a message or not
    console.log("run")
    if (is_oct_string_empty())
    {random_run();}
    else{run_by_mess();}
    setTimeout(function() {
      run();
    }, 3000)
    console.log("out run");
  }

  FUNCTIONS = [multi_rectangels,double_circle,koch,tree,draw_special_circle,draw_spirala,circle,draw_triangles];

  function main()
  {
    console.log("main");
    canvas_screen();
    setTimeout(fade, 1000);
    time = d.toLocaleTimeString();
    max_time = set_max_time(time);
    setPosition(X,Y)
    set_pen_position();

    run();
    setTimeout(function() {
      run();
    }, 1000)



    console.log("out main");
   }

console.log("123");

main();
