import Agent from "@/components/Agent";
import React from "react";

const Interview = () => {
   return <>
      <h3>Interview Generator</h3>
      <Agent 
         userName="interview"
         userId="interview"
         type="generate"
      />
   </>
};

export default Interview;
