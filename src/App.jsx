import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/layout/Layout";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Socio
import Dashboard from "./pages/socio/Dashboard";
import MiRed from "./pages/socio/MiRed";
import MisPedidos from "./pages/socio/MisPedidos";
import CrearPedido from "./pages/socio/CrearPedido";
import MiPerfil from "./pages/socio/MiPerfil";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminSocios from "./pages/admin/Socios";
import AdminProductos from "./pages/admin/Productos";
import AdminPedidos from "./pages/admin/Pedidos";
import AdminReportes from "./pages/admin/Reportes";

// Public
import Catalogo from "./pages/public/Catalogo";
import Loading from "./components/common/Loading";
import SobreNosotros from "./components/products/SobreNosotros";
import MisionVision from "./components/products/MisionVision";
import SoporteEmail from "./components/products/SoporteEmail";
import Soporte from "./components/products/Soporte";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/mision-vision" element={<MisionVision />} />
          <Route path="/soporte-email" element={<SoporteEmail />} />"
          <Route path="/soporte" element={<Soporte />} />
          {/* Rutas protegidas del Socio */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="SOCIO">
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-red"
            element={
              <ProtectedRoute role="SOCIO">
                <Layout>
                  <MiRed />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <ProtectedRoute role="SOCIO">
                <Layout>
                  <Catalogo />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-pedidos"
            element={
              <ProtectedRoute role="SOCIO">
                <Layout>
                  <MisPedidos />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/crear-pedido"
            element={
              <ProtectedRoute role="SOCIO">
                <Layout>
                  <CrearPedido />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-perfil"
            element={
              <ProtectedRoute role="SOCIO">
                <Layout>
                  <MiPerfil />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Rutas protegidas del Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/socios"
            element={
              <ProtectedRoute role="ADMIN">
                <Layout>
                  <AdminSocios />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute role="ADMIN">
                <Layout>
                  <AdminProductos />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pedidos"
            element={
              <ProtectedRoute role="ADMIN">
                <Layout>
                  <AdminPedidos />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reportes"
            element={
              <ProtectedRoute role="ADMIN">
                <Layout>
                  <AdminReportes />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Componente para proteger rutas
function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    const redirectTo =
      user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default App;
