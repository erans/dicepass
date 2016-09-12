var DicePass = {
  _hasBrowserCryptoSupport: function() {
    if ((window.crypto && window.crypto.getRandomValues) ||
      (window.msCrypto && window.msCrypto.getRandomValues)) {
      return true;
    }

    return false;
  },
  _getRandomNumbers: function() {
    var numbers = new Uint32Array(5);
    if (this._hasBrowserCryptoSupport()) {
      crypto = window.crypto ? window.crypto : window.msCrypto
      crypto.getRandomValues(numbers);
      return numbers;
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
      diceResult.push(diceNumber);
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
