$(document).ready( function() {
  $("#generate-button").click( function(e) {
    e.preventDefault();
    var passphraseWords = DicePass.GeneratePassPhrase(EFF_LARGE_WORDLIST);
    $(".result").text(passphraseWords.join(" "));
    $(".result").show();
  })
});
