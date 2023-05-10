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
      let directions = [1, -1, 10, -10]; // possible directions to move
      let nextMove;

      do {
        const position = getRandomNum(directions.length);
        const randomDirection = directions[position];
        nextMove = lastShot.location + randomDirection;
        directions = directions
          .slice(0, position)
          .concat(directions.slice(position + 1));

        if (directions.length === 0) return getRandMove();
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
    getRandomNum,
  };
};

module.exports = Player;
