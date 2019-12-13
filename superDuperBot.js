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

    opponentWaterCount(gamestate) {

        var p2WaterCount = 0;

        for (let i = 0; i < gamestate.rounds.length; i++) {

            if (gamestate.rounds[i].p2 === 'W') {
                p2WaterCount = p2WaterCount + 1;
            }

        }

        return p2WaterCount;

    }

    lastRoundIsDraw(gamestate) {

        if (gamestate.rounds[gamestate.rounds.length - 1].p1 === gamestate.rounds[gamestate.rounds.length - 1].p2) {
            return true;
        } else {
            return false;
        }


    }

    opponentRanOut(gamestate) {

        if (this.DynamiteCount(gamestate)[1] < 100) {
            return false;
        } else {
            return true;
        }


    }

    iRanOut(gamestate) {

        if (this.DynamiteCount(gamestate)[0] < 100) {
            return false;
        } else {
            return true;
        }


    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    makeMove(gamestate) {


        if (gamestate.rounds.length === 0){
            return 'D'
        } else{
            if (!this.opponentRanOut(gamestate) && !this.iRanOut(gamestate)) {

                let d = this.DynamiteCount(gamestate)[1] / gamestate.rounds.length;
                let w = this.opponentWaterCount(gamestate) / gamestate.rounds.length;

    
                switch (Math.max(1 - d + w, 2 * d, 2 - 2 * d - 2 * w)) {
    
                    case 1 - d + w:
    
                        switch (this.getRandomInt(0, 3)) {
                            case 0:
                                return 'R';
                            case 1:
                                return 'P';
                            case 2:
                                return 'S';
    
                        }
    
                        case 2 * d:
    
                            return 'W';
    
                        case 2 - 2 * d - 2 * w:
    
                            return 'D';
    
                }
    
    
    
            } else if (this.opponentRanOut(gamestate) && !this.iRanOut(gamestate)) {
                
                if (this.lastRoundIsDraw(gamestate)) {
                    return 'D' //probably dangerous-- fix later if required
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
            
            } else if (!this.opponentRanOut(gamestate) && this.iRanOut(gamestate)) {
    
                let d = this.DynamiteCount(gamestate)[1] / gamestate.rounds.length;
                let w = this.opponentWaterCount(gamestate) / gamestate.rounds.length;

    
    
    
                switch (Math.max(1 - d + w, 2 * d)) {
    
                    case 1 - d + w:
    
                        switch (this.getRandomInt(0, 3)) {
                            case 0:
                                return 'R';
                            case 1:
                                return 'P';
                            case 2:
                                return 'S';
    
                        }
    
                        case 2 * d:
    
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
}


module.exports = new Bot();