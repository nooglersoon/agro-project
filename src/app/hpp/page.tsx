"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';

interface FormValues {
  hargaSapiCIF: number;
  beratSapi: number;
  beaMasuk: number;
  pph: number;
  biayaImport: number;
  lamaPemeliharaan: number;
  biayaPemeliharaan: number;
  pertambahanBerat: number;
  tingkatBungaBank: number;
  biayaOverHead: number;
  biayaMarketing: number;
  hargaJualSapi: number;
}

export default function PriceCalculator() {
  const [values, setValues] = useState<FormValues>({
    hargaSapiCIF: 0,
    beratSapi: 0,
    beaMasuk: 0,
    pph: 0,
    biayaImport: 0,
    lamaPemeliharaan: 0,
    biayaPemeliharaan: 0,
    pertambahanBerat: 0,
    tingkatBungaBank: 0,
    biayaOverHead: 0,
    biayaMarketing: 0,
    hargaJualSapi: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Parse the value to a number, ignoring leading and trailing spaces
    const parsedValue: number = parseFloat(value.trim());

    // Check if the parsed value is a valid number and not NaN
    if (!isNaN(parsedValue)) {
      setValues({
        ...values,
        [name]: parsedValue,
      });
    } else {
      setValues({
        ...values,
        [name]: 0,
      });
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you can submit the form data to your backend or handle it as needed
    console.log('Form data submitted:', { values });
  };

  useEffect(() => {
    const CC = require('currency-converter-lt')
    let currencyConverter = new CC({ from: "USD", to: "JPY", amount: 100 })
    console.log(currencyConverter)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Aplikasi Proyeksi Harga Pokok</h2>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="hargaSapiCIF" className="block text-gray-700 font-bold">Harga Sapi (CIF)</label>
            <input type="number" name="hargaSapiCIF" id="hargaSapiCIF" value={values.hargaSapiCIF} placeholder={"ahaha"} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="beratSapi" className="block text-gray-700 font-bold">Berat Sapi (Kg.)</label>
            <input type="number" name="beratSapi" id="beratSapi" value={values.beratSapi} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="beaMasuk" className="block text-gray-700 font-bold">Bea Masuk (%)</label>
            <input type="number" name="beaMasuk" id="beaMasuk" value={values.beaMasuk} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="pph" className="block text-gray-700 font-bold">PPH (%)</label>
            <input type="number" name="pph" id="pph" value={values.pph} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="biayaImport" className="block text-gray-700 font-bold">Biaya Import (Rp./Ekor)</label>
            <input type="number" name="biayaImport" id="biayaImport" value={values.biayaImport} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="lamaPemeliharaan" className="block text-gray-700 font-bold">Lama Pemeliharaan (hari)</label>
            <input type="number" name="lamaPemeliharaan" id="lamaPemeliharaan" value={values.lamaPemeliharaan} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="biayaPemeliharaan" className="block text-gray-700 font-bold">Biaya Pemeliharaan (Rp/ekor/hari)</label>
            <input type="number" name="biayaPemeliharaan" id="biayaPemeliharaan" value={values.biayaPemeliharaan} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="pertambahanBerat" className="block text-gray-700 font-bold">Pertambahan Berat Badan</label>
            <input type="number" name="pertambahanBerat" id="pertambahanBerat" value={values.pertambahanBerat} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="tingkatBungaBank" className="block text-gray-700 font-bold">Tingkat Bunga Bank (% /Tahun)</label>
            <input type="number" name="tingkatBungaBank" id="tingkatBungaBank" value={values.tingkatBungaBank} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="biayaOverHead" className="block text-gray-700 font-bold">Biaya Over Head (Rp./Ekor)</label>
            <input type="number" name="biayaOverHead" id="biayaOverHead" value={values.biayaOverHead} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="biayaMarketing" className="block text-gray-700 font-bold">Biaya Marketing (Rp./Ekor)</label>
            <input type="number" name="biayaMarketing" id="biayaMarketing" value={values.biayaMarketing} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full px-2 mb-4 md:mb-0 my-4">
            <label htmlFor="hargaJualSapi" className="block text-gray-700 font-bold">Harga Jual Sapi (Rp./Kg)</label>
            <input type="number" name="hargaJualSapi" id="hargaJualSapi" value={values.hargaJualSapi} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 mt-10"
        >
          Kalkulasi
        </button>
      </form>
    </div>
  );
}
