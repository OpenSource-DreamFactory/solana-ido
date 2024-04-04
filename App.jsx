import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './path_to_idl.json'; // Ensure this path points to your actual IDL file

// Solana network and wallet configuration
const network = "https://api.devnet.solana.com";
const { SystemProgram } = web3;
const opts = {
  preflightCommitment: "processed"
};

const App = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  // Initialize Solana program connection
  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new Provider(connection, window.solana, opts);
      const programId = new PublicKey("Fg6PaFzntrJ8kCnX8rCQyDjkMA3RqK2HkUMWvPCnRoMd"); // Replace with your actual Program ID
      const program = new Program(idl, programId, provider);

      if (selectedProjectId) {
        program.rpc.getProject(selectedProjectId)
          .then(details => setProjectDetails(details))
          .catch(err => console.error("Failed to fetch project details:", err));
      }
    } else {
      console.error("Solana wallet not found. Please install Phantom Wallet.");
    }
  }, [selectedProjectId]);

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div>
      <h1>solana-ido</h1>
      <ProjectList onSelectProject={handleSelectProject} />
      {projectDetails && <ProjectDetails details={projectDetails} />}
    </div>
  );
};

export default App;
