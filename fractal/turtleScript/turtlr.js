/* Turtle graphics for codeheart.js by Morgan McGuire from https://casual-effects.om/codeheart/turtle */
var _ch_PLAY_VERSION = 1.66;
var _ch_sourceURL = "codeheart.min.js";
(function() {
    document.write('    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>' + '    <meta name="apple-mobile-web-app-capable" content="yes"/>' + '    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>' + '    <meta name="apple-touch-fullscreen" content="yes" />' + '    <meta name="format-detection" content="telephone=no" />' + '    <meta name="msapplication-tap-highlight" content="no" />' + "" + '    <style type="text/css">' + "      /* Prevent selection on touch screens during touch events */" + "      *:not(input):not(textarea) {" + "        -webkit-user-select: none; /* disable selection/Copy of UIWebView */" + "        -webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */" + "        -moz-user-select: none;" + "        -ms-user-select: none;   " + "        user-select: none;" + "      }" + "" + "      * {" + "        -webkit-tap-highlight-color: transparent;" + "      }" + "" + "      body {" + "         margin: 0px; " + "         background: #000;" + "         height: 100%;" + "         overflow:hidden;" + "      }" + "    </style>" + '<script src="' + _ch_sourceURL + '"></script>' + '<body oncontextmenu="return false" onload="_ts_onLoad();">' + "<script>_ch_makeCanvas();_ch_targetFramerate = 60;_ch_showLoadingMessage = false;</script>" + "</body>")
})();

function _ts_onLoad() {
    var scriptArray = document.getElementsByTagName("script");
    document.body.originalHTML = document.body.innerHTML;
    for (var i = 0; i < scriptArray.length; ++i) {
        var script = scriptArray[i];
        if (script.hasAttribute("type") && script.getAttribute("type").toLowerCase() === "text/turtlescript" && script.src === "") {
            script.type = "text/javascript";
            var compiled = document.createElement("script");
            for (var attrs = script.attributes, j = 0; j < attrs.length; ++j) {
                compiled.setAttribute(attrs[j].name, attrs[j].value)
            }
            compiled.type = "text/ecmascript";
            compiled.text = turtleScriptToJavaScript(script.text);
            script.parentNode.replaceChild(compiled, script)
        }
    }
    _ch_onLoad()
}
var $rep$ = 0;

function turtleScriptToJavaScript(code) {
    function gensym() {
        return "__gen" + Math.floor(Math.random() * 268435455)
    }
    code = code.replace(/\/\/.*\n/g, "\n");
    code = code.replace(/(\s|;)repeat(\s*)(\(.*\)(\s*)){/g, function(match, prefix, beforespaces, expr) {
        var count = gensym();
        return prefix + "$rep$=" + expr + "; for (var " + count + " = $rep$; " + count + " > 0; --" + count + ") {"
    });
    return code
}

function fd(distance) {
    _ch_checkArgs(arguments, 1, "fd(distance) requires one argument");
    _turtle.query.x += distance * _turtle.query.scale * cos(_turtle.query.heading);
    _turtle.query.y += distance * _turtle.query.scale * sin(_turtle.query.heading);
    insertBack(_turtle.commandBuffer, function() {
        var oldX = _turtle.x,
            oldY = _turtle.y;
        _turtle.x += distance * _turtle.scale * cos(_turtle.heading);
        _turtle.y += distance * _turtle.scale * sin(_turtle.heading);
        if (_turtle.inDrawingFill) {
            _ch_ctx.lineTo(_turtle.x, _turtle.y)
        } else if (_turtle.penDown) {
            strokeLine(oldX, oldY, _turtle.x, _turtle.y, _turtle.color, _turtle.width)
        }
    })
}

function rt(angle, radius) {
    _ch_checkArgs(arguments, 1, "rt(angle, <radius>) requires at least one argument");
    lt(-angle, radius)
}

function lt(angle, radius) {
    _ch_checkArgs(arguments, 1, "lt(angle, <radius>) requires at least one argument");
    angle *= Math.PI / 180;
    if (radius === undefined) {
        _turtle.query.heading += angle;
        insertBack(_turtle.commandBuffer, function() {
            _turtle.heading += angle
        })
    } else {
        var d = -radius * _turtle.query.scale;
        var startAngle = _turtle.query.heading - Math.PI / 2;
        if (angle < 0) {
            startAngle += Math.PI
        }
        var c = cos(startAngle) * d;
        var s = sin(startAngle) * d;
        var x = _turtle.query.x + c;
        var y = _turtle.query.y + s;
        var x2 = x + _turtle.query.scale * radius * sin(_turtle.query.heading + angle) * sign(angle);
        var y2 = y - _turtle.query.scale * radius * cos(_turtle.query.heading + angle) * sign(angle);
        var endAngle = startAngle + angle;
        var cw = angle < 0;
        _turtle.query.x = x2;
        _turtle.query.y = y2;
        _turtle.query.heading += angle;
        insertBack(_turtle.commandBuffer, function() {
            _turtle.x = x2;
            _turtle.y = y2;
            _turtle.heading += angle;
            if (_turtle.inDrawingFill) {
                _ch_ctx.arc(x, y, _turtle.scale * radius, startAngle, endAngle, cw)
            } else if (_turtle.penDown) {
                _ch_ctx.lineWidth = _turtle.width;
                _ch_ctx.strokeStyle = _turtle.color;
                _ch_ctx.beginPath();
                _ch_ctx.arc(x, y, radius * _turtle.scale, startAngle, endAngle, cw);
                _ch_ctx.stroke()
            }
        })
    }
}

function bk(distance) {
    _ch_checkArgs(arguments, 1, "bk(distance) requires one argument");
    fd(-distance)
}

function st() {
    _ch_checkArgs(arguments, 0, "st() takes no arguments");
    _turtle.query.visible = true;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.visible = true
    })
}

