import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/navigation/Layout'
import { CompanyListPage, CompanyDetailPage, MergePage } from './pages'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route index element={<CompanyListPage />} />
          <Route path='companies/:id' element={<CompanyDetailPage />} />
          <Route path='companies/:targetId/merge' element={<MergePage />} />
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
