let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let o = "oval";
let x = "cross";

let size = 3;

let turn = 1;

$(document).ready(function(){
    updateMarks();

    $(".cell").click(function () { 
        let str = this.className.split(" ")[1].split("-");
        let y = parseFloat(str[1]) - 1;
        let x = parseFloat(str[2]) - 1;

        grid[y][x] = 2;

        updateMarks();
    });



    $(".reset").click(function () { 
        grid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        
        updateMarks();
    });

    
});




function updateMarks() {
    let i = 0;
    while (i != size) {
        let j = 0;
        while (j != size) {
            if (grid[i][j] === 0) {
                $(toString(i, j) + " > .mark").removeClass(o);
                $(toString(i, j) + " > .mark").removeClass(x);
            }
            if (grid[i][j] === 1) {
                $(toString(i, j) + " > .mark").addClass(x);
            }
            if (grid[i][j] === 2) {
                $(toString(i, j) + " > .mark").addClass(o);
            }
            j++;
        }
        i++;
    }
}



function toString(A, B) {
    A++;
    B++;
    if (A > 3 || A < 1 || B > 3 || B < 1) {
        return "";
    }
    return ".pos-" + A + "-" + B;
}