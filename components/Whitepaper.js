import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Whitepaper = () => {
  return (
    <div className="container mx-auto text-center my-8">
      <a
        href="https://decent-cloud.github.io/website/decent-cloud-whitepaper.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Read the Decent Cloud Whitepaper
      </a>
    </div>
  );
};

export default Whitepaper;
