// src/theme.ts
import { createTheme } from '@mui/material/styles';

const lineTheme = createTheme({
  palette: {
    primary: {
      main: '#00B900', // LINE 綠色作為 Primary 色
      light: '#33CC33',
      dark: '#008C00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#424242', // 深灰色作為 Secondary 色
      light: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5', // 淺灰色背景
      paper: '#FFFFFF', // 卡片背景為白色
    },
    text: {
      primary: '#212121', // 深色文字
      secondary: '#757575', // 淺色文字
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // 保持常用字體
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#212121',
    },
    h5: {
      fontSize: '1.6rem',
      fontWeight: 600,
      color: '#424242',
    },
    subtitle1: {
      fontSize: '1.1rem',
      color: '#757575',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 更圓潤的按鈕
          textTransform: 'none', // 按鈕文字不大寫
          boxShadow: 'none', // 移除預設陰影
          '&:hover': {
            boxShadow: 'none', // 移除 hover 陰影
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // 更圓潤的卡片邊角
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)', // 柔和的陰影
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // 文本框也更圓潤
            backgroundColor: '#FAFAFA', // 輕微的背景色
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 警告框圓潤
        },
      },
    },
  },
});

export default lineTheme;