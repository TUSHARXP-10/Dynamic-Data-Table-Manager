import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { TableChart as TableChartIcon } from '@mui/icons-material';
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
      background: 'var(--gradient-bg)',
      py: { xs: 3, md: 5 },
    }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box 
            sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-lg)',
              mb: 3,
            }}
          >
            <TableChartIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 1.5,
              color: 'hsl(var(--foreground))',
              background: 'var(--gradient-primary)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dynamic Data Table Manager
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'hsl(var(--muted-foreground))',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Advanced table with sorting, searching, pagination, and CSV import/export
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            bgcolor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
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
