export function capitalizeString(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export function capitalizeFirstLetterOfEachWord(words: string) {
  var separateWord = words.toLowerCase().split('_');
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}