function ht() {
    _ch_checkArgs(arguments, 0, "ht() requires no arguments");
    _turtle.query.visible = false;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.visible = false
    })
}

function pu() {
    _ch_checkArgs(arguments, 0, "pu() requires no arguments");
    _turtle.query.penDown = false;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.penDown = false
    })
}

function pd() {
    _ch_checkArgs(arguments, 0, "pd() requires no arguments");
    _turtle.query.penDown = true;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.penDown = true
    })
}

function arc(degrees, radius) {
    _ch_checkArgs(arguments, 2, "arc(degrees, radius) requires two arguments");
    insertBack(_turtle.commandBuffer, function() {
        var radians = degrees * Math.PI / 180;
        var startAngle = _turtle.heading;
        var endAngle = startAngle + radians;
        var cw = degrees < 0;
        if (_turtle.inDrawingFill) {
            _ch_ctx.arc(_turtle.x, _turtle.y, _turtle.scale * radius, startAngle, endAngle, cw)
        } else if (_turtle.penDown) {
            _ch_ctx.lineWidth = _turtle.width;
            _ch_ctx.strokeStyle = _turtle.color;
            _ch_ctx.beginPath();
            _ch_ctx.arc(_turtle.x, _turtle.y, _turtle.scale * radius, startAngle, endAngle, cw);
            _ch_ctx.stroke()
        }
    })
}

function setSpeed(speed) {
    _ch_checkArgs(arguments, 1, "setSpeed(speed) requires one argument");
    insertBack(_turtle.commandBuffer, function() {
        _turtle.speed = Math.max(.001, speed)
    })
}

function getScale() {
    return _turtle.query.scale
}

function setScale(scale) {
    _ch_checkArgs(arguments, 1, "setSpeed(scale) requires one argument");
    _turtle.query.scale = scale;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.scale = scale
    })
}

function setPosition(x, y) {
    _ch_checkArgs(arguments, 2, "setPosition(x, y) requires two arguments");
    _turtle.query.x = x;
    _turtle.query.y = y;
    insertBack(_turtle.commandBuffer, function() {
        var oldX = _turtle.x,
            oldY = _turtle.y;
        _turtle.x = x;
        _turtle.y = y;
        if (_turtle.inDrawingFill) {
            _ch_ctx.lineTo(x, y)
        } else if (_turtle.penDown) {
            strokeLine(oldX, oldY, _turtle.x, _turtle.y, _turtle.color, _turtle.width)
        }
    })
}

function getX() {
    return _turtle.query.x
}

function setX(x) {
    _ch_checkArgs(arguments, 1, "setX(x) requires one argument");
    _turtle.query.x = x;
    insertBack(_turtle.commandBuffer, function() {
        var oldX = _turtle.x;
        _turtle.x = x;
        if (_turtle.inDrawingFill) {
            _ch_ctx.lineTo(_turtle.x, _turtle.y)
        } else if (_turtle.penDown) {
            strokeLine(oldX, _turtle.y, _turtle.x, _turtle.y, _turtle.color, _turtle.width)
        }
    })
}

