# [DicePass](https://dicepass.org) - Digital version of EFF's dice (http://eff.org/dice)
Written by Eran Sandler ([@erans](https://twitter.com/erans)) http://eran.sandler.co.il (c) 2016

EFF's dice is a system that utilizes a dice (or 5 if you want it to be quicker) to generate a 5 digits number. Once you have 6 such numbers you search each one in a long words list ([like this one](https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt)) which helps you to generate a passphrase that you can (more easily) remember than a random set of characters.

## Security
**EVERYTHING RUNS LOCALLY IN THE BROWSER !**

Everything runs in the local browser. You can run it locally (clone and open index.html) or use the hosted version at https://dicepass.org.

## How does it work?
DicePass uses new browsers' native Javascript API for a Pseudo Random Number Generator (PRNG) - ```crypto.getRandomValues``` -  via the underlying operating system of the browser (so its cryptographically sound(er)) to mimic the throw of a dice - as if you were throwing it yourself. While this is considered by most people as less satisfying than throwing dices around, it generates results that are safe enough yet rememberable (not to mention it takes a lot less time).

We mimic throwing 5 dices 6 times and use the same EFF large wordlist that was converted into a Javascript Dictionary for easier lookup.

Browsers that supports the new ```crypto.getRandomValues``` JavaScript API are:
- IE 11+
- Edge 13+ (the new Microsoft browser)
- Firefox 47+
- Chrome 49+
- Safari 9.1+
- Opera 39+
- iOS Safari 9.2+
- Opera Mini (all versions)
- Android Browser 4.4+
- Chrome for Android 51+

For all other unsupported browsers, we will issue an alert and use a less secure pseudo random numbers generator based on the [ISSAC](http://www.burtleburtle.net/bob/rand/isaac.html) algorithm (https://github.com/rubycon/isaac.js). While its significantly less secure as the numbers are far less random than it appears, it still holds some value to users.
