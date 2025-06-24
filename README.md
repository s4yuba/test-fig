# Test Fig

A React TypeScript application built with Clean Architecture principles.

## Architecture

This project follows Clean Architecture with the following layers:

- **Domain Layer**: Business entities and use cases
- **Application Layer**: Interfaces and repositories
- **Infrastructure Layer**: External services and database implementations
- **Presentation Layer**: UI components, controllers, and views

## Technologies

- React 18
- TypeScript
- Vite
- Clean Architecture pattern

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/s4yuba/test-fig.git
cd test-fig

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## Project Structure

```
src/
├── domain/          # Business logic and entities
│   ├── entities/
│   └── usecases/
├── application/     # Application interfaces
│   └── repositories/
├── infrastructure/  # External services
│   ├── database/
│   └── repositories/
└── presentation/    # UI layer
    ├── controllers/
    ├── presenters/
    └── views/
```

## License

This project is open source and available under the MIT License.

## Integration

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/s4yuba/test-fig?utm_source=oss&utm_medium=github&utm_campaign=s4yuba%2Ftest-fig&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)