function getY() {
    return _turtle.query.y
}

function setY(y) {
    _ch_checkArgs(arguments, 1, "setY(y) requires one argument");
    _turtle.query.y = y;
    insertBack(_turtle.commandBuffer, function() {
        var oldY = _turtle.y;
        _turtle.y = y;
        if (_turtle.inDrawingFill) {
            _ch_ctx.lineTo(_turtle.x, _turtle.y)
        } else if (_turtle.penDown) {
            strokeLine(_turtle.x, oldY, _turtle.x, _turtle.y, _turtle.color, _turtle.width)
        }
    })
}

function clear(r, g, b) {
    var c;
    if (arguments.length === 1) {
        c = r
    } else {
        if (arguments.length < 3) {
            _ch_error("Use clear(colorname) or clear(r, g, b)")
        }
        c = makeColor(r, g, b, 1)
    }
    insertBack(_turtle.commandBuffer, function() {
        fillRectangle(-screenWidth / 2, -screenHeight / 2, screenWidth, screenHeight, c)
    })
}
var setxy = setPosition;

function setHeading(deg) {
    _ch_checkArgs(arguments, 1, "setHeadingY(degrees) requires one argument");
    var a = (90 - deg) * Math.PI / 180;
    _turtle.query.heading = a;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.heading = a
    })
}
var setheading = setHeading;

function getHeading() {
    return 90 - _turtle.query.heading * 180 / Math.PI
}

function setWidth(t) {
    t = Math.min(100, Math.max(1, t));
    _turtle.query.width = t;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.width = t
    })
}
var setwidth = setWidth;

function setColor(r, g, b, a) {
    var c;
    if (arguments.length === 1) {
        c = r
    } else {
        if (arguments.length < 3 || arguments.length > 4) {
            _ch_error("Use setColor(colorname), setColor(r, g, b), or setColor(r, g, b, a)")
        }
        c = makeColor(r, g, b, a || 1)
    }
    insertBack(_turtle.commandBuffer, function() {
        _turtle.color = c
    })
}
var setcolor = setColor;

function startFill(r, g, b, a) {
    var c;
    if (arguments.length === 1) {
        c = r
    } else {
        if (arguments.length < 3 || arguments.length > 4) {
            _ch_error("Use startFill(colorname), startFill(r, g, b), or startFill(r, g, b, a)")
        }
        c = makeColor(r, g, b, a || 1)
    }
    if (_turtle.inRecordingFill) {
        _ch_error("Already in a startFill() ... endFill()")
    }
    _turtle.inRecordingFill = true;
    insertBack(_turtle.commandBuffer, function() {
        _turtle.inDrawingFill = true;
        _ch_ctx.fillStyle = c;
        _ch_ctx.beginPath();
        _ch_ctx.moveTo(_turtle.x, _turtle.y)
    })
}

function endFill() {
    _ch_checkArgs(arguments, 0, "endFill() takes no arguments");
    if (!_turtle.inRecordingFill) {
        _ch_error("Not in a fill")
    }
    insertBack(_turtle.commandBuffer, function() {
        _ch_ctx.fill();
        if (_turtle.penDown) {
            _ch_ctx.lineWidth = _turtle.width;
            _ch_ctx.strokeStyle = _turtle.color;
            _ch_ctx.stroke()
        }
        _turtle.inDrawingFill = false
    });
    _turtle.inRecordingFill = false
}

function wait(seconds) {
    _ch_checkArgs(arguments, 0, "wait() takes no arguments");
    insertBack(_turtle.commandBuffer, function() {
        _turtle.waitEndTime = currentTime() + seconds
    })
}

