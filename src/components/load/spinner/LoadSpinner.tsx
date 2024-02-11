export default function LoadSpinner() {
    return (
        <div className="w-20 h-20 overflow-hidden">
            <div className="w-full h-full animate-spin origin-center">
                <svg className="w-full h-full" viewBox="25 25 50 50">
                    <circle className="text-theme-color-text-title stroke-current stroke-4 stroke-dasharray-150-200 stroke-dashoffset--10 animate-dash rounded-full" cx="50" cy="50" r="20" />
                </svg>
            </div>
        </div>
    );
}
