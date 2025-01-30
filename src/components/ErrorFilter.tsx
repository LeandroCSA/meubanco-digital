// src/components/ErrorFilter.tsx
interface ErrorFilterProps {
  children: React.ReactNode;
  errorTitle: string;
  errorMessage: string;
}

const ErrorFilter: React.FC<ErrorFilterProps> = ({ children, errorTitle, errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg">
      {children}
      <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
        {errorTitle}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorFilter;