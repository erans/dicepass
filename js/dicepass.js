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
    // Because there are only 6 values on a die, an 8-bit number is sufficient
    var numbers = new Uint8Array(this.DEFAULT_WORD_COUNT);
    if (this.HasBrowserCryptoSupport()) {
      crypto = window.crypto ? window.crypto : window.msCrypto
      crypto.getRandomValues(numbers);
      for (var i = 0; i < this.DEFAULT_WORD_COUNT; i++) {
        // 256 is not a multiple of 6, so an 8-bit number is biased.
        // 252 is a multiple of 6, so wee need to stay within [0,251].
        while (numbers[i] >= 252) {
          var tmp = new Uint8Array(1);
          crypto.getRandomValues(tmp);
          numbers[i] = tmp[0];
        }
      }
      return numbers;
    } else {
      // This is an older browser or a browser that do not support access to
      // the OS's underlying Pseudo Random Number Generator (PRNG).
      // We will use math random seeded random that is better than nothing,
      // but this won't be cryptographically sound.
      numbers = new Array();
      for (var i = 0; i < this.DEFAULT_WORD_COUNT; i++) {
        numbers.push(isaac.rand() & 0x7fffffff); // range: [0, 2147483647]
        // 2147483647 is not divisible by 6, so force a range that is:
        while(numbers[i] >= 2147483646) {
          numbers[i] = Math.abs(isaac.rand());
        }
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

    // at this point, numbers[] has unbiased numbers mod 6
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
