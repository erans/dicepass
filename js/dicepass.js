var DicePass = {
  DEFAULT_WORD_COUNT : 5,

  HasBrowserCryptoSupport: function() {
    if ((window.crypto && window.crypto.getRandomValues) ||
      (window.msCrypto && window.msCrypto.getRandomValues)) {

      if(Uint32Array.prototype.join === undefined) {
        Uint32Array.prototype.join = Array.prototype.join;
      }

      return true;
    }

    return false;
  },
  _getRandomNumbers: function() {
    var numbers = new Uint32Array(this.DEFAULT_WORD_COUNT);
    if (this.HasBrowserCryptoSupport()) {
      crypto = window.crypto ? window.crypto : window.msCrypto
      crypto.getRandomValues(numbers);
      return numbers;
    } else {
      // This is an older browser or a browser that do not support access to
      // the OS's underlying Pseudo Random Number Generator (PRNG).
      // We will use math random seeded random that is better than nothing,
      // but this won't be cryptographically sound.
      numbers = new Array();
      for (var i = 0; i < this.DEFAULT_WORD_COUNT; i++) {
        var v = isaac.rand();
        if (v < 0) {
          v = v * -1;
        }
        numbers.push(v);
      }
    }
    return numbers;
  },
  Roll : function() {
    numbers = this._getRandomNumbers();
    // If 000000 is returned, we failed to generate nubmers and/or
    // roll our virtual dice
    if (numbers.join("") == "000000") {
        return numbers;
    }

    var diceResult = new Array();
    for (i in numbers) {
      var diceNumber = (numbers[i] % 6)+1;

      if(!isNaN(diceNumber)) {
        diceResult.push(diceNumber);
      }
    }

    return diceResult;
  },
  GeneratePassPhrase: function(wordList) {
    var result = []
    for (var i = 0; i < 6; i++) {
        var diceRollResult = this.Roll().join("");
        if (diceRollResult in wordList) {
          result.push(wordList[diceRollResult]);
        }
    }

    return result;
  }
}
