import { AlertCircle, Loader2, PackageSearch, RotateCcw } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center gap-3">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <p className="text-base font-semibold text-slate-800">جاري تحميل الطلبات...</p>
      <p className="text-sm text-slate-500">يرجى الانتظار لحظات</p>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-red-200 p-10 flex flex-col items-center justify-center text-center gap-4">
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-bold text-slate-900">حدث خطأ أثناء تحميل البيانات</p>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        إعادة المحاولة
      </button>
    </div>
  );
}

export function EmptyState({
  searchQuery,
  onReset,
}: {
  searchQuery: string;
  onReset: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
        <PackageSearch className="w-6 h-6" />
      </div>
      <p className="text-base font-bold text-slate-900">لا توجد طلبات مطابقة</p>
      <p className="text-sm text-slate-500">
        لم يتم العثور على أي طلب للعميل "{searchQuery}".
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-1 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
      >
        عرض جميع الطلبات
      </button>
    </div>
  );
}