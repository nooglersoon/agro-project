"use client"
import { useState } from 'react';

interface Animal {
  number: string;
  animalCode: string;
  liveWeight: string;
  sex: string;
  details: string;
}

export default function Home() {
  const [customerName, setCustomerName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substr(0, 10)); // Current date
  const [animalData, setAnimalData] = useState<Animal[]>([
    { number: '', animalCode: '', liveWeight: '', sex: '', details: '' },
  ]);

  const handleAnimalChange = (index: number, field: keyof Animal, value: string) => {
    const updatedAnimalData = [...animalData];
    updatedAnimalData[index][field] = value;
    setAnimalData(updatedAnimalData);
  };

  const handleAddAnimal = () => {
    setAnimalData([...animalData, { number: '', animalCode: '', liveWeight: '', sex: '', details: '' }]);
  };

  const handleRemoveAnimal = (index: number) => {
    const updatedAnimalData = [...animalData];
    updatedAnimalData.splice(index, 1);
    setAnimalData(updatedAnimalData);
  };

  const getTotalWeight = (): number => {
    return animalData.reduce((total, animal) => {
      return total + parseFloat(animal.liveWeight || '0');
    }, 0);
  };

  const getTotalAnimals = (): number => {
    return animalData.length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you can submit the form data to your backend or handle it as needed
    console.log('Form data submitted:', { customerName, address, date, animalData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Submit Cows Weight</h2>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full h-16 border border-black rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full h-16 border border-black rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full h-16 border border-black rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-4"
            required
          />
        </div>
        <div className="mb-4 text-black">
          <table className="w-full">
            <thead>
              <tr>
                <th>Animal Code</th>
                <th>Live Weight (kg)</th>
                <th>Sex</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {animalData.map((animal, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={animal.animalCode}
                      onChange={(e) => handleAnimalChange(index, 'animalCode', e.target.value)}
                      className="w-full h-16 px-4 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={animal.liveWeight}
                      onChange={(e) => handleAnimalChange(index, 'liveWeight', e.target.value)}
                      className="w-full h-16 px-4 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={animal.sex}
                      onChange={(e) => handleAnimalChange(index, 'sex', e.target.value)}
                      className="w-full h-16 px-4 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={animal.details}
                      onChange={(e) => handleAnimalChange(index, 'details', e.target.value)}
                      className="w-full h-16 px-4 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveAnimal(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {animalData.length === 0 && (
            <p className="text-gray-500 text-sm mt-2">No animals added yet.</p>
          )}
          <button
            type="button"
            onClick={handleAddAnimal}
            className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
          >
            Add Animal
          </button>
        </div>
        <div className="mb-4">
          <p>Total Animals: {getTotalAnimals()}</p>
          <p>Total Weight: {getTotalWeight()} kg</p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
