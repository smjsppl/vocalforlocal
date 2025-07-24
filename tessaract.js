<!DOCTYPE html>
<html>
  <head>
    <title>OCR Test</title>
    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/dist/tesseract.min.js"></script>
  </head>
  <body>
    <h2>Upload Image</h2>
    <input type="file" accept="image/*" onchange="readImage(this)">
    <p id="output">Text will appear here...</p>

    <script>
      function readImage(input) {
        const file = input.files[0];
        if (file) {
          Tesseract.recognize(file, 'eng')
            .then(result => {
              document.getElementById('output').innerText = result.data.text;
            });
        }
      }
    </script>
  </body>
</html>
