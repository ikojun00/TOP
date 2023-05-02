const Ship = (length, hits = []) => {
  const hit = (position) => {
    if (position < 0 || position >= length || hits.includes(position)) return;
    hits.push(position);
  };
  const sunk = () => {
    if (length === hits.length) return true;
    return false;
  };
  return { length, hits, hit, sunk };
};

module.exports = Ship;
