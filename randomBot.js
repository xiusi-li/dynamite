class Bot {

    makeMove(gamestate) {

        function DynamiteCount(gamestate) {

            var p1DynamiteCount = 0;

            for (let i = 0; i < gamestate.rounds.length; i++) {

                if (gamestate.rounds[i].p1 === 'D') {
                    p1DynamiteCount = p1DynamiteCount + 1;
                }

            }

            return p1DynamiteCount;

        }



        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        console.log(DynamiteCount(gamestate));

        if (DynamiteCount(gamestate) < 100) {
            switch (getRandomInt(0, 5)) {
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


        } else {

            switch (getRandomInt(0, 4)) {
                case 0:
                    return 'R';
                case 1:
                    return 'P';
                case 2:
                    return 'S';
                case 3:
                    return 'W';


            }

        }
    }
}

module.exports = new Bot();