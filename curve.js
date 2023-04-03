function sigmoid(x) {
    return 100 / (1 + Math.exp(-0.1 * (x - 45)))
}

console.log(sigmoid(45))
