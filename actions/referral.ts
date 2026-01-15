// actions/referral.ts
'use server'

import { prisma } from "@/lib/prisma"

export async function generateReferralCode(userId: string) {
  // Gera um código aleatório de 6 dígitos
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { referralCode: code }
    });
    return { success: true, code };
  } catch (error) {
    return { success: false, error: "Erro ao gerar código" };
  }
}