import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Layout from './containers/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { useAppSelector } from './state/typedReduxHooks';
import { QueryClient, QueryClientProvider } from 'react-query'
interface ValidateRouteProps {
  requireAuth?: boolean
}
const ValidateRoutes = ({ requireAuth = false }: ValidateRouteProps) => {
  const { auth } = useAppSelector(
    (state: any) => state
  );
  const isLogged = auth.isLogged
  let location = useLocation();
  if (requireAuth)
    return isLogged ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />

  return !isLogged ? <Outlet /> : <Navigate to="/dashboard" state={{ from: location }} replace />
}
const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<ValidateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<ValidateRoutes requireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;