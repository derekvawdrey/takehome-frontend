import { useState, useEffect } from 'react'
import { useCompanySearch } from '../../../hooks/companies'
import type { Company } from '../../../api/types/company.types'

const SEARCH_DEBOUNCE_MS = 300

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return debouncedValue
}

export function CompanySearchBlock({
  label,
  selected,
  onSelect,
  placeholder = 'Search by name or address...',
}: {
  label: string
  selected: Company | null
  onSelect: (company: Company | null) => void
  placeholder?: string
}) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)
  const { data: results = [], isLoading, isFetching } = useCompanySearch(debouncedQuery)

  const showResults = debouncedQuery.length > 0 && !selected
  const searching = isLoading || (isFetching && debouncedQuery.length > 0)

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-medium text-gray-700">{label}</h2>
      {selected ? (
        <div className="mt-3 flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
          <div>
            <p className="font-medium text-gray-900">{selected.name}</p>
            <p className="text-sm text-gray-500">
              {[selected.address_line_1, selected.city, selected.state]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Change
          </button>
        </div>
      ) : (
        <>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            autoComplete="off"
            aria-label={label}
          />
          {showResults && (
            <ul
              className="mt-2 max-h-48 overflow-auto rounded-md border border-gray-200"
              role="listbox"
            >
              {searching && results.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-gray-500">
                  Searching…
                </li>
              )}
              {!searching && results.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-gray-500">
                  No companies found. Try a different search.
                </li>
              )}
              {results.map((company) => (
                <li key={company.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(company)
                      setQuery('')
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    role="option"
                  >
                    <span className="font-medium text-gray-900">{company.name}</span>
                    <span className="ml-1 text-gray-500">
                      {[company.address_line_1, company.city, company.state]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
