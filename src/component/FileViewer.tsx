import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocumentType } from '../documents';

interface FileViewerProps {
    document: DocumentType;
  }
  
const FileViewer = React.memo(({ document }:FileViewerProps) => {
  return (
    <DocViewer
      documents={[{ uri: document.uri, fileType: document.fileType }]}
      pluginRenderers={DocViewerRenderers}
      config={{
        header: {
          disableHeader: false,
          disableFileName: false,
          retainURLParams: false
        }
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
});

export default FileViewer;
export {}