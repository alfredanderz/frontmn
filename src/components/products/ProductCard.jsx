import { formatCurrency } from "../../utils/helpers";
import Button from "../common/Button";

export default function ProductCard({ producto, onAgregar }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {producto.imagenUrl && (
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {producto.nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {producto.descripcion}
        </p>
        <div className="mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {producto.categoria}
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(producto.precio)}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              producto.stock > 10
                ? "bg-green-100 text-green-800"
                : producto.stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Stock: {producto.stock}
          </span>
        </div>
        {onAgregar && (
          <Button
            onClick={() => onAgregar(producto)}
            disabled={producto.stock === 0}
            className="w-full"
          >
            {producto.stock > 0 ? "Agregar al Carrito" : "Agotado"}
          </Button>
        )}
      </div>
    </div>
  );
}
