import React, { useState } from 'react';

interface ArchitectureLayer {
  name: string;
  description: string;
  components: string[];
  color: string;
  isActive: boolean;
}

export const ArchitectureVisualization: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const layers: ArchitectureLayer[] = [
    {
      name: 'Presentation Layer',
      description: 'UI components, controllers, and presenters that handle user interaction',
      components: ['UserForm', 'UserList', 'UserController', 'UserPresenter'],
      color: '#e3f2fd',
      isActive: selectedLayer === 'presentation'
    },
    {
      name: 'Application Layer', 
      description: 'Use cases and business logic orchestration',
      components: ['CreateUserUseCase', 'GetAllUsersUseCase', 'UpdateUserUseCase', 'DeleteUserUseCase'],
      color: '#f3e5f5',
      isActive: selectedLayer === 'application'
    },
    {
      name: 'Domain Layer',
      description: 'Core business entities and domain rules',
      components: ['User Entity', 'Email Value Object', 'UserRepository Interface'],
      color: '#e8f5e8',
      isActive: selectedLayer === 'domain'
    },
    {
      name: 'Infrastructure Layer',
      description: 'External concerns like databases and frameworks',
      components: ['InMemoryDatabase', 'UserRepositoryImpl', 'DI Container'],
      color: '#fff3e0',
      isActive: selectedLayer === 'infrastructure'
    }
  ];

  const handleLayerClick = (layerName: string) => {
    setSelectedLayer(selectedLayer === layerName.toLowerCase() ? null : layerName.toLowerCase());
  };

  return (
    <div className="architecture-visualization">
      <div className="architecture-title">
        <h2>🏗️ Clean Architecture Layers</h2>
        <p>Click on each layer to explore its components and responsibilities</p>
      </div>
      
      <div className="architecture-diagram">
        {layers.map((layer, index) => (
          <div 
            key={layer.name}
            className={`architecture-layer ${layer.isActive ? 'active' : ''}`}
            style={{ backgroundColor: layer.color }}
            onClick={() => handleLayerClick(layer.name)}
          >
            <div className="layer-header">
              <h3>{layer.name}</h3>
              <span className="layer-arrow">{layer.isActive ? '▼' : '▶'}</span>
            </div>
            
            {layer.isActive && (
              <div className="layer-details">
                <p className="layer-description">{layer.description}</p>
                <div className="layer-components">
                  <h4>Components:</h4>
                  <ul>
                    {layer.components.map(component => (
                      <li key={component}>{component}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="architecture-principles">
        <h3>🎯 Key Principles</h3>
        <div className="principles-grid">
          <div className="principle">
            <strong>Dependency Inversion:</strong> Higher-level modules don't depend on lower-level modules
          </div>
          <div className="principle">
            <strong>Single Responsibility:</strong> Each layer has one reason to change
          </div>
          <div className="principle">
            <strong>Testability:</strong> Business logic is isolated and easily testable
          </div>
          <div className="principle">
            <strong>Independence:</strong> UI, Database, and frameworks are replaceable
          </div>
        </div>
      </div>
    </div>
  );
};