export default function Dashboard() {
  // Simulação de dados
  const saldoCashback = 150.50;
  const saldoIndicacao = 25.00;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Cashback</h1>
        
        {/* Card de Saldo Principal */}
        <div className="bg-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Saldo disponível para resgate</p>
          <h2 className="text-4xl font-extrabold mt-1">
            R$ {(saldoCashback + saldoIndicacao).toFixed(2)}
          </h2>
        </div>

        {/* Detalhamento */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Compras</p>
            <p className="text-lg font-bold text-green-600">R$ {saldoCashback.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Indicações</p>
            <p className="text-lg font-bold text-blue-600">R$ {saldoIndicacao.toFixed(2)}</p>
          </div>
        </div>

        {/* Botão de Convite */}
        <button className="w-full bg-white border-2 border-dashed border-orange-400 p-4 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 transition-all">
          📢 Indicar um amigo
        </button>
      </div>
    </main>
  );
}