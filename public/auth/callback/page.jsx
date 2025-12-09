// File: app/auth/callback/page.jsx

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  // Inicializar Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function processLogin() {
      // Tentar recuperar sessão
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Se não tiver sessão, voltar para login
      if (!session) {
        router.push('/login.html');
        return;
      }

      // Se tiver sessão → redirecionar para o destino correto
      router.push(redirect);
    }

    processLogin();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
      Processando login...
    </div>
  );
}
