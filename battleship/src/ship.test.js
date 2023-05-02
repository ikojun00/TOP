import Ship from './ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3);
  });

  test('takes a hit', () => {
    ship.hit(2);
    expect(ship.hits).toContain(2);
  });

  test('sinks', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.sunk()).toBe(true);
  });

  test('prevents being hit multiple times at the same spot', () => {
    ship.hit(1);
    ship.hit(1);
    ship.hit(1);
    expect(ship.hits).toContain(1);
  });
});
