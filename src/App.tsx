import React, { useState, useEffect } from 'react';
import { UserManagementView } from './presentation/views/UserManagementView';
import { DependencyContainer } from './DependencyContainer';
import { UserController } from './presentation/controllers/UserController';
import './App.css';

function App() {
  const [controller, setController] = useState<UserController | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    return <div>Loading application...</div>;
  }

  if (!controller) {
    return <div>Failed to initialize application</div>;
  }

  return (
    <div className="App">
      <UserManagementView controller={controller} />
    </div>
  );
}

export default App;