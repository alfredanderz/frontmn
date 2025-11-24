import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loading from "../../components/common/Loading";
import { formatCurrency } from "../../utils/helpers";

export default function CrearPedido() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [formData, setFormData] = useState({
    direccionEnvio: "",
    ciudad: "",
    comprobanteUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await api.get("/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.productoId === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.productoId === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        },
      ]);
    }
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito(carrito.filter((item) => item.productoId !== productoId));
  };

  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      quitarDelCarrito(productoId);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.productoId === productoId ? { ...item, cantidad } : item
        )
      );
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("Agrega productos al carrito");
      return;
    }

    setSubmitting(true);
    try {
      const items = carrito.map((item) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
      }));

      await api.post("/api/pedidos", {
        socioId: user.socioId,
        items,
        ...formData,
      });

      alert("¡Pedido creado exitosamente!");
      navigate("/mis-pedidos");
    } catch (error) {
      alert(error.response?.data?.error || "Error al crear pedido");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Crear Nuevo Pedido
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <Card title="Productos Disponibles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {producto.imagenUrl && (
                    <img
                      src={producto.imagenUrl}
                      alt={producto.nombre}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {producto.descripcion}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      {formatCurrency(producto.precio)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Stock: {producto.stock} unidades
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Carrito */}
        <div>
          <Card title="Mi Carrito">
            {carrito.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🛒</div>
                <p>Carrito vacío</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {carrito.map((item) => (
                    <div
                      key={item.productoId}
                      className="border-b border-gray-200 pb-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{item.nombre}</h4>
                        <button
                          onClick={() => quitarDelCarrito(item.productoId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              actualizarCantidad(
                                item.productoId,
                                item.cantidad - 1
                              )
                            }
                            className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() =>
                              actualizarCantidad(
                                item.productoId,
                                item.cantidad + 1
                              )
                            }
                            className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold">
                          {formatCurrency(item.precio * item.cantidad)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      {formatCurrency(calcularTotal())}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    label="Dirección de Envío"
                    name="direccionEnvio"
                    value={formData.direccionEnvio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        direccionEnvio: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    label="Ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={(e) =>
                      setFormData({ ...formData, ciudad: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="URL del Comprobante"
                    name="comprobanteUrl"
                    value={formData.comprobanteUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comprobanteUrl: e.target.value,
                      })
                    }
                    placeholder="https://ejemplo.com/comprobante.jpg"
                    required
                  />

                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? "Creando..." : "Confirmar Pedido"}
                  </Button>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
