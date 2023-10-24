import React, { useState } from "react";

const Form = ({ onFormSubmit, onInputChange, newContendant }) => {
  return (
    <div className="bg-blue-600 mb-5 text-white rounded-md shadow-lg p-4 w-[90%] text-center">
      <p className="text-xl mb-4">Agregar un contendiente</p>
      <form className="space-y-4" onSubmit={onFormSubmit}>
        <div className="flex flex-col">
          <label className="text-lg">Nombre</label>
          <input
            type="text"
            className="p-2 rounded-md border  text-black"
            name="nombre"
            value={newContendant.nombre}
            onChange={onInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Genero</label>
          <select
            name="genero"
            id="genero"
            className="p-2 rounded-md border  text-black"
            value={newContendant.genero}
            onChange={onInputChange}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Edad</label>
          <input
            type="number"
            className="p-2 rounded-md border  text-black"
            name="edad"
            value={newContendant.edad}
            onChange={onInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Carrera</label>
          <input
            type="text"
            className="p-2 rounded-md border  text-black"
            name="carrera"
            value={newContendant.carrera}
            onChange={onInputChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-700 rounded-md hover:bg-blue-500"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form;
