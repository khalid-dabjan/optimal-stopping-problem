export default class {
  /**
   * Class Constructor
   * @param {number} n The size of the pool of candidates.
   * @param {number} minS The minimum qualification numeric value a candidate can have.
   * @param {number} maxS The maximum qualification numeric value a candidate can have.
   */
  constructor(n = 100, minS = 0, maxS = 1000) {
    this.validateInput(n, minS, maxS);
    this.n = n;
    this.minS = minS;
    this.maxS = maxS;
    this.pool = [];
    this.countToSkip = Math.round(this.n / Math.E);
    this.generateCandidates();

    this.solve();
  }

  /**
   * Validates the class input.
   * @param {number} n
   * @param {number} minS
   * @param {number} maxS
   * @throws {error}
   */
  validateInput(n, minS, maxS) {
    if (n < 3) {
      throw new Error("N cannot be less than 3.");
    }

    if (n > 100) {
      throw new Error("N cannot be greater than 100.");
    }

    if (minS < 0) {
      throw new Error("Minimum Qualification cannot be less than 0.");
    }

    if (minS >= maxS) {
      throw new Error(
        "Minimum qualification must be less than maximum qualification."
      );
    }
  }

  /**
   * Generates the pool of candidates and assigns them random qualifications score.
   */
  generateCandidates() {
    for (let i = 1; i <= this.n; i++) {
      this.pool.push({
        index: i,
        score: Math.round(Math.random() * (this.maxS - this.minS) + this.minS)
      });
    }
  }

  /**
   * sets the calculated best candidate and the actual best candidate
   */
  solve() {
    this.calculatedBestCandidate = this.calculatedBestCandidate();
    this.actualBestCandidate = this.actualBestCandidate();
  }

  /**
   * Returns what we thing the best candidate is according to the algorithm
   */
  calculatedBestCandidate() {
    let highestSoFar = 0;
    return this.pool.find(candidate => {
      if (candidate.index <= this.countToSkip) {
        highestSoFar =
          highestSoFar < candidate.score ? candidate.score : highestSoFar;
        return false;
      }
      if (candidate.score > highestSoFar || candidate.index === this.n) {
        return true;
      }
      return false;
    });
  }

  /**
   * Returns the actual best candidate with the highest qualifications score
   */
  actualBestCandidate() {
    return this.pool.reduce((a, b) => (a.score > b.score ? a : b));
  }
}
