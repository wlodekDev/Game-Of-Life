document.addEventListener("DOMContentLoaded", function () {

    function GameOfLife(boardWidth, boardHeight) {

        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector("#board");
        this.cells = [];
        var playBtn = document.querySelector("#play");
        var pauseBtn = document.querySelector("#pause");

        this.createBoard = function () {

            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.width * 10 + "px";
            var howManyCels = this.width * this.height;

            // console.log(howManyCels);

            for (var i = 0; i < howManyCels; i++) {
                var div = document.createElement('div');
                this.board.appendChild(div);
            }
            this.cells = document.querySelectorAll("#board div");

            this.cells.forEach(function (val) {
                val.addEventListener('click', function () {
                    this.classList.toggle("live");
                });
            });
            // console.log(this.cells[this.xyCell(2,5)]);

            this.setCellState = function (x, y, state) {
                if (state === 'live') {
                    this.cells[this.xyCell(x, y)].classList.add("live");
                }
            };

            this.firstGlider = function () {
                this.setCellState(3, 2, "live");
                this.setCellState(3, 1, "live");
                this.setCellState(5, 2, "live");
                this.setCellState(4, 0, "live");
                this.setCellState(4, 2, "live");
            };

            this.gun = function () {
                this.setCellState(15,10, "live");
                this.setCellState(15,11, "live");
                this.setCellState(16,10, "live");
                this.setCellState(16,11, "live");

                this.setCellState(24,7, "live");
                this.setCellState(24,8, "live");
                this.setCellState(25,8, "live");
                this.setCellState(26,8, "live");
                this.setCellState(27,8, "live");
                this.setCellState(25,9, "live");
                this.setCellState(26,9, "live");
                this.setCellState(27,9, "live");
                this.setCellState(28,9, "live");
                this.setCellState(25,10, "live");
                this.setCellState(28,10, "live");
                this.setCellState(25,11, "live");
                this.setCellState(26,11, "live");
                this.setCellState(27,11, "live");
                this.setCellState(28,11, "live");
                this.setCellState(24,12, "live");
                this.setCellState(25,12, "live");
                this.setCellState(26,12, "live");
                this.setCellState(27,12, "live");
                this.setCellState(24,13, "live");

                this.setCellState(36,12, "live");
                this.setCellState(37,12, "live");
                this.setCellState(38,12, "live");
                this.setCellState(37,11, "live");
                this.setCellState(38,11, "live");
                this.setCellState(39,11, "live");
                this.setCellState(37,13, "live");
                this.setCellState(38,13, "live");
                this.setCellState(39,13, "live");
                this.setCellState(38,10, "live");
                this.setCellState(40,10, "live");
                this.setCellState(39,9, "live");
                this.setCellState(40,9, "live");
                this.setCellState(38,14, "live");
                this.setCellState(40,14, "live");
                this.setCellState(39,15, "live");
                this.setCellState(40,15, "live");

                this.setCellState(47,11, "live");
                this.setCellState(48,11, "live");
                this.setCellState(47,12, "live");
                this.setCellState(48,12, "live");
            };

            this.computeCellNextState = function (x, y) {
                var sibllAr = [];

                sibllAr.push(this.cells[this.xyCell(x - 1, y - 1)]);
                sibllAr.push(this.cells[this.xyCell(x, y - 1)]);
                sibllAr.push(this.cells[this.xyCell(x + 1, y - 1)]);
                sibllAr.push(this.cells[this.xyCell(x - 1, y)]);
                sibllAr.push(this.cells[this.xyCell(x + 1, y)]);
                sibllAr.push(this.cells[this.xyCell(x - 1, y + 1)]);
                sibllAr.push(this.cells[this.xyCell(x, y + 1)]);
                sibllAr.push(this.cells[this.xyCell(x + 1, y + 1)]);

                var liveCount = 0;
                sibllAr.forEach(function (el) {
                    if (el !== undefined) {
                        if (el.getAttribute("class") === "live") {
                            liveCount++;
                        }
                    }
                });

                var result = null;

                if (this.cells[this.xyCell(x, y)].getAttribute("class") === "live") {
                    if (liveCount === 2 || liveCount === 3) {
                        result =  1;
                    } else {
                        result =  0;
                    }
                }

                if (this.cells[this.xyCell(x, y)].getAttribute("class") !== "live") {
                    if (liveCount === 3) {
                        result =  1;
                    } else {
                        result =  0;
                    }
                }

                // console.log(result);
                return result;
            };

            this.computeNextGeneration = function () {
                this.nextGeneration = [];
                for(var i = 0; i < this.cells.length; i++) {
                    var x = i % boardWidth;
                    var y = Math.floor(i / boardHeight);

                    this.nextGeneration.push(this.computeCellNextState(x, y));

                }
                return this.nextGeneration;
            };

            this.printNextGeneration = function () {
                var grid = this.cells;
                for(var i = 0; i < this.cells.length; i++){
                    if(this.nextGeneration[i] === 1 && grid[i].getAttribute("class") !== "live"){
                        grid[i].classList.add("live");
                    } else if(this.nextGeneration[i] === 0 && grid[i].getAttribute("class") === "live"){
                        grid[i].classList.remove("live");
                    }
                }
            };

            this.xyCell = function (x, y) {
                this.x = x;
                this.y = y;

                return this.x + this.y * this.width;
            };
        };

        var self = this;
        var interval;

        playBtn.addEventListener('click', function () {
            interval = setInterval(function () {
                self.computeNextGeneration();
                self.printNextGeneration();
            }, 100);
        });

        pauseBtn.addEventListener('click', function () {

            interval = clearInterval(interval);

        });
    }

    var widthAsk = "";
    var heightAsk = "";

    function start() {

        widthAsk = prompt("Write down a number which will be a width of your matrix " +
            "(recommended amount of width cells is 100)");
        heightAsk = prompt("Write down a number which will be a height of your matrix " +
            "(recommended amount of height cells is 100)");
    }

    start();

    var game = new GameOfLife(widthAsk,heightAsk);
    game.createBoard();
    game.firstGlider();
    game.gun();
});
