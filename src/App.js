import React from "react";
import "./App.css";
import pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Inspired by https://stackoverflow.com/questions/12921052/parsing-pdf-pages-as-javascript-images
const pdfBlobToPngBlob = async (pdfBlob, options = {}) => {
  const { scale = 2 } = options;
  const url = URL.createObjectURL(pdfBlob);
  const pdf = await pdfjs.getDocument(url).promise;
  URL.revokeObjectURL(url);
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  canvas.style = `height: ${viewport.height}px; width: ${viewport.width}px`;

  await page.render({ canvasContext: context, viewport }).promise;
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      canvas.remove();
      resolve(blob);
    });
  });
};

export default () => {
  const [pngUrl, setPngUrl] = React.useState();

  const onFileChange = async event => {
    const pdfFile = event.target.files[0];
    const pngBlob = await pdfBlobToPngBlob(pdfFile);
    if (pngUrl) {
      URL.revokeObjectURL(pngUrl);
    }
    setPngUrl(URL.createObjectURL(pngBlob));
  };

  return (
    <div>
      <h1>Browser-side PDF to PNG conversion</h1>
      <form>
        <label htmlFor="file">Choose a PDF file:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={onFileChange}
        />
      </form>
      {pngUrl && (
        <div>
          <a href={pngUrl} download="formerly-a-pdf.png">
            Download
          </a>
          <img src={pngUrl} alt="" />
        </div>
      )}
    </div>
  );
};
