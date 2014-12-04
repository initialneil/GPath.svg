/*

SVG to GPath Converter

Rajendra Serber

*/

// INSTANTIATE HANDLER
document.getElementById('files').addEventListener('change', handleFileSelect, false) ;


function handleFileSelect(event) {
  var files = event.target.files; // FileList object

  // Loop through the FileList
  for (var i = 0, f; f = files[i]; i++) {

    // Only process SVG files.
    if (!f.type.match('image.svg')) {
      continue;
      // TODO: show error if not svg
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var span = document.createElement('span');
        span.innerHTML = [
        displayFile(theFile, e)
        , displayGPathInfo(theFile, e)
        ].join('');
        document.getElementById('list').insertBefore(span, document.getElementById('list').firstChild);
      } ;
    })(f) ;

    // Read in the svg file as a text.
    reader.readAsText(f) ;
  }
}


function displayFile(fileshapes, fileData) {
  return [fileData.target.result] ;
}


function displayGPathInfo(theFile, fileData) {
  points = new GPathInfo(fileData.target.result, {
              'file': theFile,
              'decimal': document.getElementById('decimal').value,
            }) ;
  return ['<pre>' + points.text + '</pre>'] ;
  
}
