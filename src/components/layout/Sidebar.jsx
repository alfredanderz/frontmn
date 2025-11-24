import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const socioMenu = [
    {
      path: "/dashboard",
      icon: <img src="../../dash.png" alt="" width="40px" />,
      label: "Dashboard",
    },

    {
      path: "/mi-red",
      icon: <img src="../../mired.png" alt="" width="40px" />,
      label: "Mi Red",
    },
    {
      path: "/crear-pedido",
      icon: <img src="../../productos.png" alt="" width="40px" />,
      label: "Productos",
    },
    {
      path: "/mis-pedidos",
      icon: <img src="../../pedido.png" alt="" width="40px" />,
      label: "Mis Pedidos",
    },
    {
      path: "/mi-perfil",
      icon: <img src="../../perfil.png" alt="" width="40px" />,
      label: "Mi Perfil",
    },
  ];

  const adminMenu = [
    { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/admin/socios", icon: "👥", label: "Socios" },
    { path: "/admin/productos", icon: "📦", label: "Productos" },
    { path: "/admin/pedidos", icon: "🛍️", label: "Pedidos" },
    { path: "/admin/reportes", icon: "📈", label: "Reportes" },
  ];

  const menu = user?.role === ROLES.ADMIN ? adminMenu : socioMenu;

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-3xl">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="font-semibold text-gray-800">{user?.username}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md transform scale-105"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
