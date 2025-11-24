export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getEstadoColor = (estado) => {
  const colors = {
    PENDIENTE: "bg-yellow-100 text-yellow-800",
    APROBADO: "bg-green-100 text-green-800",
    RECHAZADO: "bg-red-100 text-red-800",
    ENVIADO: "bg-blue-100 text-blue-800",
    ENTREGADO: "bg-purple-100 text-purple-800",
  };
  return colors[estado] || "bg-gray-100 text-gray-800";
};
