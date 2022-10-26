let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let o = "oval";
let x = "cross";
let size = 3;
let turn = 2;
let endGame = false;
let stepCou = 0;

$(document).ready(function () {
    // initialization
    initGame();
    updateMarks();
    updateMsg();

    // click tile
    $(".cell").click(function () {
        let str = this.className.split(" ")[1].split("-");
        let y = parseFloat(str[1]) - 1;
        let x = parseFloat(str[2]) - 1;
        makeTurn(y, x);
        updateMarks();
        updateMsg();
    });

    // reset game
    $(".reset").click(function () {
        initGame();
        updateMarks();
        updateMsg();
    });


});



function updateMsg() {
    let target = $(".info");
    target.empty();
    if (endGame) {
        target.append("<strong>Game over!</strong> ");
        if (stepCou === 9) {
            target.append("Draw!");
        } else {
            target.append("Player ");
            if (turn === 1) {
                target.append("1");
            } else {
                target.append("2");
            }
            target.append(" won!");
        }


    } else {
        target.append("Player's ");
        if (turn === 1) {
            target.append("2");
        } else {
            target.append("1");
        }
        target.append(" turn...");
    }
}

function checkWin() {
    let i = 0;
    let j = 0;
    while (i != size) {
        if (grid[i][j] != 0 && grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2]) {
            colorize(i, j, true);
            colorize(i, j + 1, true);
            colorize(i, j + 2, true);
            endGame = true;
            return;
        }
        i++;
    }

    i = 0;
    j = 0;
    while (j != size) {
        if (grid[i][j] != 0 && grid[i][j] === grid[i + 1][j] && grid[i + 1][j] === grid[i + 2][j]) {
            colorize(i, j, true);
            colorize(i + 1, j, true);
            colorize(i + 2, j, true);
            endGame = true;
            return;
        }
        j++;
    }

    if (grid[1][1] != 0 &&
        grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        colorize(0, 2, true);
        colorize(1, 1, true);
        colorize(2, 0, true);
        endGame = true;
        return;
    }

    if (grid[1][1] != 0 &&
        (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2])) {
        colorize(0, 0, true);
        colorize(1, 1, true);
        colorize(2, 2, true);
        endGame = true;
        return;
    }

    if (stepCou === 9) {
        endGame = true;
        draw = true;
    }

}

function makeTurn(Y, X) {
    if (grid[Y][X] != 0 || endGame) {
        return;
    }

    stepCou++;
    if (turn === 1) {
        turn = 2;
        grid[Y][X] = 2;
    } else {
        turn = 1;
        grid[Y][X] = 1;
    }
    checkWin();
}



function initGame() {
    endGame = false;
    turn = 2;
    grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    stepCou = 0;

    let i = 0;
    while (i != size) {
        let j = 0;
        while (j != size) {
            colorize(i, j, false);
            j++;
        }
        i++;
    }
}

function colorize(i, j, col) {
    if (col) {
        $(toString(i, j) + " > .mark").addClass("winner");
    } else {
        $(toString(i, j) + " > .mark").removeClass("winner");
    }
}


function updateMarks() {
    let i = 0;
    while (i != size) {
        let j = 0;
        while (j != size) {
            $(toString(i, j) + " > .mark").removeClass(o);
            $(toString(i, j) + " > .mark").removeClass(x);
            $(toString(i, j) + " > .cross-patch").removeClass("visiable");
            if (grid[i][j] === 1) {
                $(toString(i, j) + " > .mark").addClass(x);
                $(toString(i, j) + " > .cross-patch").addClass("visiable");
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