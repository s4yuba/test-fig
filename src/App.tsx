import React, { useState, useEffect } from 'react';
import { UserManagementView } from './presentation/views/UserManagementView';
import { ArchitectureVisualization } from './presentation/views/components/ArchitectureVisualization';
import { DependencyContainer } from './DependencyContainer';
import { UserController } from './presentation/controllers/UserController';
import './App.css';

function App() {
  const [controller, setController] = useState<UserController | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'demo' | 'architecture'>('demo');

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const container = DependencyContainer.getInstance();
        await container.initialize();
        setController(container.getUserController());
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize application:', error);
        setIsLoading(false);
      }
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      const container = DependencyContainer.getInstance();
      container.shutdown();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Initializing Clean Architecture Demo...</p>
      </div>
    );
  }

  if (!controller) {
    return (
      <div className="error-container">
        <h2>⚠️ Application Initialization Failed</h2>
        <p>Failed to initialize the dependency injection container</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏗️ Clean Architecture Demo</h1>
        <p className="app-subtitle">Learn Clean Architecture principles through an interactive user management system</p>
        
        <nav className="app-nav">
          <button 
            className={`nav-tab ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            💻 Live Demo
          </button>
          <button 
            className={`nav-tab ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            🏗️ Architecture
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'demo' && (
          <div className="demo-section">
            <div className="section-header">
              <h2>Interactive User Management</h2>
              <p>Experience how Clean Architecture separates concerns and maintains clean dependencies</p>
            </div>
            <UserManagementView controller={controller} />
          </div>
        )}
        
        {activeTab === 'architecture' && (
          <div className="architecture-section">
            <ArchitectureVisualization />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript demonstrating Clean Architecture principles</p>
      </footer>
    </div>
  );
}

export default App;