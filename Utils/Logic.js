function CalculateShards(level) {
    let baseCosts = [25, 50, 100, 250, 500, 1000, 2000,4000,5000,8000];
    return baseCosts[level]
}
module.exports = {CalculateShards}