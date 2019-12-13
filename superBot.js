class Bot {

    DynamiteCount(gamestate) {

        var p1DynamiteCount = 0;

        var p2DynamiteCount = 0;

        for (let i = 0; i < gamestate.rounds.length; i++) {

            if (gamestate.rounds[i].p1 === 'D') {
                p1DynamiteCount = p1DynamiteCount + 1;
            }

            if (gamestate.rounds[i].p2 === 'D') {
                p2DynamiteCount = p2DynamiteCount + 1;
            }

        }

        return [p1DynamiteCount, p2DynamiteCount];

    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    makeMove(gamestate) {


        if (this.DynamiteCount(gamestate)[0] < 100 && this.DynamiteCount(gamestate)[1] < 100) {

            switch (this.getRandomInt(0, 5)) {
                case 0:
                    return 'R';
                case 1:
                    return 'P';
                case 2:
                    return 'S';
                case 3:
                    return 'W';
                case 4:
                    return 'D';

            }


        } else if (this.DynamiteCount(gamestate)[0] < 100 && this.DynamiteCount(gamestate)[1] === 100) {
            return 'D';

        } else if (this.DynamiteCount(gamestate)[0] === 100 && this.DynamiteCount(gamestate)[1] < 100) {

            switch (this.getRandomInt(0, 4)) {
                case 0:
                    return 'R';
                case 1:
                    return 'P';
                case 2:
                    return 'S';
                case 3:
                    return 'W';

            }

        } else {

            switch (this.getRandomInt(0, 3)) {
                case 0:
                    return 'R';
                case 1:
                    return 'P';
                case 2:
                    return 'S';

            }

        }
    }
}


module.exports = new Bot();