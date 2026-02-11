import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCompany } from '../../hooks/companies'
import type { Company } from '../../api/types/company.types'
import { CompanySearchBlock } from './Components/CompanySearchBlock'

function MergePage() {
  const { targetId } = useParams<{ targetId: string }>()
  const { data: target, isLoading: targetLoading, error: targetError } = useCompany(targetId ?? '')
  const [duplicate, setDuplicate] = useState<Company | null>(null)
  const canPreview = target && duplicate && target.id !== duplicate.id

  if (targetLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-full max-w-md rounded bg-gray-100 animate-pulse" />
      </div>
    )
  }

  if (targetError || !target) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">Could not load company</p>
        <p className="mt-1 text-sm">{targetError?.message ?? 'Company not found.'}</p>
        <Link to="/" className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:no-underline">
          Back to companies
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        to={`/companies/${target.id}`}
        className="mb-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <span aria-hidden className="mr-1">←</span> {target.name}
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">Merge companies</h1>
      <p className="mt-1 text-gray-500">
        Search for the company to merge into <strong>{target.name}</strong>.
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-medium text-gray-700">Company to keep</h2>
        <p className="mt-1 font-medium text-gray-900">{target.name}</p>
        <p className="text-sm text-gray-500">
          {[target.address_line_1, target.city, target.state].filter(Boolean).join(', ')}
        </p>
      </div>

      <div className="mt-8 max-w-xl">
        <CompanySearchBlock
          label="Company to merge in (duplicate)"
          selected={duplicate}
          onSelect={setDuplicate}
        />
      </div>

      {duplicate && target.id === duplicate.id && (
        <p className="mt-4 text-sm text-amber-700">
          Choose a different company to merge in (not the same as the target).
        </p>
      )}

      {canPreview && (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={`/companies/${target.id}/merge/${duplicate.id}`}
            className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            Preview merge
          </Link>
          <button
            type="button"
            onClick={() => setDuplicate(null)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  )
}

export default MergePage
