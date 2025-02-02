import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function Pagination({ totalPages, currentPage, onPrevPage, onNextPage }: PaginationProps) {
  return (
    totalPages > 1 && (
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-2 disabled:opacity-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-normal leading-none">Previous</span>
          </button>
          <span className="flex items-center gap-2">
            <span>{currentPage}</span>
            <span>of</span>
            <span>{totalPages}</span>
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 disabled:opacity-50 flex items-center gap-2"
          >
            <span className="text-xs font-normal leading-none">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
    )
  )
}
