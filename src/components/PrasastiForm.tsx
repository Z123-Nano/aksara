import { useState, useMemo } from "react";
import { ethers } from "ethers";
import { toJavanese, toSundanese, toMakassar, getUnsupportedLetters } from "@/lib/aksaraConverter";
import { savePrasasti } from "@/lib/prasasti.functions";
import { getLoanwordNote } from "@/lib/loanwordNotes";

type ScriptType = "javanese" | "sundanese" | "makassar";

interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export default function PrasastiForm() {
  const [inputName, setInputName] = useState("");
  const [scriptType, setScriptType] = useState<ScriptType>("javanese");
  const [status, setStatus] = useState<
    "idle" | "connecting" | "minting" | "success" | "error"
  >("idle");
  const [lastHash, setLastHash] = useState("");

  const resultAksara = useMemo(() => {
    if (!inputName) return "";
    switch (scriptType) {
      case "sundanese":
        return toSundanese(inputName);
      case "makassar":
        return toMakassar(inputName);
      default:
        return toJavanese(inputName);
    }
  }, [inputName, scriptType]);

  const getScriptLabel = (type: ScriptType) => {
    switch (type) {
      case "javanese":
        return "Aksara Jawa (Hanacaraka)";
      case "sundanese":
        return "Aksara Sunda (Kaganga)";
      case "makassar":
        return "Aksara Lontara (Makassar)";
    }
  };

  const unsupportedLetters = useMemo(() => {
    if (!inputName) return [];
    return getUnsupportedLetters(inputName, scriptType);
  }, [inputName, scriptType]);

  const unsupportedSet = useMemo(() => new Set(unsupportedLetters), [
    unsupportedLetters,
  ]);

  const handleMint = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Harap install MetaMask untuk menggunakan fitur Prasasti Digital!");
      return;
    }

    setStatus("connecting");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as never);
      const signer = await provider.getSigner();

      setStatus("minting");
      const message = `MINT_PRASASTI_V2: \nNama: ${inputName} \nJenis Aksara: ${scriptType.toUpperCase()} \nHasil: ${resultAksara} \nTimestamp: ${Date.now()}`;
      const signature = await signer.signMessage(message);

      setLastHash(signature);

      await savePrasasti({
        data: {
          name: inputName,
          message: resultAksara,
          scriptType,
          signature,
        },
      });

      setStatus("success");
    } catch (error) {
      console.error("Gagal simpan ke database:", error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="p-8 bg-white/60 border border-[#432818]/10 rounded-2xl backdrop-blur-sm shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37]/10 rounded-bl-full -mr-10 -mt-10 pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="scriptType" className="text-[#432818] font-serif font-bold text-lg">
              Pilih Jenis Aksara
            </label>
            <div className="relative">
              <select
                id="scriptType"
                value={scriptType}
                onChange={(e) => setScriptType(e.target.value as ScriptType)}
                className="w-full px-5 py-3 rounded-xl border-2 border-[#432818]/20 bg-[#FDFBF7] text-[#2A1D15] focus:outline-none focus:border-[#432818] focus:ring-1 focus:ring-[#432818] transition-all text-base shadow-sm appearance-none cursor-pointer hover:bg-white"
              >
                <option value="javanese">Jawa (Hanacaraka)</option>
                <option value="sundanese">Sunda (Ngalagena)</option>
                <option value="makassar">Makassar/Bugis (Lontara)</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#432818]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nameInput" className="text-[#432818] font-serif font-bold text-lg">
              Masukkan Nama Anda
            </label>
            <input
              id="nameInput"
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Ketik nama di sini (Contoh: Budi Santoso)"
              className="w-full px-5 py-4 rounded-xl border-2 border-[#432818]/20 bg-[#FDFBF7] text-[#2A1D15] placeholder:text-[#432818]/40 focus:outline-none focus:border-[#432818] focus:ring-1 focus:ring-[#432818] transition-all text-lg shadow-inner"
            />
          </div>

          <div className="relative group mt-4">
            <div className="absolute inset-0 bg-[#2A1D15] rounded-xl transform translate-y-2 translate-x-2 transition-transform duration-500 shadow-lg opacity-20"></div>

            <div className="relative p-10 bg-[#432818] rounded-xl text-[#F9F7F2] flex flex-col items-center justify-center min-h-[200px] border border-[#D4AF37]/30 shadow-2xl">
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/50"></div>

              <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-[#D4AF37] opacity-80 font-bold text-center">
                Hasil Transliterasi <br />
                <span className="text-white/40 tracking-normal capitalize mt-1 inline-block text-[9px]">
                  ({getScriptLabel(scriptType)})
                </span>
              </p>

              <h2 className="text-[#F9F7F2] text-center leading-normal drop-shadow-md font-serif break-all w-full text-4xl md:text-6xl">
                {resultAksara ? (
                  <>
                    {resultAksara.split('').map((ch, idx) => {
                      const isUnsupported = /[a-z]/.test(ch) && unsupportedSet.has(ch);
                      return isUnsupported ? (
                        <span
                          key={idx}
                          className="border-b-2 border-dotted border-[#D4AF37]/50"
                          title={getLoanwordNote(ch)}
                        >
                          {ch}
                        </span>
                      ) : (
                        <>{ch}</>
                      );
                    })}
                  </>
                ) : "..."}
              </h2>
            </div>
          </div>

          <button
            onClick={handleMint}
            disabled={status === "minting" || status === "success" || !inputName}
            className={`w-full py-5 font-bold rounded-xl transition-all border-b-4 uppercase tracking-widest flex justify-center items-center gap-3 text-sm mt-2
              ${
                status === "success"
                  ? "bg-[#2E5C38] border-[#1A3821] text-white cursor-default shadow-none translate-y-[4px]"
                  : "bg-[#D4AF37] border-[#9C7F22] text-[#432818] hover:bg-[#EDC855] hover:-translate-y-1 active:translate-y-0 shadow-lg"
              }
              ${!inputName ? "opacity-50 cursor-not-allowed transform-none grayscale" : "opacity-100"}
            `}
          >
            {status === "connecting" && <span className="animate-pulse">Menghubungkan Wallet...</span>}
            {status === "minting" && (
              <span className="flex items-center gap-2">
                <span className="animate-spin text-xl">⏳</span> Sedang Mengukir...
              </span>
            )}
            {status === "success" && "✓ Prasasti Berhasil Disimpan"}
            {status === "idle" && "Abadikan di Blockchain"}
            {status === "error" && "Gagal - Coba Lagi"}
          </button>
        </div>
      </div>

      {status === "success" && lastHash && (
        <div className="p-6 bg-[#432818] border border-[#D4AF37]/30 rounded-xl text-center shadow-2xl relative overflow-hidden">
          <h3 className="text-[#D4AF37] font-serif text-xl mb-2 relative z-10">
            🎉 PRASASTI BARU TERCIPTA
          </h3>
          <p className="text-[#F9F7F2]/80 text-sm mb-4 relative z-10">
            Nama Anda telah diabadikan dalam <strong>{getScriptLabel(scriptType)}</strong>.
          </p>

          <div className="bg-[#2A1D15] p-4 rounded-lg text-left overflow-hidden relative border border-[#D4AF37]/10 z-10">
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-bold">
              Digital Signature (Hash):
            </p>
            <p className="text-xs text-[#F9F7F2] font-mono break-all leading-relaxed opacity-90">
              {lastHash}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}