// Global type definitions for the application

// Common component props
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// API response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Export any existing types that were in mockData
export * from '@/utils/mockData';