import React from "react";
import { Button } from "@mui/material";
import { generateSCORMPackage } from "../utils/scorm";

const SCORMExport = ({ slides }) => {
  return (
    <Button variant="contained" color="secondary" onClick={() => generateSCORMPackage(slides)}>
      Export as SCORM
    </Button>
  );
};

export default SCORMExport;
