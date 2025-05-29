import React, { useState } from 'react';

interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  components: string[];
  dependencies: string;
  benefits: string[];
  examples: string[];
  color: string;
  isActive: boolean;
  details: {
    responsibility: string;
    dependencies: string;
    examples: string[];
  };
}

interface ArchitecturePrinciple {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export const ArchitectureVisualization: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [showDiagram, setShowDiagram] = useState(false);

  const layers: ArchitectureLayer[] = [
    {
      id: 'presentation',
      name: 'Presentation Layer (UI)',
      description: 'The outermost layer responsible for user interface and user interaction handling',
      responsibilities: [
        'Display data to users in an intuitive format',
        'Handle user input and interactions',
        'Format and validate user input',
        'Navigate between different views',
        'Manage UI state and rendering logic'
      ],
      components: ['UserForm.tsx', 'UserList.tsx', 'UserController.ts', 'UserPresenter.ts'],
      dependencies: 'Depends on Application Layer only - never directly on Infrastructure',
      benefits: [
        'Easy to test UI logic separately',
        'Multiple UI frameworks can be swapped easily',
        'Clear separation of concerns',
        'Independent development of UI components'
      ],
      examples: [
        'React components for forms and tables',
        'View models for data presentation',
        'Controllers handling user actions',
        'Presenters formatting business data for display'
      ],
      color: '#e3f2fd',
      isActive: selectedLayer === 'presentation',
      details: {
        responsibility: 'Receives user input and delegates to appropriate Use Cases. Displays results to users.',
        dependencies: 'Depends only on Application Layer (Use Cases)',
        examples: [
          'React components (UI)',
          'Controllers (input processing)',
          'Presenters (output formatting)'
        ]
      }
    },
    {
      id: 'application',
      name: 'Application Layer (Use Cases)',
      description: 'Orchestrates business logic and coordinates between layers - the heart of your application flow',
      responsibilities: [
        'Define and implement use cases (business scenarios)',
        'Orchestrate domain objects and services',
        'Handle application-specific business rules',
        'Coordinate data flow between layers',
        'Manage transaction boundaries and error handling'
      ],
      components: ['CreateUserUseCase.ts', 'GetAllUsersUseCase.ts', 'UpdateUserUseCase.ts', 'DeleteUserUseCase.ts'],
      dependencies: 'Depends on Domain Layer only - uses interfaces defined in Domain',
      benefits: [
        'Business logic is clearly organized by use case',
        'Easy to understand what the application does',
        'Testable without external dependencies',
        'Reusable across different presentation layers'
      ],
      examples: [
        'User registration workflow',
        'Product catalog management',
        'Order processing pipeline',
        'Authentication and authorization flows'
      ],
      color: '#f3e5f5',
      isActive: selectedLayer === 'application',
      details: {
        responsibility: 'Implements application-specific business logic. Coordinates multiple Domain objects.',
        dependencies: 'Depends only on Domain Layer (entities and repository interfaces)',
        examples: [
          'User creation use case',
          'User search use case',
          'Validation processing',
          'Transaction management'
        ]
      }
    },
    {
      id: 'domain',
      name: 'Domain Layer (Business Rules)',
      description: 'The core of your application containing business entities, rules, and domain logic - completely independent',
      responsibilities: [
        'Define core business entities and value objects',
        'Implement fundamental business rules and invariants',
        'Define repository and service interfaces',
        'Ensure data consistency and business constraints',
        'Represent real-world business concepts'
      ],
      components: ['User.ts (Entity)', 'Email.ts (Value Object)', 'UserRepository.ts (Interface)'],
      dependencies: 'No dependencies on any other layer - completely self-contained',
      benefits: [
        'Business logic is framework-independent',
        'Highly testable with unit tests',
        'Can be reused across different applications',
        'Changes to external systems don\'t affect business rules'
      ],
      examples: [
        'User entity with validation rules',
        'Email value object with format validation',
        'Business rules for user permissions',
        'Domain events for business state changes'
      ],
      color: '#e8f5e8',
      isActive: selectedLayer === 'domain',
      details: {
        responsibility: 'Defines core business entities and rules. Does not depend on other layers.',
        dependencies: 'No dependencies (most independent layer)',
        examples: [
          'User entity',
          'Email address value object',
          'Repository interfaces',
          'Domain services'
        ]
      }
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Layer (External Concerns)',
      description: 'Handles all external concerns like databases, APIs, file systems, and third-party services',
      responsibilities: [
        'Implement repository interfaces defined in Domain',
        'Handle database connections and queries',
        'Manage external API integrations',
        'File system operations and caching',
        'Configuration and dependency injection setup'
      ],
      components: ['Database.ts', 'UserRepositoryImpl.ts', 'DependencyContainer.ts'],
      dependencies: 'Implements interfaces from Domain Layer - depends inward, not outward',
      benefits: [
        'External dependencies are easily swappable',
        'Database can be changed without affecting business logic',
        'Third-party services can be mocked for testing',
        'Infrastructure concerns are isolated'
      ],
      examples: [
        'SQL/NoSQL database implementations',
        'REST API client integrations',
        'File storage and retrieval systems',
        'Email service integrations'
      ],
      color: '#fff3e0',
      isActive: selectedLayer === 'infrastructure',
      details: {
        responsibility: 'Implements technical details like databases, file systems, and external APIs.',
        dependencies: 'Implements Domain Layer interfaces',
        examples: [
          'Database implementation',
          'File system',
          'External API calls',
          'DI container'
        ]
      }
    }
  ];

