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

    DynamiteCountAfterIRanOut(gamestate,runOutTime) {
        
        var count = 0;

        for (let i = runOutTime; i < gamestate.rounds.length; i++) {

            if (gamestate.rounds[i].p2 === 'D') {
                p2DynamiteCount = p2DynamiteCount + 1;
            }

        }

        return count;
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

    waterCountAfterOpponentRanOut(gamestate,runOutTime) {
        var count = 0;

        for (let i = runOutTime; i < gamestate.rounds.length; i++) {

            if (gamestate.rounds[i].p2 === 'W') {
                p2WaterCount = p2WaterCount + 1;
            }

        }

        return count;
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

        var runOutTime;

        let time = gamestate.rounds.length;

        if (time === 0){
            return 'D'
        } else{
            // console.log(gamestate.rounds[time-1]);
            // console.log(this.DynamiteCount(gamestate));
            if (!this.opponentRanOut(gamestate) && !this.iRanOut(gamestate)) {

                let d = this.DynamiteCount(gamestate)[1] / time;
                let w = this.opponentWaterCount(gamestate) / time;

                let adjustedTime = Math.exp((2500-time)/500)/Math.exp(5); 
                let RPS = (1+adjustedTime)*(1 - d + w);
                let W = 2*(1+adjustedTime)*d;
                let D = (1-adjustedTime)*(2 - 2 * d - 2 * w);
    
    
                switch (Math.max(RPS, W,D)) {
    
                    case RPS:
    
                        switch (this.getRandomInt(0, 3)) {
                            case 0:
                                return 'R';
                            case 1:
                                return 'P';
                            case 2:
                                return 'S';
    
                        }
    
                    case W:
    
                        return 'W';
    
                    case D:
    
                        return 'D';
    
                }
    
    
    
            } else if (this.opponentRanOut(gamestate) && !this.iRanOut(gamestate)) {

                if (runOutTime === undefined){
                    runOutTime = time;
                }

                if (this.lastRoundIsDraw(gamestate)) {
                    return 'D';
                } else {

                    if (time-runOutTime === 0){ return 'R'}

                    let w = this.waterCountAfterOpponentRanOut(gamestate,runOutTime);

                    let adjustedTime = Math.exp(((2500-runOutTime)-(time-runOutTime))/500)/Math.exp((2500-runOutTime)/500); 
                    let RPS = (1+adjustedTime)*(1 + w);
                    let D = (1-adjustedTime)*(2 - 2 * w);
        
                    switch (Math.max(RPS, D)) {
    
                        case RPS:
        
                            switch (this.getRandomInt(0, 3)) {
                                case 0:
                                    return 'R';
                                case 1:
                                    return 'P';
                                case 2:
                                    return 'S';
        
                            }
        
                            case D:
        
                                return 'D';
        
                    }
    
                }
            
            } else if (!this.opponentRanOut(gamestate) && this.iRanOut(gamestate)) {

                if (runOutTime === undefined){
                    runOutTime = time;
                }

                if (time-runOutTime ===0){ return 'P'}

                let d = this.DynamiteCountAfterIRanOut(gamestate,runOutTime) / (time-runOutTime);
            
                switch (Math.max(1 - d, 2 * d)) {
    
                    case 1 - d:
    
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