const Player = (name) => {
  const playerInfo = {
    name,
    shots: [],
  };

  const getRandMove = () => {
    let randMove = getRandomNum(100);
    while (playerInfo.shots.includes(randMove)) {
      randMove = getRandomNum(100);
    }
    playerInfo.shots.push(randMove);
    return randMove;
  };

  const getRandomNum = (num) => Math.floor(Math.random() * num);

  const resetShots = () => {
    playerInfo.shots.length = 0;
  };

  const AI = (lastShot) => {
    if (lastShot.hit) {
      const directions = [1, -1, 10, -10]; // possible directions to move
      let nextMove;
      let timeOut = 0;

      do {
        const randomDirection = directions[getRandomNum(directions.length)];
        nextMove = lastShot.location + randomDirection;
        timeOut += 1;
        if (timeOut === directions.length) return getRandMove();
      } while (
        playerInfo.shots.includes(nextMove) ||
        nextMove > 99 ||
        nextMove < 0
      );

      playerInfo.shots.push(nextMove);
      return nextMove;
    }
    return getRandMove();
  };

  return {
    playerInfo,
    AI,
    getRandMove,
    resetShots,
  };
};

module.exports = Player;
