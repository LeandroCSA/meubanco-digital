const SkeletonItem = () => {
  return (
    <div className="animate-pulse flex justify-between items-center gap-4 w-full p-5 border-dashed border-b border-slate-200 dark:bg-slate-900 dark:border-slate-700 last:border-none">
      <div className="h-5 bg-gray-200 dark:bg-slate-900 rounded w-24"></div>
      <div className="w-auto gap-3 flex justify-center items-center">
        <div className="h-9 bg-gray-200 dark:bg-slate-900 rounded-lg w-9"></div>
        <div className="grid gap-2 items-center">
          <div className="h-4 bg-gray-200 dark:bg-slate-900 rounded w-28"></div>
          <div className="h-3 bg-gray-200 dark:bg-slate-900 rounded w-24"></div>
        </div>
      </div>
      <div className="w-auto gap-3 flex justify-center items-center">
        <div className="h-16 bg-gray-200 dark:bg-slate-900 rounded-full w-16"></div>
        <div className="grid gap-2 items-center">
          <div className="h-4 bg-gray-200 dark:bg-slate-900 rounded w-24"></div>
          <div className="h-3 bg-gray-200 dark:bg-slate-900 rounded w-32"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-slate-900 rounded w-24"></div>
    </div>
  );
};

const SkeletonItemHome = () => {
  return (
    <div className="animate-pulse flex justify-between items-center gap-4 w-full p-4 border-dashed border-b border-slate-200 dark:bg-slate-900 dark:border-slate-700 last:border-none">
      <div className="w-auto gap-3 flex justify-center items-center">
        <div className="h-12 w-12 bg-gray-200 dark:bg-slate-900 rounded-full"></div>
        <div className="grid gap-2 items-center">
          <div className="h-4 bg-gray-200 dark:bg-slate-900 rounded w-24"></div>
          <div className="h-3 bg-gray-200 dark:bg-slate-900 rounded w-32"></div>
        </div>
      </div>
      <div className="h-5 bg-gray-200 dark:bg-slate-900 rounded w-24"></div>
    </div>
  );
};

const SkeletonTotalTransactions = () => {
  return (
    <div className="animate-pulse grid grid-cols-2 gap-4 w-full">
      <div className="h-32 border border-gray-200 dark:bg-slate-900 rounded-lg w-full p-8 grid gap-1">
        <div className="h-4 bg-gray-200 dark:bg-slate-900 rounded w-32"></div>
        <div className="h-8 bg-gray-200 dark:bg-slate-900 rounded w-64"></div>
      </div>
      <div className="h-32 border border-gray-200 dark:bg-slate-900 rounded-lg w-full p-8 grid gap-1">
        <div className="h-4 bg-gray-200 dark:bg-slate-900 rounded w-32"></div>
        <div className="h-8 bg-gray-200 dark:bg-slate-900 rounded w-64"></div>
      </div>
    </div>
  );
};

export {
  SkeletonItem,
  SkeletonItemHome,
  SkeletonTotalTransactions
}