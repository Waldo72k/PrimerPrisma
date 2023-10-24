import React, { useState } from "react";

const ContendantCard = ({ contendant, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContendant, setEditedContendant] = useState({
    nombre: contendant.nombre,
    genero: contendant.genero,
    edad: contendant.edad,
    carrera: contendant.carrera,
  });

  const handleDeleteClick = () => {
    onDelete(contendant.id);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:3000/api/registros/${contendant.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedContendant),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsEditing(false);
        onUpdate(responseData);
      })
      .catch((error) => {
        console.error("Error updating contendant:", error);
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContendant({ ...editedContendant, [name]: value });
  };

  return (
    <div className="px-2 my-2 pt-2 bg-white w-[90%] h-auto text-yellow-950 rounded-md">
      {isEditing ? (
        <div>
          <label>Nombre:</label>
          <input
            className="border border-gray-500"
            type="text"
            name="nombre"
            value={editedContendant.nombre}
            onChange={handleInputChange}
          />
          <label>Genero:</label>
          <select
            className="border border-gray-500"
            name="genero"
            value={editedContendant.genero}
            onChange={handleInputChange}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <label>Edad:</label>
          <input
            className="border border-gray-500"
            type="number"
            name="edad"
            value={editedContendant.edad}
            onChange={handleInputChange}
          />
          <label>Carrera:</label>
          <input
            className="border border-gray-500"
            type="text"
            name="carrera"
            value={editedContendant.carrera}
            onChange={handleInputChange}
          />
          <button className="bg-green-500 py-2 px-2 mb-2 rounded-md" onClick={handleSaveClick}>
            Guardar
          </button>
          <button className="bg-red-500 py-2 px-2 mb-2 rounded-md" onClick={handleCancelClick}>
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <p>Nombre: {contendant.nombre}</p>
          <p>Genero: {contendant.genero}</p>
          <p>Edad: {contendant.edad}</p>
          <p>Carrera: {contendant.carrera}</p>
          <button className="bg-red-500 py-2 px-2 mx-2 mb-2 rounded-md" onClick={handleDeleteClick}>
            Borrar
          </button>
          <button className="bg-green-500 py-2 px-2 mx-2 mb-2 rounded-md" onClick={handleUpdateClick}>
            Actualizar
          </button>
        </div>
      )}
    </div>
  );
};

export default ContendantCard;
