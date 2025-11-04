# Contributing to Dynamic Data Table Manager

Thank you for your interest in contributing to Dynamic Data Table Manager! We welcome contributions from the community and are pleased to have you join us.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Dynamic-Data-Table-Manager.git
   cd Dynamic-Data-Table-Manager
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📝 Types of Contributions

We welcome several types of contributions:

- **Bug fixes** - Help us squash bugs and improve stability
- **New features** - Add exciting new functionality
- **Documentation** - Improve our guides and API documentation
- **Testing** - Add tests to improve code coverage
- **Performance** - Optimize existing code for better performance
- **UI/UX** - Improve the user interface and experience

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Write clean, readable code following our coding standards
- Add comments for complex logic
- Update documentation as needed
- Add tests for new functionality

### 3. Test Your Changes

```bash
# Run tests
npm run test

# Check for linting issues
npm run lint

# Build the project
npm run build
```

### 4. Commit Your Changes

We follow conventional commits for our commit messages:

```bash
# Format: type(scope): description
# Examples:
git commit -m "feat(table): add column reordering functionality"
git commit -m "fix(export): resolve CSV export encoding issues"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(ui): improve table header styling"
git commit -m "refactor(utils): optimize data filtering logic"
git commit -m "test(components): add unit tests for DataTable"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- Clear title and description
- Reference to any related issues
- Screenshots for UI changes
- Testing instructions

## 🎯 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new files
- Define proper interfaces and types
- Avoid `any` type - use specific types
- Use strict mode configuration

### React Guidelines

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add JSDoc comments for functions
- Keep line length under 100 characters

### File Organization

```
src/
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── store/               # Redux store and slices
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
└── styles/              # Global styles and themes
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write component tests for React components
- Test edge cases and error conditions
- Maintain good test coverage (>80%)

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] All tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass

## Screenshots
(if applicable)

## Related Issues
Closes #issue-number
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Bug description**: What happened?
- **Steps to reproduce**: How can we recreate the issue?
- **Expected behavior**: What should have happened?
- **Actual behavior**: What actually happened?
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

### Feature Requests

For feature requests, please provide:

- **Feature description**: What would you like to see?
- **Use case**: Why is this feature needed?
- **Proposed solution**: How might this be implemented?
- **Alternatives**: Have you considered other approaches?

## 🏷️ Issue Labels

We use labels to categorize issues:

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: Urgent issues
- `priority: medium`: Important but not urgent
- `priority: low`: Nice to have

## 💬 Communication

- **GitHub Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions
- **Discussions**: For questions and general discussion

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in our README.md file and release notes.

Thank you for contributing to Dynamic Data Table Manager! 🎉