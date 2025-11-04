# Dynamic Data Table Manager

A powerful, modern React-based data table management solution with advanced features for data manipulation, visualization, and export capabilities.

![React](https://img.shields.io/badge/React-18.3+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.0+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🎯 Project Overview

Dynamic Data Table Manager is a comprehensive web application designed to handle complex data management tasks with ease. Built with modern web technologies, it provides an intuitive interface for data manipulation, advanced filtering, sorting, and export capabilities.

### ✨ Key Features

- **Advanced Data Management**: Sort, filter, search, and paginate large datasets
- **CSV Import/Export**: Seamless data import and export functionality
- **Column Management**: Dynamic column configuration and visibility controls
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Theme Support**: Light and dark mode with system preference detection
- **Real-time Updates**: Instant data updates with state management
- **Professional UI**: Modern, clean interface using shadcn/ui components

## 🚀 Live Demo

Check out the live demo: [Dynamic Data Table Manager](https://dynamic-data-table-manager.vercel.app/)

## 📸 Screenshots

### Main Interface
![Main Interface](screenshots/main-interface.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

### CSV Import
![CSV Import](screenshots/csv-import.png)

### Column Management
![Column Management](screenshots/column-management.png)

## 🛠️ Technology Stack

### Frontend
- **React 18.3+** - Modern UI library
- **TypeScript 5.0+** - Type-safe development
- **Vite 5.0+** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library

### State Management
- **Redux Toolkit** - Predictable state management
- **Redux Persist** - State persistence

### Data Processing
- **PapaParse** - CSV parsing and formatting
- **File-saver** - Client-side file downloads

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TUSHARXP-10/Dynamic-Data-Table-Manager.git
cd Dynamic-Data-Table-Manager
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Build for Production

```bash
npm run build
# or
yarn build
```

### 5. Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🎯 Usage Examples

### Basic Usage

1. **Launch the Application**: Open your browser to `http://localhost:8080`

2. **Import Data**: Click the "Import CSV" button to upload your data file

3. **Configure Columns**: Use the column manager to show/hide columns

4. **Filter & Search**: Use the search bar and filters to find specific data

5. **Export Data**: Click "Export CSV" to download your processed data

### Advanced Features

#### Column Management
```typescript
// Toggle column visibility
const toggleColumn = (columnId: string) => {
  // Implementation details
}

// Reorder columns
const reorderColumns = (sourceIndex: number, destinationIndex: number) => {
  // Implementation details
}
```

#### Data Filtering
```typescript
// Apply multiple filters
const applyFilters = (filters: FilterConfig[]) => {
  // Implementation details
}

// Search functionality
const searchData = (query: string) => {
  // Implementation details
}
```

#### CSV Operations
```typescript
// Import CSV file
const importCSV = (file: File) => {
  // Implementation details
}

// Export to CSV
const exportToCSV = (data: any[], filename: string) => {
  // Implementation details
}
```

## 📚 API Documentation

### DataTable Component

The main component that renders the data table with all features.

**Props:**
```typescript
interface DataTableProps {
  data: any[];              // Array of data objects
  columns: ColumnConfig[];  // Column configuration
  onDataChange?: (data: any[]) => void;  // Data change callback
  enableSorting?: boolean; // Enable/disable sorting
  enableFiltering?: boolean; // Enable/disable filtering
  enablePagination?: boolean; // Enable/disable pagination
}
```

### ColumnManager Component

Manages column visibility and ordering.

**Props:**
```typescript
interface ColumnManagerProps {
  columns: ColumnConfig[];
  visibleColumns: string[];
  onColumnToggle: (columnId: string) => void;
  onColumnReorder: (sourceIndex: number, destinationIndex: number) => void;
}
```

### TableToolbar Component

Provides table controls and actions.

**Props:**
```typescript
interface TableToolbarProps {
  onImportCSV: (file: File) => void;
  onExportCSV: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}
```

## 🎨 Customization

### Theming

The application supports light and dark themes out of the box. You can customize the theme by modifying the Tailwind CSS configuration.

### Component Styling

All components use Tailwind CSS classes for styling. You can customize the appearance by:

1. **Modifying Tailwind classes** in component files
2. **Updating the theme configuration** in `tailwind.config.ts`
3. **Creating custom CSS** in `src/index.css`

### Adding New Features

To add new features:

1. **Create components** in the `src/components/` directory
2. **Add state management** in the Redux store
3. **Update routing** if needed in `src/App.tsx`
4. **Add utility functions** in `src/utils/`

## 🤝 Contributing

We welcome contributions to the Dynamic Data Table Manager! Here's how you can help:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure all tests pass**: `npm run test`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Code Style

- Follow the existing code style and formatting
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

### Reporting Issues

If you find a bug or have a feature request:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with a clear title and description
3. **Include steps to reproduce** for bugs
4. **Add screenshots** if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing UI library
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- All the open-source contributors who make projects like this possible

## 📞 Contact

For questions, suggestions, or support:

- **Email**: your-email@example.com
- **GitHub Issues**: [Create an issue](https://github.com/TUSHARXP-10/Dynamic-Data-Table-Manager/issues)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

---

**⭐ If you find this project useful, please give it a star on GitHub!**
