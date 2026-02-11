import { Link, useParams } from 'react-router-dom'
import { useMergeConflicts } from '../../hooks/companies'

function PreviewMergePage() {
  const { targetId, duplicateId } = useParams<{ targetId: string; duplicateId: string }>()
  const { data: conflicts, isLoading, error } = useMergeConflicts(targetId ?? '', duplicateId ?? '')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-full max-w-md rounded bg-gray-100 animate-pulse" />
      </div>
    )
  }

  if (error || !targetId || !duplicateId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">Could not load merge preview</p>
        <p className="mt-1 text-sm">{error?.message ?? 'Missing target or duplicate company.'}</p>
        <Link to="/" className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:no-underline">
          Back to companies
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        to={`/companies/${targetId}/merge`}
        className="mb-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <span aria-hidden className="mr-1">←</span> Back to merge
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">Preview merge</h1>
      <p className="mt-1 text-gray-500">
        Target: {targetId}, Duplicate: {duplicateId}
      </p>
      {conflicts?.conflicts?.length ? (
        <ul className="mt-6 space-y-2">
          {conflicts.conflicts.map((c, i) => (
            <li key={i} className="rounded-md border border-gray-200 bg-white p-3 text-sm">
              <span className="font-medium text-gray-700">{c.field}</span>: target={String(c.targetValue)}, duplicate={String(c.duplicateValue)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-500">No conflicts to resolve.</p>
      )}
    </div>
  )
}

export default PreviewMergePage