import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMergeConflicts, useCompleteMerge } from '../../hooks/companies'
import type { MergeCompleteCompanyUpdate } from '../../api/types/merge.types'
import { MergeConflictResolver, type MergeResolution } from './Components';

function PreviewMergePage() {
    const navigate = useNavigate()
    const { targetId, duplicateId } = useParams<{ targetId: string; duplicateId: string }>()
    const { data: conflicts, isLoading, error } = useMergeConflicts(targetId ?? '', duplicateId ?? '')
    const completeMerge = useCompleteMerge({
        onSuccess: (company) => {
            navigate(`/companies/${company.id}`)
        },
    })

    const handleResolvedSubmit = (resolutions: MergeResolution[]) => {
        const targetCompany: MergeCompleteCompanyUpdate = Object.fromEntries(
            resolutions.map((r) => [r.field, r.value])
        ) as MergeCompleteCompanyUpdate
        if (targetId && duplicateId) {
            completeMerge.mutate({ targetId, duplicateId, targetCompany })
        }
    }

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
        <div className="max-w-2xl">
            <Link
                to={`/companies/${targetId}/merge`}
                className="mb-4 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
            >
                <span aria-hidden className="mr-1">←</span> Back to merge
            </Link>
            <h1 className="text-2xl font-semibold text-slate-900">Preview merge</h1>
            <p className="mt-1 text-slate-500">
                Target: {targetId}, Duplicate: {duplicateId}
            </p>
            {completeMerge.error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-medium">Merge failed</p>
                    <p className="mt-1">{completeMerge.error.message}</p>
                </div>
            )}
            {conflicts?.conflicts?.length ? (
                <MergeConflictResolver
                    data={conflicts}
                    onSubmit={handleResolvedSubmit}
                    isSubmitting={completeMerge.isPending}
                />
            ) : (
                <p className="mt-6 text-slate-500">No conflicts to resolve.</p>
            )}
        </div>
    )
}

export default PreviewMergePage