  const principles: ArchitecturePrinciple[] = [
    {
      title: 'Dependency Inversion',
      icon: '🔄',
      description: 'High-level modules should not depend on low-level modules. Both should depend on abstractions.',
      details: [
        'Business logic doesn\'t depend on database implementation',
        'Use interfaces to define contracts between layers',
        'Dependencies point inward toward the business logic',
        'External concerns implement domain-defined interfaces'
      ]
    },
    {
      title: 'Single Responsibility',
      icon: '🎯',
      description: 'Each layer and component has one clear reason to change and one primary responsibility.',
      details: [
        'UI layer only handles presentation concerns',
        'Domain layer only contains business rules',
        'Infrastructure layer only handles external integrations',
        'Changes in one area don\'t cascade to others'
      ]
    },
    {
      title: 'Testability',
      icon: '🧪',
      description: 'Business logic is isolated and can be tested independently of external systems.',
      details: [
        'Domain logic can be unit tested without databases',
        'Use cases can be tested with mock repositories',
        'UI components can be tested with mock data',
        'Integration tests verify layer interactions'
      ]
    },
    {
      title: 'Independence',
      icon: '🔓',
      description: 'Core business logic is independent of UI, databases, web frameworks, and external agencies.',
      details: [
        'Change from React to Vue without affecting business logic',
        'Switch from MySQL to PostgreSQL without domain changes',
        'Replace REST API with GraphQL transparently',
        'Business rules remain stable across technology changes'
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Domain entities importing infrastructure code',
      solution: 'Keep domain layer pure - only business logic, no external dependencies'
    },
    {
      mistake: 'Controllers directly calling repositories',
      solution: 'Always go through use cases to maintain proper orchestration'
    },
    {
      mistake: 'Putting business logic in the UI layer',
      solution: 'Move validation and business rules to domain/application layers'
    },
    {
      mistake: 'Fat controllers with complex business logic',
      solution: 'Controllers should be thin - delegate to use cases'
    }
  ];

  const handleLayerClick = (layerId: string) => {
    setSelectedLayer(selectedLayer === layerId ? null : layerId);
  };

  const renderOverview = () => (
    <div className="architecture-overview">
      <div className="architecture-title">
        <h2>🏗️ Clean Architecture Overview</h2>
        <p>A software design philosophy that separates the elements of a design into ring levels. Click on each layer to explore its details.</p>
      </div>

      {/* Beginner Guide Section */}
      <div className="beginner-guide">
        <h3>📚 What is Clean Architecture?</h3>
        <div className="guide-content">
          <p>
            Clean Architecture is a software architecture proposed by Robert C. Martin (Uncle Bob).
            It separates systems into independent layers and protects business logic from external technical details.
          </p>
          
          <div className="key-benefits">
            <h4>🎯 Key Benefits</h4>
            <ul>
              <li><strong>Maintainability:</strong> Each layer is independent, so changes don't affect other layers</li>
              <li><strong>Testability:</strong> Business logic can be tested in isolation</li>
              <li><strong>Reusability:</strong> Core logic remains reusable even when UI or database changes</li>
              <li><strong>Understandability:</strong> Responsibilities are clearly separated</li>
            </ul>
          </div>

          <div className="diagram-toggle">
            <button 
              className="diagram-button"
              onClick={() => setShowDiagram(!showDiagram)}
            >
              {showDiagram ? '📖 Show Layer Details' : '🏗️ Show Architecture Diagram'}
            </button>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      {showDiagram && (
        <div className="architecture-diagram-section">
          <h3>🏗️ Layer Structure Diagram</h3>
          <div className="concentric-diagram">
            <div className="diagram-center">
              <div className="domain-circle">
                <span>Domain</span>
                <small>Entities & Rules</small>
              </div>
              <div className="application-ring">
                <span>Application</span>
                <small>Use Cases</small>
              </div>
              <div className="interface-ring">
                <div className="interface-section">
                  <span>Controllers</span>
                </div>
                <div className="interface-section">
                  <span>Presenters</span>
                </div>
                <div className="interface-section">
                  <span>Gateways</span>
                </div>
              </div>
              <div className="outer-ring">
                <div className="outer-section">
                  <span>UI</span>
                </div>
                <div className="outer-section">
                  <span>Database</span>
                </div>
                <div className="outer-section">
                  <span>External APIs</span>
                </div>
              </div>
            </div>
          </div>
          <p className="diagram-note">
            Inner circles are more stable, while outer parts are more likely to change.
            Dependencies always point inward from outer to inner layers.
          </p>
        </div>
      )}
      
      <div className="architecture-diagram">
        {layers.map((layer) => (
          <div 
            key={layer.id}
            className={`architecture-layer ${layer.isActive ? 'active' : ''}`}
            style={{ backgroundColor: layer.color }}
            onClick={() => handleLayerClick(layer.id)}
          >
            <div className="layer-header">
              <h3>{layer.name}</h3>
              <span className="layer-arrow">{layer.isActive ? '▼' : '▶'}</span>
            </div>
            
            {layer.isActive && (
              <div className="layer-details">
                <p className="layer-description">{layer.description}</p>
                
                <div className="layer-section">
                  <h4>🎯 Key Responsibilities:</h4>
                  <ul>
                    {layer.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                <div className="layer-section">
                  <h4>📦 Components in This Layer:</h4>
                  <div className="component-list">
                    {layer.components.map(component => (
                      <span key={component} className="component-tag">{component}</span>
                    ))}
                  </div>
                </div>

                <div className="layer-section">
                  <h4>🔗 Dependencies:</h4>
                  <p className="dependency-info">{layer.dependencies}</p>
                </div>

                <div className="layer-section">
                  <h4>✅ Benefits:</h4>
                  <ul>
                    {layer.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="layer-section">
                  <h4>💡 Real-world Examples:</h4>
                  <ul>
                    {layer.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="architecture-details">
      <div className="principles-section">
        <h2>🎯 Core Principles</h2>
        <p>Understanding these principles is crucial for implementing Clean Architecture effectively.</p>
        
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <div key={index} className="principle-card">
              <div className="principle-header">
                <span className="principle-icon">{principle.icon}</span>
                <h3>{principle.title}</h3>
              </div>
              <p className="principle-description">{principle.description}</p>
              <div className="principle-details">
                <h4>Implementation Details:</h4>
                <ul>
                  {principle.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mistakes-section">
        <h2>⚠️ Common Mistakes to Avoid</h2>
        <p>Learn from these common pitfalls when implementing Clean Architecture.</p>
        
        <div className="mistakes-grid">
          {commonMistakes.map((item, index) => (
            <div key={index} className="mistake-card">
              <div className="mistake-problem">
                <strong>❌ Common Mistake:</strong>
                <p>{item.mistake}</p>
              </div>
              <div className="mistake-solution">
                <strong>✅ Better Approach:</strong>
                <p>{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="learning-resources">
        <h2>📚 Learning Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>📖 Essential Reading</h3>
            <ul>
              <li>Clean Architecture by Robert C. Martin</li>
              <li>Clean Code by Robert C. Martin</li>
              <li>Domain-Driven Design by Eric Evans</li>
              <li>Hexagonal Architecture articles</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h3>🎯 Key Concepts</h3>
            <ul>
              <li>SOLID Principles</li>
              <li>Dependency Injection</li>
              <li>Repository Pattern</li>
              <li>Use Case Pattern</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h3>🚀 Getting Started Tips</h3>
            <ul>
              <li>Start with the domain layer first</li>
              <li>Define clear interfaces between layers</li>
              <li>Write tests for your use cases</li>
              <li>Keep external dependencies in infrastructure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="architecture-visualization">
      <div className="architecture-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          🏗️ Layer Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          📚 Principles & Best Practices
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' ? renderOverview() : renderDetails()}
      </div>
    </div>
  );
};