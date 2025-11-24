import { useState, useEffect } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Loading from "../../components/common/Loading";
import { formatCurrency } from "../../utils/helpers";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
    imagenUrl: "",
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await api.get("/api/productos/admin/todos");

      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/api/productos/${editingProduct.id}`, formData);
        alert("Producto actualizado exitosamente");
      } else {
        await api.post("/api/productos", formData);
        alert("Producto creado exitosamente");
      }
      setShowModal(false);
      resetForm();
      loadProductos();
    } catch (error) {
      alert(error.response?.data?.error || "Error al guardar producto");
    }
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setFormData(producto);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await api.delete(`/api/productos/${id}`);
        alert("Producto eliminado");
        loadProductos();
      } catch (error) {
        console.error("Detalles del error de producto:", error); // Usas la variable
        alert("Error al eliminar producto");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      codigo: "",
      nombre: "",
      descripcion: "",
      categoria: "",
      precio: "",
      stock: "",
      imagenUrl: "",
    });
    setEditingProduct(null);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Productos
        </h1>
        <Button onClick={() => setShowModal(true)}>➕ Nuevo Producto</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm">{producto.codigo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {producto.imagenUrl && (
                        <img
                          src={producto.imagenUrl}
                          alt={producto.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {producto.nombre}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {producto.descripcion}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {producto.categoria}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                    {formatCurrency(producto.precio)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        producto.stock > 10
                          ? "bg-green-100 text-green-800"
                          : producto.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {producto.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        producto.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {producto.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(producto)}
                      className="text-primary hover:text-primary/80 font-medium mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Crear/Editar */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingProduct ? "Editar Producto" : "Nuevo Producto"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Código"
              name="codigo"
              value={formData.codigo}
              onChange={(e) =>
                setFormData({ ...formData, codigo: e.target.value })
              }
              required
            />
            <Input
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>

          <Input
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Categoría"
              name="categoria"
              value={formData.categoria}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              required
            />
            <Input
              label="Precio"
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
            <Input
              label="URL de Imagen"
              name="imagenUrl"
              value={formData.imagenUrl}
              onChange={(e) =>
                setFormData({ ...formData, imagenUrl: e.target.value })
              }
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" variant="success" size="lg">
              {editingProduct ? "Actualizar" : "Crear"} Producto
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
