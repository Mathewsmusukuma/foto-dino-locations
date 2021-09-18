import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', height: 150, marginTop: "15%"}} className="py-8">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
