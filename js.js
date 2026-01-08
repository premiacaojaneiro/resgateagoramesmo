// JS ARRUMADO E OTIMIZADO - SEM FRESCURA
const VALOR_SALDO = 542.82;

// Função GLOBAL para selecionar o valor (o HTML chama isso direto)
window.selectAmount = function(element) {
    // Reseta o estilo de todos os botões de valor
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'text-primary', 'bg-white', 'shadow-[0_0_0_4px_rgba(254,44,85,0.1)]', 'scale-105');
        btn.classList.add('border-transparent', 'text-gray-900', 'bg-gray-50');
        btn.style.transform = 'scale(1)'; // Reseta escala
    });

    // Aplica o estilo no botão clicado
    element.classList.remove('border-transparent', 'text-gray-900', 'bg-gray-50');
    element.classList.add('border-primary', 'text-primary', 'bg-white', 'shadow-[0_0_0_4px_rgba(254,44,85,0.1)]', 'scale-105');
    
    // Animaçãozinha marota de clique
    element.style.transform = 'scale(1.05)';
    setTimeout(() => { element.style.transform = 'scale(1)'; }, 200);
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DO TIMER DE URGÊNCIA ---
    const timerEl = document.getElementById('expira-timer');
    if (timerEl) {
        let duration = 120; // 2 minutos em segundos
        const interval = setInterval(() => {
            let minutes = Math.floor(duration / 60);
            let seconds = duration % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (--duration < 0) {
                clearInterval(interval);
                timerEl.textContent = '00:00';
                timerEl.classList.add('animate-pulse', 'text-red-600');
            }
        }, 1000);
    }

    // --- 2. ATUALIZA OS VALORES NA TELA ---
    const saldoEl = document.getElementById('saldo-disponivel');
    if (saldoEl) saldoEl.innerHTML = `R$ ${VALOR_SALDO.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

    const saqueEl = document.getElementById('valor-saque');
    if (saqueEl) saqueEl.textContent = VALOR_SALDO.toLocaleString('pt-BR', {minimumFractionDigits: 2});

    // --- 3. LÓGICA DO BOTÃO "SACAR DINHEIRO" ---
    // Pega o botão principal (o último vermelhão da lista)
    const botoes = document.querySelectorAll('button');
    const btnSacar = Array.from(botoes).find(btn => 
        btn.textContent.trim().toLowerCase().includes('sacar dinheiro')
    );

    if (btnSacar) {
        btnSacar.addEventListener('click', (e) => {
            e.preventDefault();
            showUrgentAlert();
        });
    } else {
        // Fallback bruto: pega pelo estilo se não achar pelo texto
        const btnFallback = document.querySelector('.bg-primary.text-white.rounded-full');
        if (btnFallback) {
            btnFallback.addEventListener('click', (e) => {
                e.preventDefault();
                showUrgentAlert();
            });
        }
    }
});

// --- 4. FUNÇÃO DO POPUP E REDIRECIONAMENTO ---
function showUrgentAlert() {
    // Remove anterior se existir pra não bugar
    const old = document.getElementById('alert-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'alert-overlay';
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4';
    
    // HTML do Modal
    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all scale-100 border-2 border-primary/20 relative">
            
            <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>

            <h2 class="text-gray-900 text-2xl font-black mb-2 uppercase tracking-tight">Atenção!</h2>
            <p class="text-gray-600 font-medium mb-6 leading-relaxed">
                Seu saldo de <b class="text-primary">R$ ${VALOR_SALDO.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</b> está prestes a expirar.<br>
                Finalize o saque agora para não perder.
            </p>
            
            <button id="go-saque" class="w-full bg-primary hover:bg-[#e6284d] text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-primary/40 transition-transform active:scale-95">
                QUERO SACAR AGORA
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Redirecionamento
    document.getElementById('go-saque').onclick = () => {
        // Aqui tu coloca o link do checkout/pagamento
        window.location.href = 'https://pay.sunize.com.br/ylxxHfvm';
    };

    // Fecha se clicar fora (opcional, se quiser travar o cara tira isso)
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}

// Estilo extra pra animação do bounce
const style = document.createElement('style');
style.innerHTML = `
    @keyframes bounce {
        0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
        50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
    }
    .animate-bounce { animation: bounce 1s infinite; }
`;
document.head.appendChild(style);