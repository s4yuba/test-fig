import React, { useState } from 'react';

interface ArchitectureLayer {
  name: string;
  description: string;
  components: string[];
  color: string;
  isActive: boolean;
  details: {
    responsibility: string;
    dependencies: string;
    examples: string[];
  };
}

interface CleanArchitecturePrinciple {
  title: string;
  description: string;
  example: string;
}

export const ArchitectureVisualization: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [showDiagram, setShowDiagram] = useState(false);

  const layers: ArchitectureLayer[] = [
    {
      name: 'Presentation Layer',
      description: 'UI components, controllers, and presenters that handle user interaction',
      components: ['UserForm', 'UserList', 'UserController', 'UserPresenter'],
      color: '#e3f2fd',
      isActive: selectedLayer === 'presentation',
      details: {
        responsibility: 'ユーザーからの入力を受け取り、適切なUse Caseに委譲します。結果をユーザーに表示します。',
        dependencies: 'Application Layer（Use Cases）にのみ依存',
        examples: [
          'React コンポーネント（UI）',
          'コントローラー（入力処理）',
          'プレゼンター（出力フォーマット）'
        ]
      }
    },
    {
      name: 'Application Layer', 
      description: 'Use cases and business logic orchestration',
      components: ['CreateUserUseCase', 'GetAllUsersUseCase', 'UpdateUserUseCase', 'DeleteUserUseCase'],
      color: '#f3e5f5',
      isActive: selectedLayer === 'application',
      details: {
        responsibility: 'アプリケーション固有のビジネスロジックを実装します。複数のDomainオブジェクトを協調させます。',
        dependencies: 'Domain Layer（エンティティとリポジトリインターフェース）にのみ依存',
        examples: [
          'ユーザー作成ユースケース',
          'ユーザー検索ユースケース',
          'バリデーション処理',
          'トランザクション管理'
        ]
      }
    },
    {
      name: 'Domain Layer',
      description: 'Core business entities and domain rules',
      components: ['User Entity', 'Email Value Object', 'UserRepository Interface'],
      color: '#e8f5e8',
      isActive: selectedLayer === 'domain',
      details: {
        responsibility: 'ビジネスの核となるエンティティとルールを定義します。他の層に依存しません。',
        dependencies: '何にも依存しない（最も独立した層）',
        examples: [
          'ユーザーエンティティ',
          'メールアドレス値オブジェクト',
          'リポジトリインターフェース',
          'ドメインサービス'
        ]
      }
    },
    {
      name: 'Infrastructure Layer',
      description: 'External concerns like databases and frameworks',
      components: ['InMemoryDatabase', 'UserRepositoryImpl', 'DI Container'],
      color: '#fff3e0',
      isActive: selectedLayer === 'infrastructure',
      details: {
        responsibility: 'データベース、ファイルシステム、外部APIなどの技術的詳細を実装します。',
        dependencies: 'Domain Layerのインターフェースを実装',
        examples: [
          'データベース実装',
          'ファイルシステム',
          '外部API呼び出し',
          'DI コンテナ'
        ]
      }
    }
  ];

  const principles: CleanArchitecturePrinciple[] = [
    {
      title: '依存性逆転の原則',
      description: '高レベルモジュールは低レベルモジュールに依存せず、両方とも抽象に依存する',
      example: 'Use CaseはRepositoryインターフェースに依存し、具体的なDB実装には依存しない'
    },
    {
      title: '単一責任の原則',
      description: '各層は単一の責任を持ち、変更する理由も一つである',
      example: 'Domain層はビジネスロジックのみ、Infrastructure層は技術的詳細のみ'
    },
    {
      title: 'テスタビリティ',
      description: 'ビジネスロジックが外部依存から分離されているため、単体テストが容易',
      example: 'Use CaseはモックのRepositoryを使ってテストできる'
    },
    {
      title: '独立性',
      description: 'UI、データベース、フレームワークは交換可能',
      example: 'ReactをVueに、MySQLをPostgreSQLに変更してもDomain層は影響を受けない'
    }
  ];

  const handleLayerClick = (layerName: string) => {
    setSelectedLayer(selectedLayer === layerName.toLowerCase() ? null : layerName.toLowerCase());
  };

  return (
    <div className="architecture-visualization">
      <div className="architecture-title">
        <h2>🏗️ Clean Architecture ガイド</h2>
        <p>各層をクリックして詳細を確認し、Clean Architectureの原則を学習しましょう</p>
      </div>

      {/* 初心者向け説明セクション */}
      <div className="beginner-guide">
        <h3>📚 Clean Architecture とは？</h3>
        <div className="guide-content">
          <p>
            Clean Architectureは、Robert C. Martin（Uncle Bob）によって提唱されたソフトウェアアーキテクチャです。
            システムを独立した層に分離し、ビジネスロジックを外部の技術的詳細から保護します。
          </p>
          
          <div className="key-benefits">
            <h4>🎯 主なメリット</h4>
            <ul>
              <li><strong>保守性:</strong> 各層が独立しているため、変更が他の層に影響しない</li>
              <li><strong>テスタビリティ:</strong> ビジネスロジックを単体でテストできる</li>
              <li><strong>再利用性:</strong> UI やデータベースを変更してもコアロジックは再利用可能</li>
              <li><strong>理解しやすさ:</strong> 責任が明確に分離されている</li>
            </ul>
          </div>

          <div className="diagram-toggle">
            <button 
              className="diagram-button"
              onClick={() => setShowDiagram(!showDiagram)}
            >
              {showDiagram ? '📖 詳細説明を表示' : '🏗️ アーキテクチャ図を表示'}
            </button>
          </div>
        </div>
      </div>

      {/* アーキテクチャ図 */}
      {showDiagram && (
        <div className="architecture-diagram-section">
          <h3>🏗️ レイヤー構造図</h3>
          <div className="concentric-diagram">
            <div className="diagram-center">
              <div className="domain-circle">
                <span>Domain</span>
                <small>エンティティ・ルール</small>
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
            内側の円ほど安定しており、外側は変更されやすい部分です。
            依存の方向は常に外側から内側に向かいます。
          </p>
        </div>
      )}
      
      <div className="architecture-diagram">
        <h3>📋 レイヤー詳細</h3>
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
                
                <div className="layer-info-grid">
                  <div className="layer-responsibility">
                    <h4>💼 責任</h4>
                    <p>{layer.details.responsibility}</p>
                  </div>
                  
                  <div className="layer-dependencies">
                    <h4>🔗 依存関係</h4>
                    <p>{layer.details.dependencies}</p>
                  </div>
                </div>
                
                <div className="layer-components">
                  <h4>🧩 コンポーネント例</h4>
                  <div className="components-grid">
                    {layer.details.examples.map((example, idx) => (
                      <div key={idx} className="component-card">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="implementation-examples">
                  <h4>📄 実装ファイル</h4>
                  <ul>
                    {layer.components.map(component => (
                      <li key={component}><code>{component}</code></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="architecture-principles">
        <h3>🎯 Clean Architecture の原則</h3>
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <div key={index} className="principle">
              <strong>{principle.title}</strong>
              <p>{principle.description}</p>
              <div className="principle-example">
                <strong>例:</strong> {principle.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 学習リソース */}
      <div className="learning-resources">
        <h3>📖 さらに学習するには</h3>
        <div className="resources-grid">
          <div className="resource-card">
            <h4>📚 推薦書籍</h4>
            <ul>
              <li>Clean Architecture - Robert C. Martin</li>
              <li>Clean Code - Robert C. Martin</li>
              <li>Domain-Driven Design - Eric Evans</li>
            </ul>
          </div>
          <div className="resource-card">
            <h4>🛠️ 実践のコツ</h4>
            <ul>
              <li>小さなプロジェクトから始める</li>
              <li>依存関係を意識したテスト設計</li>
              <li>インターフェースを活用した疎結合</li>
            </ul>
          </div>
          <div className="resource-card">
            <h4>⚠️ よくある落とし穴</h4>
            <ul>
              <li>過度な抽象化による複雑化</li>
              <li>層を跨いだ直接的な依存</li>
              <li>アニーミックドメインモデル</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};