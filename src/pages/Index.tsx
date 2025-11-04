import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { store, persistor } from '@/store/store';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TableToolbar } from '@/components/TableToolbar';
import { DataTable } from '@/components/DataTable';
import { ColumnManager } from '@/components/ColumnManager';

const IndexContent = () => {
  const [columnManagerOpen, setColumnManagerOpen] = useState(false);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      py: 4
    }}>
      <Container maxWidth="xl">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 2
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                color: 'hsl(var(--foreground))'
              }}
            >
              Dynamic Data Table Manager
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Advanced table with sorting, searching, pagination, and CSV import/export
            </Typography>
          </Box>

          <TableToolbar onManageColumns={() => setColumnManagerOpen(true)} />
          <DataTable />
          
          <ColumnManager
            open={columnManagerOpen}
            onClose={() => setColumnManagerOpen(false)}
          />
        </Paper>
      </Container>
    </Box>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <IndexContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Index;
