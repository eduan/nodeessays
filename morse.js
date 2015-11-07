var MORSE_CODE = {'\.-' : 'A', '-\.\.\.' : 'B', '-\.-\.' : 'C', '-\.\.' : 'D', '\.' : 'E', '\.\.-\.' : 'F', '--\.' : 'G', '\.\.\.\.' : 'H', '\.\.' : 'I', '\.---' : 'J', '-\.-' : 'K', '\.-\.\.' : 'L', '--' : 'M', '-\.' : 'N', '---' : 'O', '\.--\.' : 'P', '--\.-' : 'Q', '\.-\.' : 'R', '\.\.\.' : 'S', '-' : 'T', '\.\.-' : 'U', '\.\.\.-' : 'V', '\.--' : 'W', '-\.\.-' : 'X', '-\.--' : 'Y', '--\.\.' : 'Z', '\.-\.-' : 'Ä', '\.--\.-' : 'Á', '\.--\.-' : 'Å', '\.\.-\.\.' : 'É', '--\.--' : 'Ñ', '---\.' : 'Ö', '\.\.--' : 'Ü', '-----' : '0', '\.----' : '1', '\.\.---' : '2', '\.\.\.--' : '3', '\.\.\.\.-' : '4', '\.\.\.\.\.' : '5', '-\.\.\.\.' : '6', '--\.\.\.' : '7', '---\.\.' : '8', '----\.' : '9', }

var decodeBits = function(bits){
  
  var morse = [], bit = 0, bits = bits.replace(/^0+|0+$/g,'').split(''), last = '', 
      trecho = '', 
      morseCode = {'1':{1:'\.', 2:'-'},'0':{1:'', 2:' '}}, 
      frequency = { 0: {}, 1:{}}, 
      obj = { 0: {}, 1:{}},
      morseParsed = {}, 
      morseStr = '';

  for (var i = 0; i < bits.length; i++) {
    if(last.length > 0 && last != bits[i]){
      bit = last > 0 ? 1 : 0;
      obj[bit][trecho.length] = trecho;
      frequency[bit] = obj[bit];
      morse.push(trecho);
      trecho = '';
    }
    trecho += bits[i].toString();
    last = bits[i];
  }
  
  bit = last > 0 ? 1 : 0;
  obj[bit][trecho.length] = trecho;
  frequency[bit] = obj[bit];  
  morse.push(trecho);

  for(var bit in frequency){
    for(var len in frequency[bit]){
      var bitI = bit > 0 ? 0 : 1;
      if(typeof frequency[bitI][len] === 'undefined'){
        frequency[bitI][len] = Array(parseInt(len) + 1).join(bitI);
      }
    }
  }

  for(var bit in frequency){
    var y = 1;
    for(var len in frequency[bit]){
      var decod = morseCode[bit][y++];
      if(typeof decod === 'undefined')
        decod = '  ';
      morseParsed[frequency[bit][len]] = decod;
    }
  }

  for (var m in morse) {
    morseStr += (morseParsed[morse[m]]);
  }

  return morseStr;

}
 
var decodeMorse = function(morseCode){
  var msg = morseCode.split(' ');
  var msgDep = '';
  for(var i in msg){
     msgDep += (typeof MORSE_CODE[msg[i]] !== 'undefined') ? MORSE_CODE[msg[i]] : ' ';
  }
  return msgDep.trim().replace(/(\s+)/g,' ');
}