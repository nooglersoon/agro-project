"use client"
import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { FormValues } from '@/app/hpp/models/FormValues';
import { usePriceCalculations } from '@/app/hpp/hooks/usePriceCalculations';
import TableResult from './components/TableResult';

export default function PriceCalculator() {
  const [values, setValues] = useState<FormValues>({
    nilaiTukarUSD: 16285.25,
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

  const [results, setResults] = useState<{ [key: string]: string | number }>()
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [isLoading, setIsloading] = useState<boolean>(false)
  const calculations = usePriceCalculations(values);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Parse the value to a number, ignoring leading and trailing spaces
    let parsedValue: number = parseFloat(value);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    setTimeout(() => {
      const data = {
        "Nilai Tukar USD. Ke Rp": values.nilaiTukarUSD,
        "Nilai Beli Sapi CIF": calculations.nilaiBeliSapiCIF(),
        "Bea Masuk": calculations.beaMasuk(),
        "PPH Impor": calculations.pphImpor(),
        "Biaya-Biaya Import": values.biayaImport,
        "Jumlah": calculations.jumlah(),
        "Harga Sapi Di Kandang (Rp./Kg)": calculations.hargaSapiDiKandang(),
        "Biaya Pemeliharaan (Rp/ekor)": calculations.hargaPemeliharaan(),
        "Biaya Over Head": calculations.biayaOverhead(),
        "Biaya Marketing": values.biayaMarketing,
        "Biaya Bunga": calculations.biayaBunga(),
        "Total Biaya": calculations.totalBiaya(),
        "Berat Akhir Sapi Potong (Kg.)": calculations.beratAkhirSapiPotong(),
        "HPP (Rp/Kg)": calculations.hpp(),
        "Nilai Jual Sapi Potong": calculations.nilaiJualSapiPotong(),
        "Nett Profit Rp./Ekor": calculations.nettProfitPerEkor(),
        "Prosentase Nett Profit": calculations.presentaseNettProfit(),
        "Nett Profit Rp./Kg": calculations.nettProfitPerKilo()
      };
      setResults(data)
      setSubmitted(true)
      setIsloading(false)
    }, 3000)
  };

  useEffect(() => {
  }, [])

  const Forms = () => {
    return <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Aplikasi Proyeksi Harga Pokok</h2>
      <div className="flex flex-wrap mb-4">
        <div className="w-full px-2 mb-4 md:mb-0 my-4">
          <label htmlFor="nilaiTukarUSD" className="block text-gray-700 font-bold">Nilai Tukar USD (Rp)</label>
          <input type="number" name="nilaiTukarUSD" id="nilaiTukarUSD" value={values.nilaiTukarUSD} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
        </div>
        <div className="w-full px-2 mb-4 md:mb-0 my-4">
          <label htmlFor="hargaSapiCIF" className="block text-gray-700 font-bold">Harga Sapi (CIF)</label>
          <input type="number" name="hargaSapiCIF" id="hargaSapiCIF" value={values.hargaSapiCIF} onChange={handleChange} className="form-input mt-1 block w-full border border-1 rounded-md px-4 py-2 border-black" />
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
      <LoadingButton onClick={() => { handleSubmit }} loading={isLoading} text='Kalkulasi' />
    </form>
  }

  const Results = () => {
    return <div className="bg-white p-8 rounded shadow-md flex flex-col gap-8">
      <h2 className="text-2xl font-semibold mb-4">Aplikasi Proyeksi Harga Pokok</h2>
      <TableResult data={results} />
      <LoadingButton onClick={() => {
        setIsloading(false);
        setSubmitted(false);
        setResults(undefined)
      }} loading={isLoading} text='Reset' />
    </div>
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center bg-gray-100 text-black p-2 md:p-8">
      {!isSubmitted && Forms()}
      {isSubmitted && Results()}
    </div>
  );
}

const LoadingButton: React.FC<{ onClick: () => void; loading: boolean; text: string; }> = ({ onClick, loading, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white py-4 px-4 rounded focus:outline-none focus:bg-green-600 w-full mt-8 text-center items-center"
      disabled={loading}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0113.5 1h-1A1.5 1.5 0 0011 2.5V4a8 8 0 01-4 6.928"
          ></path>
        </svg>
      ) : (
        text
      )}
    </button>
  );
};