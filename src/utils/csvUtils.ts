import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, Column } from '@/store/tableSlice';

export const importCSV = (file: File): Promise<TableRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data.map((row: any, index: number) => ({
            id: row.id || `imported-${Date.now()}-${index}`,
            name: row.name || '',
            email: row.email || '',
            age: row.age ? parseInt(row.age) : 0,
            role: row.role || '',
            ...Object.keys(row).reduce((acc, key) => {
              if (!['id', 'name', 'email', 'age', 'role'].includes(key)) {
                acc[key] = row[key];
              }
              return acc;
            }, {} as Record<string, any>),
          }));

          if (data.length === 0) {
            reject(new Error('CSV file is empty'));
            return;
          }

          resolve(data as TableRow[]);
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
    });
  });
};

export const exportCSV = (
  data: TableRow[],
  columns: Column[],
  columnVisibility: Record<string, boolean>
) => {
  const visibleColumns = columns.filter(col => columnVisibility[col.id]);
  
  const csvData = data.map(row => {
    const filteredRow: Record<string, any> = {};
    visibleColumns.forEach(col => {
      filteredRow[col.label] = row[col.id] ?? '';
    });
    return filteredRow;
  });

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `table-export-${new Date().toISOString()}.csv`);
};
