export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--card-bg)] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary-orange)] rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
