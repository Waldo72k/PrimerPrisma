'use client'
import ContendantCard from "@/components/ContendantCard";
import { obtenerDatos } from "@/libs/obtenerDatos";
import Form from "@/components/Form";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [newContendant, setNewContendant] = useState({
    nombre: "",
    genero: "Masculino",
    edad: "",
    carrera: "",
  });

  const fetchData = () => {
    obtenerDatos()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/registros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContendant),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData([...data, responseData]);
        setNewContendant({
          nombre: "",
          genero: "Masculino",
          edad: "",
          carrera: "",
        });
      })
      .catch((error) => {
        console.error("Error adding contendant:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContendant({ ...newContendant, [name]: value });
  };

  const handleDelete = (contendantId) => {
    fetch(`http://localhost:3000/api/registros/${contendantId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setData(data.filter((contendant) => contendant.id !== contendantId));
          console.log(`Contendant with ID ${contendantId} deleted successfully.`);
        } else {
          console.error(`Failed to delete contendant with ID ${contendantId}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting contendant:", error);
      });
  };

  const handleUpdate = (updatedContendant) => {
    const updatedData = data.map((contendant) =>
      contendant.id === updatedContendant.id ? updatedContendant : contendant
    );
  
    setData(updatedData);
  };

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl py-7">Api de Waldo</h1>

      <Form
        onFormSubmit={handleFormSubmit}
        onInputChange={handleInputChange}
        newContendant={newContendant}
      />

      <div className="bg-blue-600 text-white rounded-md shadow-lg p-4 w-[90%]">
        <p className="text-xl mt-6 text-center">Contendientes del apiwaldo</p>
        <div className="w-full mt-4 items-center flex flex-col overflow-y-auto max-h-96">
          {data.map((contendant) => (
            <ContendantCard key={contendant.id} contendant={contendant} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