function _escapeHTML(s) {
    return s.replace(/[^0-9A-Za-z ]/g, function(c) {
        return "&#" + c.charCodeAt(0) + ";"
    })
}
var _turtle = Object.seal({
    commandBuffer: [],
    query: {
        x: 0,
        y: 0,
        heading: Math.PI / 2,
        scale: 1,
        visible: true,
        penDown: true,
        width: 2
    },
    image: null,
    x: 0,
    y: 0,
    heading: Math.PI / 2,
    visible: true,
    penDown: true,
    width: 2,
    color: "#000000",
    fillColor: "#000000",
    speed: 1,
    scale: 1,
    inDrawingFill: false,
    inRecordingFill: false,
    frameCounter: 0,
    waitEndTime: 0,
    nextCommandIndex: 0,
    onerror: function(message, source, line, column, error) {
        if (_ch_inInclude) {
            _ch_inInclude = false;
            return true
        } else {
            var text = error + " at line " + (parent && parent.LINE_NUMBER_OFFSET ? line - parent.LINE_NUMBER_OFFSET : line) + ", column " + column;
            var sourceLine = (document.body.originalHTML || document.body.innerHTML).split("\n")[Math.max(0, line - 1)];
            var manyFunctions = (sourceLine.match(/\(/g) || []).length > 1;
            if (text.indexOf("Unexpected identifier") !== -1 && manyFunctions) {
                text += "<br/>(did you forget to put each command on a new line?)"
            }
            var msg = document.createElement("div");
            msg.innerHTML = '<pre style="font-size: 75%">\n' + _escapeHTML(sourceLine) + "\n" + new Array(Math.max(column - 1, 0)).join(" ") + "\u21e7</pre>" + text;
            msg.style.padding = "15px";
            msg.style.fontSize = "45px";
            msg.style.fontFamily = "Arial";
            msg.style.color = "#000";
            msg.style.position = "absolute";
            msg.style.bottom = "0px";
            msg.style.left = "0px";
            msg.style.right = "-1px";
            msg.style.background = "rgba(255, 128, 128,0.75)";
            ui.appendChild(msg);
            if (parent && parent.onTurtleScriptError) {
                parent.onTurtleScriptError(message, source, line, column, error)
            }
            return true
        }
    },
    updatePosition: function() {
        _turtle.image.style.visibility = _turtle.visible ? "visible" : "hidden";
        _turtle.image.style.top = Math.floor(.5 + screenHeight / 2 - _turtle.y) + "px";
        _turtle.image.style.left = Math.floor(.5 + screenWidth / 2 + _turtle.x) + "px";
        _turtle.image.style.transform = "rotate(" + (Math.PI / 2 - _turtle.heading) + "rad)"
    }
});
var WHITE = "#FFFFFF";
var RED = "#FF0000";
var GREEN = "#3cdd11";
var LIME = "#82fa88";
var BLUE = "#374aff";
var PINK = "#fd95cb";
var BABY_BLUE = "#b7daff";
var APRICOT = "#f1c08b";
var CYAN = "#6ec9fd";
var YELLOW = "#fefe41";
var VIOLET = "#9e5fe6";
var BROWN = "#9b4305";
var PURPLE = "#9e0995";
var ORANGE = "#ff7800";
var BLACK = "#000000";
var GRAY = "#999999";
var SILVER = "#DDDDDD";
var GOLD = "#f0cb1d";
var UMBER = "#a76d54";
var DARK_BROWN = "#492f30";
var BRONZE = "#ce7f2b";
var COPPER = "#e15518";

function onSetup() {
    fillRectangle(0, 0, screenWidth, screenHeight, makeColor(0, 0, 0));
    _ch_ctx.lineCap = "round";
    _ch_ctx.setTransform(1, 0, 0, -1, screenWidth / 2, screenHeight / 2);
    _turtle.image.style.position = "absolute";
    ui.appendChild(_turtle.image);
    _turtle.image.style.marginLeft = Math.floor(-_turtle.image.width / 2 + .5) + "px";
    _turtle.image.style.marginTop = Math.floor(-_turtle.image.height / 2 + .5) + "px";
    _turtle.updatePosition()
}

function onTick() {
    if (_turtle.nextCommandIndex < _turtle.commandBuffer.length) {
        ++_turtle.frameCounter;
        if (_turtle.speed >= 1 || _turtle.frameCounter * _turtle.speed >= 1) {
            _turtle.frameCounter = 0;
            var num = Math.max(1, Math.min(_turtle.speed, _turtle.commandBuffer.length - _turtle.nextCommandIndex));
            for (var i = 0; i < num && _turtle.waitEndTime < currentTime(); ++i) {
                var cmd = _turtle.commandBuffer[_turtle.nextCommandIndex];
                ++_turtle.nextCommandIndex;
                cmd()
            }
            _turtle.updatePosition()
        }
    } else {
        _turtle.commandBuffer = [];
        _ch_stopTimer()
    }
}
document.write('<script>_turtle.image = loadImage("turtle.png"); window.onerror = _turtle.onerror;</script>');
