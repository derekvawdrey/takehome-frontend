import { Link } from 'react-router-dom'
import { useCompanies } from '../hooks/companies'

function CompanyListPage() {
  const { data: companies, isLoading, error } = useCompanies()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 rounded-lg bg-gray-100 animate-pulse"
            aria-hidden
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">Could not load companies</p>
        <p className="mt-1 text-sm">{error.message}</p>
      </div>
    )
  }

  if (!companies?.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
        <p className="font-medium">No companies yet</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
      <p className="mt-1 text-gray-500">
        {companies.length} {companies.length === 1 ? 'company' : 'companies'}
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <li key={company.id}>
            <Link
              to={`/companies/${company.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <p className="font-medium text-gray-900">{company.name}</p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {[company.address_line_1, company.address_line_2, company.city, company.state, company.postal_code]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CompanyListPage
