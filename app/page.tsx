import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  // Busca o primeiro usuário do banco para teste
  const user = await prisma.user.findFirst({
    include: { transactions: true }
  });

  // Cálculo real do saldo baseado nas transações do banco
  const saldoCashback = user?.transactions
    .filter(t => t.type === 'CASHBACK')
    .reduce((acc, t) => acc + t.amount, 0) || 0;

  const saldoIndicacao = user?.transactions
    .filter(t => t.type === 'REFERRAL_BONUS')
    .reduce((acc, t) => acc + t.amount, 0) || 0;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard de {user?.name || 'Usuário'}</h1>
        
        <div className="bg-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Saldo total acumulado</p>
          <h2 className="text-4xl font-extrabold mt-1">
            R$ {(saldoCashback + saldoIndicacao).toFixed(2)}
          </h2>
        </div>

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

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
          <strong>Seu código:</strong> {user?.referralCode || 'CARREGANDO...'}
        </div>
      </div>
    </main>
  );
}