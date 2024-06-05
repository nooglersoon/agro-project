import { FormValues } from "../models/FormValues";

export const usePriceCalculations = (values: FormValues) => {
  const nilaiBeliSapiCIF = (): number => {
    return values.hargaSapiCIF * values.beratSapi * values.nilaiTukarUSD;
  }

  const beaMasuk = (): number => {
    return nilaiBeliSapiCIF() * (values.beaMasuk / 100);
  }

  const pphImpor = (): number => {
    return (nilaiBeliSapiCIF() + beaMasuk()) * (values.pph / 100);
  }

  const jumlah = (): number => {
    return nilaiBeliSapiCIF() + beaMasuk() + pphImpor() + values.biayaImport;
  }

  const hargaSapiDiKandang = (): number => {
    if (!values.beratSapi) { return 0; }
    return jumlah() / values.beratSapi;
  }

  const hargaPemeliharaan = (): number => {
    return values.lamaPemeliharaan * values.biayaPemeliharaan;
  }

  const biayaOverhead = (): number => {
    return values.lamaPemeliharaan * values.biayaOverHead;
  }

  const biayaBunga = (): number => {
    return (jumlah() + hargaSapiDiKandang() + hargaPemeliharaan() + biayaOverhead() + values.biayaMarketing) * ((values.lamaPemeliharaan / 365) * values.tingkatBungaBank / 100);
  }

  const totalBiaya = (): number => {
    return jumlah() + hargaSapiDiKandang() + hargaPemeliharaan() + biayaOverhead() + biayaBunga();
  }

  const beratAkhirSapiPotong = (): number => {
    return values.beratSapi + (values.lamaPemeliharaan * values.pertambahanBerat)
  }

  const hpp = (): number => {
    if (!beratAkhirSapiPotong()) { return 0 }
    return totalBiaya() / beratAkhirSapiPotong()
  }

  const nilaiJualSapiPotong = (): number => {
    return beratAkhirSapiPotong() * values.hargaJualSapi
  }

  const nettProfitPerEkor = (): number => {
    return nilaiJualSapiPotong() - totalBiaya()
  }

  const presentaseNettProfit = (): number => {
    if (!nilaiJualSapiPotong()) { return 0 }
    return nettProfitPerEkor() / nilaiJualSapiPotong()
  }

  const nettProfitPerKilo = (): number => {
    if (!nilaiJualSapiPotong()) { return 0 }
    return nettProfitPerEkor() / beratAkhirSapiPotong()
  }

  return {
    nilaiBeliSapiCIF,
    beaMasuk,
    pphImpor,
    jumlah,
    hargaSapiDiKandang,
    hargaPemeliharaan,
    biayaOverhead,
    biayaBunga,
    totalBiaya,
    beratAkhirSapiPotong,
    hpp,
    nilaiJualSapiPotong,
    nettProfitPerEkor,
    presentaseNettProfit,
    nettProfitPerKilo
  };
}