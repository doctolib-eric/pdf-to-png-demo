import React from "react";
import "./App.css";
import pdfToPng from "./pdfToPng";

export default () => {
  const [pngUrl, setPngUrl] = React.useState();

  const onFileChange = async event => {
    const pdfFile = event.target.files[0];
    const pngBlob = await pdfToPng(pdfFile);
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
