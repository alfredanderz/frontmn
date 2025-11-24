import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { formatCurrency } from "../../utils/helpers";

export default function ProductModal({ isOpen, onClose, producto, onAgregar }) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    if (onAgregar && producto) {
      onAgregar(producto, cantidad);
      setCantidad(1);
      onClose();
    }
  };

  const incrementar = () => {
    if (cantidad < producto?.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  if (!producto) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del Producto"
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen del Producto */}
        <div>
          {producto.imagenUrl ? (
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-6xl">📦</span>
            </div>
          )}

          {/* Galería de miniaturas (opcional para futuro) */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-lg border-2 border-transparent hover:border-primary cursor-pointer"
              ></div>
            ))}
          </div>
        </div>

        {/* Información del Producto */}
        <div>
          {/* Categoría */}
          <div className="mb-3">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              {producto.categoria}
            </span>
          </div>

          {/* Nombre */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {producto.nombre}
          </h2>

          {/* Código */}
          <p className="text-gray-500 text-sm mb-4">
            Código:{" "}
            <span className="font-mono font-semibold">{producto.codigo}</span>
          </p>

          {/* Precio */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">Precio</p>
            <p className="text-4xl font-bold text-primary">
              {formatCurrency(producto.precio)}
            </p>
            {producto.precioSocio && (
              <p className="text-sm text-gray-600 mt-2">
                Precio Socio:{" "}
                <span className="font-semibold text-secondary">
                  {formatCurrency(producto.precioSocio)}
                </span>
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-gray-600">Disponibilidad:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                producto.stock > 10
                  ? "bg-green-100 text-green-800"
                  : producto.stock > 0
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {producto.stock > 0
                ? `${producto.stock} unidades disponibles`
                : "Agotado"}
            </span>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {producto.descripcion || "Sin descripción disponible"}
            </p>
          </div>

          {/* Características (opcional) */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Características
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Producto original
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Garantía incluida
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Envío a todo México
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Comisión del{" "}
                {producto.porcentajeComision || 0}%
              </li>
            </ul>
          </div>

          {/* Selector de Cantidad */}
          {onAgregar && producto.stock > 0 && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementar}
                    disabled={cantidad <= 1}
                    className="w-12 h-12 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xl transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1">
                    <input
                      type="number"
                      min="1"
                      max={producto.stock}
                      value={cantidad}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        if (val >= 1 && val <= producto.stock) {
                          setCantidad(val);
                        }
                      }}
                      className="w-full text-center text-2xl font-bold border-2 border-gray-300 rounded-lg py-2 focus:border-primary outline-none"
                    />
                  </div>
                  <button
                    onClick={incrementar}
                    disabled={cantidad >= producto.stock}
                    className="w-12 h-12 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Máximo disponible: {producto.stock} unidades
                </p>
              </div>

              {/* Total */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(producto.precio * cantidad)}
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAgregar}
                  variant="success"
                  size="lg"
                  className="flex-1"
                >
                  🛒 Agregar al Carrito
                </Button>
                <Button
                  onClick={onClose}
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}

          {/* Producto Agotado */}
          {producto.stock === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 font-semibold mb-2">
                😞 Producto Agotado
              </p>
              <p className="text-sm text-gray-600">
                Lo sentimos, este producto no está disponible en este momento
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sección de Información Extra (Opcional) */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-2">🚚</div>
            <h4 className="font-semibold text-gray-800 mb-1">Envío Gratis</h4>
            <p className="text-sm text-gray-600">En compras mayores a $500</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold text-gray-800 mb-1">Pago Seguro</h4>
            <p className="text-sm text-gray-600">Protección de datos</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Gana Comisiones
            </h4>
            <p className="text-sm text-gray-600">Por cada venta</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
