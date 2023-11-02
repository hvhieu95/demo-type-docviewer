import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import { DocumentType } from "../documents";
=======
import {DocumentType}  from "../documents";
>>>>>>> origin/master
import Content from "../component/Content";
import { useDocuments } from "../DocumentContext";
import { useNavigate } from "react-router-dom";
import FileViewer from "./FileViewer";
import ShapesEditor from "./ShapesEditor";

export type ShapeType = {
  type: "square" | "circle" | "triangle";
  position: { x: number; y: number };
  size: { width: number; height: number };
  text: string;
};

<<<<<<< HEAD
=======

>>>>>>> origin/master
interface DocumentViewerProps {
  updateDocumentsState?: (updatedDocuments: DocumentType[]) => void;
}

const DocumentViewer = ({ updateDocumentsState }: DocumentViewerProps) => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [viewerHeight, setViewerHeight] = useState<string>("100%");
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const docViewerRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<string>("");
  const [assign, setAssign] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { documents: globalDocuments, setDocuments: setGlobalDocuments } =
    useDocuments();
  const navigate = useNavigate();

  useEffect(() => {
    const foundDocument = globalDocuments.find((doc) => doc.id === id);
    if (foundDocument) {
      setDocument(foundDocument);
      setAssign(foundDocument.assign || "");
      setStatus(foundDocument.status || "");
    } else {
      setDocument(null);
    }

    const savedData = localStorage.getItem(`documentData_${id}`);
    if (savedData) {
      const { shapes, comment, assign, status } = JSON.parse(savedData);
      setShapes(shapes);
      setComment(comment);
      setAssign(assign);
      setStatus(status);
    }
  }, [id, globalDocuments]);

  const handleSave = useCallback(() => {
    if (document && (shapes.length > 0 || comment || assign || status)) {
      const dataToSave = { shapes, comment, assign, status };
      localStorage.setItem(`documentData_${id}`, JSON.stringify(dataToSave));
      alert("データが保存されました!");

      const updatedDocument = { ...document, assign, status };
      const updatedGlobalDocuments = globalDocuments.map((doc) =>
        doc.id === id ? updatedDocument : doc
      );
      setGlobalDocuments(updatedGlobalDocuments);
    } else {
      alert("データが保存されていません!");
    }
  }, [
    id,
    shapes,
    comment,
    assign,
    status,
    document,
    globalDocuments,
    setGlobalDocuments,
  ]);

<<<<<<< HEAD
=======
  useEffect(() => {
    const updateViewerHeight = () => {
      if (docViewerRef.current) {
        const documentHeight = docViewerRef.current.scrollHeight;
        switch (document?.fileType) {
          case "pdf":
            setViewerHeight(`${documentHeight}px`);
            break;
          case "xlsx":
          case "docx":
          case "ppt":
            setViewerHeight("500vh");
            break;
          default:
            break;
        }
      }
    };
    updateViewerHeight();
    window.addEventListener("resize", updateViewerHeight);

    return () => {
      window.removeEventListener("resize", updateViewerHeight);
    };
  }, [document]);
>>>>>>> origin/master

  if (!document) {
    return <div>Không tìm thấy tài liệu</div>;
  }

  const handleBackHome = () => {
    navigate(-1);
  };

<<<<<<< HEAD
  return (
    <>
      <div className={`viewer-with-draggable ${document.fileType}`}>
        <div className="canvas">
          <FileViewer document={document} />
        </div>

        <div className="editor">
=======


  return (
    <>
      <div className={`viewer-with-draggable ${document.fileType}`}>
        <div className="right-panel">
          <FileViewer document={document} />\
        </div>

        <div className="left-panel">
>>>>>>> origin/master
          <ShapesEditor shapes={shapes} setShapes={setShapes} />

          <Content
            comment={comment}
            assign={assign}
            status={status}
            onChangeAssign={setAssign}
            onChangeStatus={setStatus}
            onChangeComment={setComment}
          />
        </div>
      </div>

      <footer>
        <button className="button-backhome" onClick={handleBackHome}>
          Back
        </button>
        <button className="button-save" onClick={handleSave}>
          Save
        </button>
      </footer>
    </>
  );
};

export default DocumentViewer;
