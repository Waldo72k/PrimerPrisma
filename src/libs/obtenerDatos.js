// Function to fetch data
export async function obtenerDatos() {
    try {
      const response = await fetch('http://localhost:3000/api/registros');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching data: ' + error.message);
    }
  }