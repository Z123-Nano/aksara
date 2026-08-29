import { useState, useMemo } from "react";
import { ethers } from "ethers";
import { toJavanese, toSundanese, toMakassar, toBalinese, getUnsupportedLetters } from "@/lib/aksaraConverter";
import { savePrasasti } from "@/lib/prasasti.functions";
import { getLoanwordNote } from "@/lib/loanwordNotes";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type ScriptType = "javanese" | "sundanese" | "makassar" | "balinese";

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
      case "balinese":
        return toBalinese(inputName);
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
      case "balinese":
        return "Aksara Bali";
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
      <div className="p-8 bg-white/60 border border-bark/10 rounded-2xl backdrop-blur-sm shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-bl-full -mr-10 -mt-10 pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="scriptType" className="text-bark font-serif font-bold text-lg">
              Pilih Jenis Aksara
            </label>
            <div className="relative">
              <select
                id="scriptType"
                value={scriptType}
                onChange={(e) => setScriptType(e.target.value as ScriptType)}
                className="w-full px-5 py-3 rounded-xl border-2 border-bark/20 bg-cream text-ink focus:outline-none focus:border-bark focus:ring-1 focus:ring-bark transition-all text-base shadow-sm appearance-none cursor-pointer hover:bg-white"
              >
                <option value="javanese">Jawa (Hanacaraka)</option>
                <option value="sundanese">Sunda (Ngalagena)</option>
                <option value="makassar">Makassar/Bugis (Lontara)</option>
                <option value="balinese">Bali (Aksara Bali)</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-bark">
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
            <label htmlFor="nameInput" className="text-bark font-serif font-bold text-lg">
              Masukkan Nama Anda
            </label>
            <input
              id="nameInput"
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Ketik nama di sini (Contoh: Budi Santoso)"
              className="w-full px-5 py-4 rounded-xl border-2 border-bark/20 bg-cream text-ink placeholder:text-bark/40 focus:outline-none focus:border-bark focus:ring-1 focus:ring-bark transition-all text-lg shadow-inner"
            />
          </div>

          <div className="relative group mt-4">
            <div className="absolute inset-0 bg-ink rounded-xl transform translate-y-2 translate-x-2 transition-transform duration-500 shadow-lg opacity-20"></div>

            <div className="relative p-10 bg-bark rounded-xl text-parchment flex flex-col items-center justify-center min-h-[200px] border border-gold/30 shadow-2xl">
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/50"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/50"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/50"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/50"></div>

              <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-gold opacity-80 font-bold text-center">
                Hasil Transliterasi <br />
                <span className="text-white/40 tracking-normal capitalize mt-1 inline-block text-[9px]">
                  ({getScriptLabel(scriptType)})
                </span>
              </p>

              <h2 className="relative text-parchment text-center leading-normal drop-shadow-md font-serif break-all w-full text-4xl md:text-6xl">
                {resultAksara ? resultAksara : "..."}
                {unsupportedLetters.length > 0 ? (
                  <Popover key="unsupported-indicator">
                    <PopoverTrigger asChild>
                      <span className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-sm bg-gold text-bark text-[10px]">
                        ⓘ
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 rounded-md border bg-popover p-2 text-popover-foreground text-xs">
                      {Array.from(unsupportedSet).map((letter) => (
                        <div key={letter} className="mb-2">
                          <div className="font-medium">{letter}</div>
                          <div className="text-sm">{getLoanwordNote(letter)}</div>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                ) : null}
              </h2>

                          </div>
          </div>

          <button
            onClick={handleMint}
            disabled={status === "minting" || status === "success" || !inputName}
            className={`w-full py-5 font-bold rounded-xl transition-all border-b-4 uppercase tracking-widest flex justify-center items-center gap-3 text-sm mt-2
              ${
                status === "success"
                  ? "bg-moss border-moss-dark text-white cursor-default shadow-none translate-y-[4px]"
                  : "bg-gold border-gold-dark text-bark hover:bg-gold-light hover:-translate-y-1 active:translate-y-0 shadow-lg"
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
        <div className="p-6 bg-bark border border-gold/30 rounded-xl text-center shadow-2xl relative overflow-hidden">
          <h3 className="text-gold font-serif text-xl mb-2 relative z-10">
            🎉 PRASASTI BARU TERCIPTA
          </h3>
          <p className="text-parchment/80 text-sm mb-4 relative z-10">
            Nama Anda telah diabadikan dalam <strong>{getScriptLabel(scriptType)}</strong>.
          </p>

          <div className="bg-ink p-4 rounded-lg text-left overflow-hidden relative border border-gold/10 z-10">
            <p className="text-[10px] text-gold uppercase tracking-widest mb-1 font-bold">
              Digital Signature (Hash):
            </p>
            <p className="text-xs text-parchment font-mono break-all leading-relaxed opacity-90">
              {lastHash}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}