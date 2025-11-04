import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: string | number | undefined;
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
}

interface TableState {
  data: TableRow[];
  columns: Column[];
  columnVisibility: Record<string, boolean>;
  columnOrder: string[];
  searchQuery: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  rowsPerPage: number;
  editingRowId: string | null;
}

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, sortable: true },
  { id: 'email', label: 'Email', visible: true, sortable: true },
  { id: 'age', label: 'Age', visible: true, sortable: true },
  { id: 'role', label: 'Role', visible: true, sortable: true },
];

const sampleData: TableRow[] = [
  { id: '1', name: 'Priya Sharma', email: 'priya.sharma@example.com', age: 28, role: 'Developer' },
  { id: '2', name: 'Rahul Patel', email: 'rahul.patel@example.com', age: 34, role: 'Designer' },
  { id: '3', name: 'Anjali Verma', email: 'anjali.verma@example.com', age: 42, role: 'Manager' },
  { id: '4', name: 'Arjun Singh', email: 'arjun.singh@example.com', age: 31, role: 'Developer' },
  { id: '5', name: 'Sneha Reddy', email: 'sneha.reddy@example.com', age: 29, role: 'Analyst' },
  { id: '6', name: 'Vikram Kumar', email: 'vikram.kumar@example.com', age: 36, role: 'Designer' },
  { id: '7', name: 'Kavya Gupta', email: 'kavya.gupta@example.com', age: 45, role: 'Manager' },
  { id: '8', name: 'Rohan Mehta', email: 'rohan.mehta@example.com', age: 27, role: 'Developer' },
  { id: '9', name: 'Divya Nair', email: 'divya.nair@example.com', age: 38, role: 'Analyst' },
  { id: '10', name: 'Aditya Joshi', email: 'aditya.joshi@example.com', age: 39, role: 'Designer' },
  { id: '11', name: 'Neha Desai', email: 'neha.desai@example.com', age: 33, role: 'Developer' },
  { id: '12', name: 'Karthik Iyer', email: 'karthik.iyer@example.com', age: 30, role: 'Manager' },
];

const initialState: TableState = {
  data: sampleData,
  columns: defaultColumns,
  columnVisibility: defaultColumns.reduce((acc, col) => ({ ...acc, [col.id]: col.visible }), {}),
  columnOrder: defaultColumns.map(col => col.id),
  searchQuery: '',
  sortColumn: null,
  sortDirection: 'asc',
  currentPage: 0,
  rowsPerPage: 10,
  editingRowId: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
      state.currentPage = 0;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.data.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(row => row.id !== action.payload);
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
      state.columnVisibility[action.payload.id] = action.payload.visible;
      state.columnOrder.push(action.payload.id);
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      state.columnVisibility[action.payload] = !state.columnVisibility[action.payload];
    },
    reorderColumns: (state, action: PayloadAction<string[]>) => {
      state.columnOrder = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 0;
    },
    setSortColumn: (state, action: PayloadAction<string>) => {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = 'asc';
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.currentPage = 0;
    },
    setEditingRowId: (state, action: PayloadAction<string | null>) => {
      state.editingRowId = action.payload;
    },
  },
});

export const {
  setData,
  addRow,
  updateRow,
  deleteRow,
  addColumn,
  toggleColumnVisibility,
  reorderColumns,
  setSearchQuery,
  setSortColumn,
  setCurrentPage,
  setRowsPerPage,
  setEditingRowId,
} = tableSlice.actions;

export default tableSlice.reducer;
