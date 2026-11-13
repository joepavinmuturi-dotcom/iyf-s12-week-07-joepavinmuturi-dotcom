// BEFORE: replace this file with YOUR messiest code from the course.
// This sample shows the kind of problems to fix.
var d = [];
function f(x, y) {
    if (x != "") {
        if (y > 0) {
            if (y < 100) {
                d.push({ n: x, p: y * 1.16 });
                console.log("ok");
            } else {
                console.log("bad");
            }
        }
    }
}
function t() {
    var s = 0;
    for (var i = 0; i < d.length; i++) {
        s = s + d[i].p;
    }
    return s;
}
