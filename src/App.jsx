import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Email o password non corretti");
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white text-xl">Caricamento...</p></div>;

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🚚</div>
          <h1 className="text-xl font-bold text-slate-800">Fabrizio Gulisano srl</h1>
          <p className="text-slate-400 text-sm">Gestione Autotrasporti</p>
        </div>
        <div className="space-y-4">
          <input className="w-full border rounded-xl px-4 py-3 text-sm" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className="w-full border rounded-xl px-4 py-3 text-sm" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold text-sm">Accedi</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="bg-slate-800 text-white px-4 py-4 flex justify-between items-center">
        <div><p className="text-xs opacity-60">🚚 Fabrizio Gulisano srl</p><p className="font-bold">{user.email}</p></div>
        <button onClick={() => signOut(auth)} className="text-xs bg-slate-700 px-3 py-2 rounded-lg">Esci</button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-slate-500">App connessa a Firebase! ✅</p>
      </div>
    </div>
  );
}

