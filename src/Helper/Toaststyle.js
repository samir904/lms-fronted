const toastStyles = {
  error: {
    style: {
      background: '#f87171', // Softer red
      color: '#fff',
      borderRadius: '8px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '350px',
      margin: '8px auto',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#dc2626',
    },
  },
  success: {
    style: {
      background: '#4ade80', // Softer green
      color: '#fff',
      borderRadius: '8px',
      padding: '8px 16px', // Reduced padding
      fontSize: '14px', // Smaller font
      fontWeight: '500', // Lighter weight
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '350px',
      margin: '8px auto',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#16a34a', // Slightly darker green for icon
    },
  },
  info: {
    style: {
      background: '#3b82f6',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      fontSize: '16px',
      fontWeight: '600',
      fontFamily: "'Inter', sans-serif",
      border: '1px solid #1d4ed8',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '350px',
      margin: '8px auto',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#1d4ed8',
    },
  },
  warning: {
    style: {
      background: '#f59e0b',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      fontSize: '16px',
      fontWeight: '600',
      fontFamily: "'Inter', sans-serif",
      border: '1px solid #b45309',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '350px',
      margin: '8px auto',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#b45309',
    },
  },
  loading: {
    style: {
      background: '#9ca3af',
      color: '#fff',
      borderRadius: '8px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '350px',
      margin: '8px auto',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#6b7280',
    },
  },
};

export default toastStyles;