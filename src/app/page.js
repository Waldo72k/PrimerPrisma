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
        console.error("Error agregando contendant:", error);
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
          console.log(`El contendiente con ID ${contendantId} fue borrado.`);
        } else {
          console.error(`Error borrando contendiente con ID ${contendantId}`);
        }
      })
      .catch((error) => {
        console.error("Error borrando:", error);
      });
  };

  const handleUpdate = (updatedContendant) => {
    const updatedData = data.map((contendant) =>
      contendant.id === updatedContendant.id ? updatedContendant : contendant
    );
  
    setData(updatedData);
  };

  return (
    <div className="bg-blue-900 min-h-screen text-center ">
      <h1 className="text-5xl py-7">Api de Waldo</h1>

      <div className="flex mx-7 justify-center items-center flex-col lg:flex-row">
      <Form
        onFormSubmit={handleFormSubmit}
        onInputChange={handleInputChange}
        newContendant={newContendant}
      />

      <div className="bg-blue-600 lg:ml-7 text-white rounded-md shadow-lg p-4 w-[90%] lg:h-[80vh]">
        <p className="text-xl mt-6 text-center">Contendientes del apiwaldo</p>
        <div className="w-full mt-4 items-center flex flex-col overflow-y-scroll sm:max-h-96 lg:max-h-[70vh]">
          {data.map((contendant) => (
            <ContendantCard key={contendant.id} contendant={contendant} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
