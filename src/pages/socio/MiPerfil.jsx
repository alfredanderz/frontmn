import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";

export default function MiPerfil() {
  const { user } = useAuth();
  const [socio, setSocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadPerfil();
  }, []);

  const loadPerfil = async () => {
    try {
      const response = await api.get(`/api/socios/${user.socioId}`);
      setSocio(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/socios/${user.socioId}`, formData);
      alert("¡Perfil actualizado exitosamente!");
      setEditing(false);
      loadPerfil();
    } catch (error) {
      console.error("Detalles del error de actualización:", error); // Usas la variable
      alert("Error al actualizar perfil, agrega datos válidos.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
        {!editing && (
          <Button onClick={() => setEditing(true)}>✏️ Editar</Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombres"
                name="nombres"
                value={formData.nombres || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombres: e.target.value })
                }
                disabled={!editing}
                required
              />
              <Input
                label="Apellidos"
                name="apellidos"
                value={formData.apellidos || ""}
                onChange={(e) =>
                  setFormData({ ...formData, apellidos: e.target.value })
                }
                disabled={!editing}
                required
              />
              <Input
                label="Teléfono"
                name="telefono"
                value={formData.telefono || ""}
                onChange={(e) => {
                  // Evita espacios y caracteres no numéricos
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, telefono: value });
                }}
                disabled={!editing}
                required
                inputMode="numeric" // muestra teclado numérico en móviles
                pattern="^[0-9]{10}$" // solo números, exactamente 10
                maxLength={10}
              />

              <Input
                label="Código de Socio"
                value={socio?.codigoSocio || ""}
                disabled
              />
            </div>

            <Input
              label="Dirección"
              name="direccion"
              value={formData.direccion || ""}
              onChange={(e) =>
                setFormData({ ...formData, direccion: e.target.value })
              }
              disabled={!editing}
              required
            />

            {editing && (
              <div className="flex gap-3 mt-6">
                <Button type="submit" variant="success">
                  💾 Guardar Cambios
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditing(false);
                    setFormData(socio);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </form>
        </Card>

        <Card title="Información de Cuenta">
          <div className="space-y-4">
            <InfoItem label="Usuario" value={user.username} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Rol" value={user.role} />
            <InfoItem label="Nivel" value={socio?.nivel} />
            <InfoItem
              label="Patrocinador"
              value={socio?.patrocinador?.codigoSocio || "Sin patrocinador"}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="border-b border-gray-200 pb-3 last:border-0">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
