import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { ProjectLaunchpad } from './path/to/project_launchpad'; // Ensure correct path

// 默认的Solana网络连接设置
const DEFAULT_CONNECTION = new Connection("https://api.devnet.solana.com");

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 初始化时加载所有项目
    const loadProjects = async () => {
      try {
        const projectLaunchpad = new ProjectLaunchpad(DEFAULT_CONNECTION, new PublicKey("YourPublicKeyHere")); // 使用正确的公钥初始化
        // 假设已在ProjectLaunchpad中实现了getProjects方法
        const loadedProjects = await projectLaunchpad.getProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>项目列表</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <h3>{project.projectName}</h3>
              <p>{project.projectDescription}</p>
              <p>开始日期: {new Date(project.startDate).toLocaleDateString()}</p>
              <p>结束日期: {new Date(project.endDate).toLocaleDateString()}</p>
              <p>目标资金: {project.targetFund}</p>
              <p>当前资金: {project.currentFund}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No projects found.</div>
      )}
    </div>
  );
};

export default ProjectList;
