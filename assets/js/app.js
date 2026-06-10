// ── STATE ──────────────────────────────────────────────────
let currentPage = 'page-login';
let currentRole = 'admin';
let sidebarCollapsed = false;

// ── NAV CONFIG ─────────────────────────────────────────────
const NAV_ADMIN = [
  { section: 'Principal' },
  { id: 'page-dashboard-admin', icon: 'bi-speedometer2', label: 'Dashboard' },
  { section: 'Gestão Clínica' },
  { id: 'page-agenda', icon: 'bi-calendar2-week', label: 'Agenda' },
  { id: 'page-pacientes', icon: 'bi-people', label: 'Pacientes', badge: true },
  { id: 'page-prontuario', icon: 'bi-file-medical', label: 'Prontuário' },
  { id: 'page-salas', icon: 'bi-door-open', label: 'Salas' },
  { section: 'Financeiro' },
  { id: 'page-financeiro', icon: 'bi-cash-stack', label: 'Financeiro' },
  { id: 'page-planos', icon: 'bi-layers', label: 'Planos' },
  { section: 'Operacional' },
  { id: 'page-tarefas', icon: 'bi-kanban', label: 'Tarefas' },
  { id: 'page-documentos', icon: 'bi-folder2-open', label: 'Documentos' },
  { id: 'page-comunicacao', icon: 'bi-chat-dots', label: 'Comunicação', badge: true },
  { id: 'page-relatorios', icon: 'bi-bar-chart-line', label: 'Relatórios' },
  { section: 'Sistema' },
  { id: 'page-auditoria', icon: 'bi-clipboard2-data', label: 'Auditoria' },
  { id: 'page-configuracoes', icon: 'bi-gear', label: 'Configurações' },
  { id: 'page-suporte', icon: 'bi-question-circle', label: 'Suporte' },
];

const NAV_PSI = [
  { section: 'Principal' },
  { id: 'page-dashboard-psi', icon: 'bi-speedometer2', label: 'Meu Dashboard' },
  { section: 'Atendimento' },
  { id: 'page-agenda', icon: 'bi-calendar2-week', label: 'Minha Agenda' },
  { id: 'page-pacientes', icon: 'bi-people', label: 'Meus Pacientes' },
  { id: 'page-prontuario', icon: 'bi-file-medical', label: 'Prontuário' },
  { section: 'Gestão' },
  { id: 'page-tarefas', icon: 'bi-kanban', label: 'Tarefas' },
  { id: 'page-documentos', icon: 'bi-folder2-open', label: 'Documentos' },
  { id: 'page-comunicacao', icon: 'bi-chat-dots', label: 'Mensagens', badge: true },
  { section: 'Conta' },
  { id: 'page-configuracoes', icon: 'bi-gear', label: 'Configurações' },
  { id: 'page-suporte', icon: 'bi-question-circle', label: 'Suporte' },
];

const NAV_PAC = [
  { section: 'Principal' },
  { id: 'page-dashboard-pac', icon: 'bi-house', label: 'Início' },
  { section: 'Minha Saúde' },
  { id: 'page-agenda', icon: 'bi-calendar2-check', label: 'Minhas Consultas' },
  { id: 'page-documentos', icon: 'bi-folder2-open', label: 'Meus Documentos' },
  { id: 'page-planos', icon: 'bi-layers', label: 'Meu Plano' },
  { section: 'Conta' },
  { id: 'page-comunicacao', icon: 'bi-chat-dots', label: 'Mensagens', badge: true },
  { id: 'page-configuracoes', icon: 'bi-gear', label: 'Configurações' },
  { id: 'page-suporte', icon: 'bi-question-circle', label: 'Suporte' },
];

const BREADCRUMBS = {
  'page-dashboard-admin': ['Dashboard'],
  'page-dashboard-psi': ['Meu Dashboard'],
  'page-dashboard-pac': ['Início'],
  'page-agenda': ['Agenda Inteligente'],
  'page-pacientes': ['Pacientes'],
  'page-perfil-paciente': ['Pacientes', 'Perfil do paciente'],
  'page-prontuario': ['Pacientes', 'Prontuário'],
  'page-financeiro': ['Financeiro'],
  'page-tarefas': ['Tarefas'],
  'page-planos': ['Planos'],
  'page-documentos': ['Documentos'],
  'page-relatorios': ['Relatórios'],
  'page-salas': ['Salas'],
  'page-comunicacao': ['Comunicação'],
  'page-configuracoes': ['Configurações'],
  'page-auditoria': ['Auditoria'],
  'page-suporte': ['Suporte'],
};


function getCurrentUserInfo() {
  const u = getUser();
  const role = (u.role || '').toUpperCase();
  const nome = u.nome || 'Usuário';
  const roleLabel = role === 'ADMIN' ? 'Administrador' : role === 'PSICOLOGO' ? 'Psicólogo(a)' : 'Paciente';
  return {
    name: nome,
    role: roleLabel,
    initials: iniciais(nome),
    color: role === 'ADMIN' ? '#E05252' : role === 'PSICOLOGO' ? '#4A7FC1' : '#7B68EE'
  };
}

// ── BUILD SIDEBAR ──────────────────────────────────────────
function buildSidebar(containerId, nav) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const user = getCurrentUserInfo();
  let html = `<div class="sidebar-logo">
    <div class="logo-mark"><i class="bi bi-heart-pulse-fill"></i></div>
    <span class="logo-text">Psico<span>Flow</span></span>
  </div>
  <div style="flex:1;overflow-y:auto;overflow-x:hidden;">`;
  let inSection = false;
  nav.forEach(item => {
    if (item.section) {
      if (inSection) html += '</div>';
      html += `<div class="nav-section"><div class="nav-section-label">${item.section}</div>`;
      inSection = true;
    } else {
      const active = currentPage === item.id ? 'active' : '';
      const badge = item.badge ? '<span class="badge-dot"></span>' : '';
      html += `<a class="nav-item ${active}" onclick="showPage('${item.id}')">
        <i class="bi ${item.icon}"></i>
        <span>${item.label}</span>${badge}
      </a>`;
    }
  });
  if (inSection) html += '</div>';
  html += `</div>
  <div class="sidebar-footer">
    <div class="user-card" onclick="showPage('page-configuracoes')">
      <div class="avatar" style="background:${user.color};">${user.initials}</div>
      <div class="user-info">
        <div class="user-name">${user.name}</div>
        <div class="user-role">${user.role}</div>
      </div>
      <i class="bi bi-chevron-right" style="color:var(--text-3);font-size:.75rem;margin-left:auto;"></i>
    </div>
  </div>`;
  el.innerHTML = html;
  el.classList.toggle('collapsed', sidebarCollapsed);
}

// ── BUILD TOPBAR ───────────────────────────────────────────
function buildTopbar(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const crumbs = BREADCRUMBS[currentPage] || [''];
  let crumbHtml = crumbs.map((c,i) => i === crumbs.length-1 ? `<span class="active">${c}</span>` : `<span>${c}</span><span>/</span>`).join('');
  el.innerHTML = `
    <button class="icon-btn" onclick="toggleSidebar()" style="margin-right:8px;"><i class="bi bi-list"></i></button>
    <nav class="breadcrumb-nav">${crumbHtml}</nav>
    <div class="topbar-search d-none d-md-block" style="position:relative;">
      <i class="bi bi-search search-icon"></i>
      <input type="text" class="form-control topbar-search" placeholder="Busca global..." oninput="handleSearch(this.value)">
    </div>
    <div class="topbar-right">
      <button class="icon-btn" data-tip="Ajuda" onclick="showPage('page-suporte')"><i class="bi bi-question-circle"></i></button>
      <button class="icon-btn" data-tip="Notificações" onclick="openModal('modalNotif')" style="position:relative;">
        <i class="bi bi-bell"></i>
        <span class="notif-badge">3</span>
      </button>
      <button class="icon-btn" data-tip="Sair" onclick="logout()"><i class="bi bi-box-arrow-right"></i></button>
    </div>
  `;
  el.classList.toggle('expanded', sidebarCollapsed);
}

// ── PAGE MANAGER ───────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(pageId);
  if (!el) return;
  el.classList.add('active');
  currentPage = pageId;
  // Rebuild sidebar/topbar for app pages
  const sbMap = {
    'page-dashboard-admin': ['sb-da','tb-da'],
    'page-dashboard-psi':   ['sb-dp','tb-dp'],
    'page-dashboard-pac':   ['sb-dpc','tb-dpc'],
    'page-agenda':          ['sb-ag','tb-ag'],
    'page-pacientes':       ['sb-pac','tb-pac'],
    'page-perfil-paciente': ['sb-pp','tb-pp'],
    'page-prontuario':      ['sb-pr','tb-pr'],
    'page-financeiro':      ['sb-fn','tb-fn'],
    'page-tarefas':         ['sb-tk','tb-tk'],
    'page-planos':          ['sb-pl','tb-pl'],
    'page-documentos':      ['sb-dc','tb-dc'],
    'page-relatorios':      ['sb-rl','tb-rl'],
    'page-salas':           ['sb-sl','tb-sl'],
    'page-comunicacao':     ['sb-cm','tb-cm'],
    'page-configuracoes':   ['sb-cf','tb-cf'],
    'page-auditoria':       ['sb-au','tb-au'],
    'page-suporte':         ['sb-su','tb-su'],
  };
  if (sbMap[pageId]) {
    const nav = currentRole === 'psi' ? NAV_PSI : currentRole === 'pac' ? NAV_PAC : NAV_ADMIN;
    buildSidebar(sbMap[pageId][0], nav);
    buildTopbar(sbMap[pageId][1]);
    buildTopbar(sbMap[pageId][1]);
  }
  // Init charts
  setTimeout(() => initCharts(pageId), 100);
  window.scrollTo(0,0);
}

// ── AUTH ───────────────────────────────────────────────────
function doLogin() {
  showToast('Entrando no sistema...', 'success');
  setTimeout(() => {
    if (currentRole === 'psi') showPage('page-dashboard-psi');
    else if (currentRole === 'pac') showPage('page-dashboard-pac');
    else showPage('page-dashboard-admin');
  }, 700);
}
function loginAs(role) {
  currentRole = role;
  doLogin();
}
function logout() {
  localStorage.removeItem('psicoflow_token');
  localStorage.removeItem('psicoflow_user');
  currentRole = 'admin';
  showToast('Até logo!');
  setTimeout(() => showPage('page-login'), 500);
}
function togglePass(id, el) {
  const inp = document.getElementById(id);
  if (inp.type === 'password') { inp.type = 'text'; el.innerHTML = '<i class="bi bi-eye-slash"></i>'; }
  else { inp.type = 'password'; el.innerHTML = '<i class="bi bi-eye"></i>'; }
}

// ── SIDEBAR TOGGLE ─────────────────────────────────────────
function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.querySelectorAll('.sidebar').forEach(sb => sb.classList.toggle('collapsed', sidebarCollapsed));
  document.querySelectorAll('.topbar').forEach(tb => tb.classList.toggle('expanded', sidebarCollapsed));
  document.querySelectorAll('.main-content').forEach(mc => mc.classList.toggle('expanded', sidebarCollapsed));
}

// ── MODALS ─────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); }));

// ── TOAST ──────────────────────────────────────────────────
function showToast(msg, type='') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast-msg ${type}`;
  t.innerHTML = `<i class="bi bi-${type==='success'?'check-circle-fill':type==='danger'?'exclamation-circle-fill':'info-circle-fill'}"></i> ${msg}`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ── TABS ───────────────────────────────────────────────────
function switchTab(prefix, name) {
  document.querySelectorAll(`[id^="${prefix}-"]`).forEach(el => { el.classList.remove('active'); });
  document.getElementById(`${prefix}-${name}`).classList.add('active');
  // Update tab buttons
  const container = document.getElementById(`${prefix}-${name}`).closest('.card-custom');
  if (container) {
    container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
  }
}

// ── CADASTRO TABS ──────────────────────────────────────────
function setCadTab(type) {
  ['pac','psi','adm'].forEach(t => {
    const btn = document.getElementById(`tab-cad-${t}`);
    if (btn) { btn.style.background='transparent'; btn.style.color='var(--text-2)'; btn.style.borderColor='var(--border)'; }
  });
  const active = document.getElementById(`tab-cad-${type}`);
  if (active) { active.style.background='var(--primary)'; active.style.color='white'; active.style.borderColor='var(--primary)'; }
  document.getElementById('crp-field').style.display = type === 'psi' ? 'block' : 'none';
}

// ── AGENDA VIEWS ────────────────────────────────────────────
function setAgendaView(v) {
  ['mes','sem','dia'].forEach(vv => {
    const el = document.getElementById(`agenda-view-${vv}`);
    const btn = document.getElementById(`view-${vv}`);
    if (el) el.style.display = vv === v ? 'block' : 'none';
    if (btn) { btn.style.background = vv === v ? 'var(--primary)' : 'none'; btn.style.color = vv === v ? 'white' : 'var(--text-2)'; }
  });
}

// ── CONFIGURAÇÕES ──────────────────────────────────────────
function switchCfg(name) {
  ['perfil','clinica','seguranca','notif','integr'].forEach(n => {
    const el = document.getElementById(`cfg-${n}`);
    if (el) el.style.display = n === name ? 'block' : 'none';
  });
  document.querySelectorAll('#cfg-menu .nav-item').forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
}

// ── SEARCH ─────────────────────────────────────────────────
function handleSearch(v) {
  if (v.length > 1) showToast(`Buscando: "${v}"...`);
}

// ── CHARTS ─────────────────────────────────────────────────
const chartsCreated = {};
function initCharts(pageId) {
  if (pageId === 'page-dashboard-admin') {
    if (!chartsCreated['chartReceita']) {
      const ctx = document.getElementById('chartReceita');
      if (ctx) {
        chartsCreated['chartReceita'] = new Chart(ctx, { type:'bar', data:{ labels:[], datasets:[{label:'Receita',data:[],backgroundColor:'rgba(74,127,193,0.15)',borderColor:'#4A7FC1',borderWidth:2,borderRadius:6,fill:true}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{callback:v=>'R$'+Math.round(v/1000)+'k'}}}} });
      }
    }
    if (!chartsCreated['chartTipos']) {
      const ctx2 = document.getElementById('chartTipos');
      if (ctx2) {
        chartsCreated['chartTipos'] = new Chart(ctx2, { type:'doughnut', data:{ labels:[], datasets:[{data:[],backgroundColor:['#4A7FC1','#5BAD8C','#7B68EE'],borderWidth:0,hoverOffset:4}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'70%'} });
      }
    }
  }
  if (pageId === 'page-financeiro') {
    if (!chartsCreated['chartFluxo']) {
      const ctx = document.getElementById('chartFluxo');
      if (ctx) {
        chartsCreated['chartFluxo'] = new Chart(ctx, { type:'line', data:{ labels:[], datasets:[{label:'Receita',data:[],borderColor:'#5BAD8C',backgroundColor:'rgba(91,173,140,.08)',tension:0.4,fill:true,pointRadius:3},{label:'Despesa',data:[],borderColor:'#E05252',backgroundColor:'rgba(224,82,82,.06)',tension:0.4,fill:true,pointRadius:3}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{callback:v=>'R$'+Math.round(v/1000)+'k'}}}} });
      }
    }
  }
  if (pageId === 'page-relatorios') {
    if (!chartsCreated['chartPacientes']) {
      const ctx = document.getElementById('chartPacientes');
      if (ctx) {
        chartsCreated['chartPacientes'] = new Chart(ctx, { type:'line', data:{ labels:[], datasets:[{label:'Pacientes',data:[],borderColor:'#4A7FC1',backgroundColor:'rgba(74,127,193,.1)',tension:0.4,fill:true,pointRadius:3}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(0,0,0,.04)'}}}} });
      }
    }
    if (!chartsCreated['chartPsiReceita']) {
      const ctx2 = document.getElementById('chartPsiReceita');
      if (ctx2) {
        chartsCreated['chartPsiReceita'] = new Chart(ctx2, { type:'bar', data:{ labels:[], datasets:[{label:'Receita (R$)',data:[],backgroundColor:['#4A7FC1','#5BAD8C','#7B68EE','#F4A738','#E05252'],borderRadius:6}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{callback:v=>'R$'+Math.round(v/1000)+'k'}}}} });
      }
    }
  }
}

// ── INIT ───────────────────────────────────────────────────
// Nothing to init on load — starts at login page


// ───────────────────────────────────────────────────────────
// API INTEGRATION - dados reais do backend
// ───────────────────────────────────────────────────────────
const API_BASE = `${window.location.origin}/api`; // usa o mesmo servidor do frontend/backend

function getToken() {
  return localStorage.getItem('psicoflow_token') || '';
}

function setAuth(token, user) {
  localStorage.setItem('psicoflow_token', token);
  localStorage.setItem('psicoflow_user', JSON.stringify(user || {}));
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('psicoflow_user') || '{}'); }
  catch { return {}; }
}

async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  let data = null;
  try { data = await response.json(); } catch {}

  if (!response.ok) {
    throw new Error(data?.error || 'Erro ao comunicar com a API');
  }

  return data;
}

async function apiLogin() {
  const email = document.getElementById('loginEmail')?.value?.trim() || '';
  const senha = document.getElementById('loginPass')?.value || '';
  if (!email || !senha) return showToast('Informe e-mail e senha.', 'danger');

  try {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha })
    });

    setAuth(data.token, data.user);
    currentRole = data.user?.role === 'PSICOLOGO' ? 'psi' : data.user?.role === 'PACIENTE' ? 'pac' : 'admin';

    showToast('Login realizado com sucesso!', 'success');

    if (currentRole === 'psi') showPage('page-dashboard-psi');
    else if (currentRole === 'pac') showPage('page-dashboard-pac');
    else showPage('page-dashboard-admin');

    atualizarInterfaceUsuarioLogado();
    removerConteudoEstaticoVisivel();
    carregarDadosDaPagina(currentPage);
  } catch (error) {
    showToast(error.message || 'Erro ao fazer login', 'danger');
  }
}

async function loginDemo() {
  showToast('Acesso de demonstração removido. Use um usuário cadastrado no banco.', 'danger');
}

// sobrescreve as funções antigas de login do protótipo
doLogin = apiLogin;
loginAs = loginDemo;

function formatarMoeda(valor) {
  const numero = Number(valor || 0);
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(data) {
  if (!data) return '-';
  return new Date(data).toLocaleDateString('pt-BR');
}

function formatarDataHora(data) {
  if (!data) return '-';
  return new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function iniciais(nome = '') {
  return nome.split(' ').filter(Boolean).slice(0,2).map(p => p[0]).join('').toUpperCase() || 'PF';
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

async function carregarDadosDaPagina(pageId) {
  if (!getToken()) return;

  try {
    if (pageId === 'page-dashboard-admin' || pageId === 'page-dashboard-psi' || pageId === 'page-dashboard-pac') {
      await carregarDashboard();
    }
    if (pageId === 'page-pacientes') await carregarPacientes();
    if (pageId === 'page-agenda') await carregarAgenda();
    if (pageId === 'page-prontuario') await carregarProntuarios();
    if (pageId === 'page-financeiro') await carregarFinanceiro();
    if (pageId === 'page-planos') await carregarPlanos();
    if (pageId === 'page-relatorios') await carregarRelatorios();
  } catch (error) {
    console.warn('Erro ao carregar página:', error);
  }
}

const showPageOriginalApi = showPage;
showPage = function(pageId) {
  showPageOriginalApi(pageId);
  setTimeout(() => carregarDadosDaPagina(pageId), 150);
};

async function carregarDashboard() {
  const resumo = await apiRequest('/dashboard/resumo');

  const cards = document.querySelectorAll('#page-dashboard-admin .stat-value');
  if (cards[0]) cards[0].textContent = resumo.totalPacientes ?? 0;
  if (cards[1]) cards[1].textContent = resumo.totalPsicologos ?? resumo.psicologosAtivos ?? 0;
  if (cards[2]) cards[2].textContent = resumo.sessoesHoje ?? resumo.totalSessoes ?? 0;
  if (cards[3]) cards[3].textContent = formatarMoeda(resumo.receitaPrevista || resumo.receitaTotal || 0).replace(',00','');

  const psiCards = document.querySelectorAll('#page-dashboard-psi .stat-value');
  if (psiCards[0]) psiCards[0].textContent = resumo.sessoesHoje ?? resumo.totalSessoes ?? 0;
  if (psiCards[1]) psiCards[1].textContent = resumo.totalPacientes ?? 0;
  if (psiCards[2]) psiCards[2].textContent = resumo.evolucoesPendentes ?? Math.max((resumo.totalSessoes || 0) - (resumo.totalProntuarios || 0), 0);
  if (psiCards[3]) psiCards[3].textContent = formatarMoeda(resumo.receitaPrevista || resumo.receitaTotal || 0).replace(',00','');
}


async function carregarPacientes() {
  const pacientes = await apiRequest('/pacientes');
  cachePacientesApi = pacientes;
  const tbody = document.querySelector('#page-pacientes table tbody');
  if (!tbody) return;

  tbody.innerHTML = pacientes.length ? pacientes.map((p, idx) => `
    <tr style="cursor:pointer;">
      <td onclick="abrirPerfilPaciente(${p.id})">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="avatar-sm" style="background:${['#4A7FC1','#5BAD8C','#7B68EE','#E05252','#F4A738'][idx%5]};">${iniciais(p.nome)}</div>
          <div>
            <div style="font-weight:600;color:var(--text-1);font-size:.88rem;">${p.nome}</div>
            <div style="font-size:.73rem;color:var(--text-3);">CPF ${p.cpf || 'não informado'}</div>
          </div>
        </div>
      </td>
      <td><div style="font-size:.83rem;">${p.email || '-'}</div><div style="font-size:.73rem;color:var(--text-3);">${p.telefone || '-'}</div></td>
      <td>${p.criadoPor?.nome || 'Equipe clínica'}</td>
      <td><span class="badge-custom badge-primary">${p.planos?.[0]?.plano?.nome || 'Avulso'}</span></td>
      <td>${p.sessoes?.[0]?.dataHora ? formatarData(p.sessoes[0].dataHora) : '-'}</td>
      <td><span class="badge-custom badge-success"><i class="bi bi-circle-fill" style="font-size:.45rem;"></i> Ativo</span></td>
      <td>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          <button class="btn-sm-custom btn-outline-sm" onclick="abrirPerfilPaciente(${p.id})"><i class="bi bi-eye"></i></button>
          <button class="btn-sm-custom btn-outline-sm" onclick="abrirModalSessaoApi()"><i class="bi bi-calendar-plus"></i></button>
          <button class="btn-sm-custom btn-danger-sm" onclick="excluirPacienteApi(${p.id})"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('') : emptyState(7, 'Nenhum paciente cadastrado para este usuário.');
}

async function abrirPerfilPaciente(id) {
  pacienteSelecionadoId = id;
  await carregarPerfilPaciente(id);
  showPage('page-perfil-paciente');
}

async function carregarPerfilPaciente(id) {
  const p = await apiRequest(`/pacientes/${id}`);
  const page = document.getElementById('page-perfil-paciente');
  if (!page) return;
  page.querySelectorAll('h1').forEach(h => { if (/Ana|Paciente|Santos/i.test(h.textContent)) h.textContent = p.nome || 'Paciente'; });
  const crumbs = page.querySelectorAll('span');
  crumbs.forEach(sp => { if (/Ana Beatriz|Santos/i.test(sp.textContent)) sp.textContent = p.nome || 'Paciente'; });
  page.querySelectorAll('div').forEach(div => {
    if (div.textContent === 'Ana Beatriz Santos') div.textContent = p.nome || '-';
    if (div.textContent.includes('CPF') && div.textContent.includes('123.456')) div.textContent = p.cpf || 'CPF não informado';
  });
}


async function carregarAgenda() {
  const sessoes = await apiRequest('/sessoes');
  cacheSessoesApi = sessoes;
  const agendaTables = document.querySelectorAll('#page-agenda table tbody');
  agendaTables.forEach(tbody => {
    tbody.innerHTML = sessoes.length ? sessoes.slice(0, 12).map(s => `
      <tr>
        <td>${formatarDataHora(s.dataHora)}</td>
        <td>${s.paciente?.nome || 'Paciente'}</td>
        <td>${s.psicologo?.nome || 'Psicólogo'}</td>
        <td>${s.tipo || 'Sessão'}</td>
        <td><span class="badge-custom ${s.status === 'CONFIRMADA' ? 'badge-success' : s.status === 'CANCELADA' ? 'badge-danger' : s.status === 'REALIZADA' ? 'badge-primary' : 'badge-warning'}">${s.status}</span></td>
        <td>${formatarMoeda(s.valor)}</td>
        <td><button class="btn-sm-custom btn-danger-sm" onclick="excluirSessaoApi(${s.id})"><i class="bi bi-trash"></i></button></td>
      </tr>
    `).join('') : emptyState(7, 'Nenhuma sessão encontrada para este usuário.');
  });

  const calEvents = document.querySelectorAll('#page-agenda .cal-event');
  sessoes.slice(0, calEvents.length).forEach((s,i) => calEvents[i].textContent = `${new Date(s.dataHora).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})} ${s.paciente?.nome || ''}`);
}



async function carregarProntuarios() {
  const prontuarios = await apiRequest('/prontuarios');
  cacheProntuariosApi = prontuarios;
  const table = document.querySelector('#page-prontuario table tbody');
  if (table) {
    table.innerHTML = prontuarios.length ? prontuarios.map(p => `
      <tr>
        <td>${p.paciente?.nome || '-'}</td>
        <td>${formatarData(p.criadoEm)}</td>
        <td>${p.sessao ? formatarDataHora(p.sessao.dataHora) : '-'}</td>
        <td><span class="badge-custom badge-success">Preenchido</span></td>
        <td>
          <button class="btn-sm-custom btn-outline-sm" onclick="showToast('${(p.evolucao || '').replaceAll("'", "´").slice(0,80)}','success')"><i class="bi bi-eye"></i> Ver</button>
          <button class="btn-sm-custom btn-danger-sm" onclick="excluirProntuarioApi(${p.id})"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `).join('') : emptyState(5, 'Nenhum prontuário encontrado para este usuário.');
  }

  const evolutions = document.querySelectorAll('#page-prontuario .evolution-item');
  prontuarios.slice(0, evolutions.length).forEach((p, i) => {
    evolutions[i].querySelector('.evo-date')?.replaceChildren(document.createTextNode(`${p.paciente?.nome || ''} · ${formatarData(p.criadoEm)}`));
    evolutions[i].querySelector('.evo-text')?.replaceChildren(document.createTextNode(p.evolucao || 'Evolução clínica registrada.'));
  });
}



async function carregarFinanceiro() {
  const resumo = await apiRequest('/financeiro/resumo');
  const receitasLista = await apiRequest('/financeiro/receitas').catch(() => []);
  const despesasLista = await apiRequest('/financeiro/despesas').catch(() => []);

  const cards = document.querySelectorAll('#page-financeiro .stat-value');
  const receitas = Number(resumo.receitas || resumo.receitaTotal || 0);
  const despesas = Number(resumo.despesas || resumo.despesaTotal || 0);
  if (cards[0]) cards[0].textContent = formatarMoeda(receitas);
  if (cards[1]) cards[1].textContent = formatarMoeda(despesas);
  if (cards[2]) cards[2].textContent = formatarMoeda(resumo.saldo ?? receitas - despesas);

  const tbody = document.querySelector('#page-financeiro table tbody');
  if (tbody) {
    const linhasReceitas = receitasLista.slice(0,5).map(r => `
      <tr><td>${formatarData(r.dataPagamento || r.createdAt)}</td><td>${r.descricao}</td><td><span class="badge-custom badge-success">Receita</span></td><td>${formatarMoeda(r.valor)}</td><td>${r.status}</td></tr>
    `);
    const linhasDespesas = despesasLista.slice(0,5).map(d => `
      <tr><td>${formatarData(d.dataPagamento || d.createdAt)}</td><td>${d.descricao}</td><td><span class="badge-custom badge-danger">Despesa</span></td><td>-${formatarMoeda(d.valor)}</td><td>${d.status}</td></tr>
    `);
    tbody.innerHTML = [...linhasReceitas, ...linhasDespesas].join('');
  }
}



async function carregarPlanos() {
  let planos = [];
  try { planos = await apiRequest('/planos'); } catch {}
  const container = document.querySelector('#page-planos .row');
  if (!container || !planos.length) return;

  container.innerHTML = planos.map(p => `
    <div class="col-md-4 mb-3">
      <div class="card-custom h-100">
        <div class="section-title">${p.nome}</div>
        <div style="font-size:1.6rem;font-weight:700;color:var(--primary);margin:10px 0;">${formatarMoeda(p.valor)}</div>
        <p style="color:var(--text-2);">${p.quantidadeSessoes} sessões · ${p.descontoPercentual || 0}% de desconto</p>
        <p style="color:var(--text-3);font-size:.83rem;">${p.descricao || 'Plano de acompanhamento psicológico.'}</p>
        <button class="btn-sm-custom btn-outline-sm" onclick="showToast('Plano carregado do banco de dados.','success')"><i class="bi bi-check2"></i> Ativo</button>
      </div>
    </div>
  `).join('');
}


async function carregarRelatorios() {
  const [financeiro, operacional, clinico] = await Promise.all([
    apiRequest('/relatorios/financeiro'),
    apiRequest('/relatorios/operacional'),
    apiRequest('/relatorios/clinico')
  ]);

  const box = document.querySelector('#page-relatorios .card-custom');
  if (!box) return;

  box.insertAdjacentHTML('afterbegin', `
    <div class="row g-3 mb-4" id="relatorios-api-resumo">
      <div class="col-md-4"><div class="card-custom"><div class="stat-label">Receita Total</div><div class="stat-value">${formatarMoeda(financeiro.receitaTotal || financeiro.receitas || 0)}</div></div></div>
      <div class="col-md-4"><div class="card-custom"><div class="stat-label">Sessões</div><div class="stat-value">${operacional.totalSessoes || 0}</div></div></div>
      <div class="col-md-4"><div class="card-custom"><div class="stat-label">Prontuários</div><div class="stat-value">${clinico.totalProntuarios || 0}</div></div></div>
    </div>
  `);
}


// ───────────────────────────────────────────────────────────
// FUNÇÕES DE CADASTRO E BOTÕES FUNCIONAIS - API REAL
// ───────────────────────────────────────────────────────────
let cadastroRoleAtual = 'PACIENTE';

const setCadTabOriginal = typeof setCadTab === 'function' ? setCadTab : null;
setCadTab = function(tipo) {
  cadastroRoleAtual = tipo === 'psi' ? 'PSICOLOGO' : tipo === 'adm' ? 'ADMIN' : 'PACIENTE';
  if (setCadTabOriginal) setCadTabOriginal(tipo);
};

async function cadastrarUsuario() {
  const page = document.getElementById('page-cadastro');
  const inputs = page.querySelectorAll('input');

  const nome = `${inputs[0]?.value || ''} ${inputs[1]?.value || ''}`.trim();
  const email = inputs[2]?.value?.trim();
  const senha = inputs[4]?.value || inputs[3]?.value;
  const confirmar = inputs[5]?.value || '';
  const termos = page.querySelector('input[type="checkbox"]');

  if (!nome || !email || !senha) return showToast('Preencha nome, e-mail e senha.', 'danger');
  if (confirmar && senha !== confirmar) return showToast('As senhas não conferem.', 'danger');
  if (termos && !termos.checked) return showToast('Aceite os termos para continuar.', 'danger');

  try {
    await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha, role: cadastroRoleAtual })
    });

    showToast('Conta criada com sucesso! Você já pode fazer login.', 'success');
    const emailLogin = document.getElementById('loginEmail');
    if (emailLogin) emailLogin.value = email;
    showPage('page-login');
  } catch (error) {
    showToast(error.message || 'Erro ao cadastrar usuário.', 'danger');
  }
}

async function carregarPacientesOptions(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return [];
  const pacientes = await apiRequest('/pacientes');
  select.innerHTML = '<option value="">Selecione...</option>' + pacientes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  return pacientes;
}

async function carregarSessoesOptions(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return [];
  const sessoes = await apiRequest('/sessoes');
  cacheSessoesApi = sessoes;
  select.innerHTML = '<option value="">Sem sessão vinculada</option>' + sessoes.map(s => `<option value="${s.id}">${s.paciente?.nome || 'Paciente'} - ${formatarDataHora(s.dataHora)}</option>`).join('');
  return sessoes;
}

function limparInputs(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function abrirModalPacienteApi() {
  limparInputs(['pacienteNome','pacienteCpf','pacienteTelefone','pacienteEmail','pacienteEndereco','pacienteObs']);
  openModal('modalPacienteApi');
}

async function salvarPacienteApi() {
  try {
    const body = {
      nome: document.getElementById('pacienteNome').value,
      cpf: document.getElementById('pacienteCpf').value || undefined,
      telefone: document.getElementById('pacienteTelefone').value || undefined,
      email: document.getElementById('pacienteEmail').value || undefined,
      endereco: document.getElementById('pacienteEndereco').value || undefined,
      observacoes: document.getElementById('pacienteObs').value || undefined
    };
    if (!body.nome) return showToast('Informe o nome do paciente.', 'danger');

    await apiRequest('/pacientes', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalPacienteApi');
    showToast('Paciente salvo no banco!', 'success');
    await carregarPacientes();
    await carregarDashboard();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

async function abrirModalSessaoApi() {
  await carregarPacientesOptions('sessaoPacienteId');
  const data = new Date();
  data.setHours(data.getHours() + 1, 0, 0, 0);
  const local = new Date(data.getTime() - data.getTimezoneOffset() * 60000).toISOString().slice(0,16);
  const dt = document.getElementById('sessaoDataHora');
  if (dt) dt.value = local;
  openModal('modalSessaoApi');
}

async function salvarSessaoApi() {
  try {
    const pacienteId = document.getElementById('sessaoPacienteId').value;
    if (!pacienteId) return showToast('Selecione um paciente.', 'danger');

    const user = getUser();
    const body = {
      pacienteId: Number(pacienteId),
      psicologoId: user.id || undefined,
      dataHora: new Date(document.getElementById('sessaoDataHora').value).toISOString(),
      tipo: document.getElementById('sessaoTipo').value,
      status: document.getElementById('sessaoStatus').value,
      valor: Number(document.getElementById('sessaoValor').value || 0),
      observacoes: document.getElementById('sessaoObs').value || undefined
    };

    await apiRequest('/sessoes', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalSessaoApi');
    showToast('Sessão salva no banco!', 'success');
    await carregarAgenda();
    await carregarDashboard();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

async function abrirModalProntuarioApi() {
  await carregarPacientesOptions('prontuarioPacienteId');
  await carregarSessoesOptions('prontuarioSessaoId');
  openModal('modalProntuarioApi');
}

async function salvarProntuarioApi() {
  try {
    const pacienteId = document.getElementById('prontuarioPacienteId').value;
    const evolucao = document.getElementById('prontuarioEvolucao').value;
    if (!pacienteId || !evolucao) return showToast('Paciente e evolução são obrigatórios.', 'danger');

    const body = {
      pacienteId: Number(pacienteId),
      sessaoId: document.getElementById('prontuarioSessaoId').value ? Number(document.getElementById('prontuarioSessaoId').value) : null,
      anamnese: document.getElementById('prontuarioAnamnese').value || undefined,
      evolucao,
      observacoes: document.getElementById('prontuarioObs').value || undefined
    };

    await apiRequest('/prontuarios', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalProntuarioApi');
    showToast('Prontuário salvo no banco!', 'success');
    await carregarProntuarios();
    await carregarDashboard();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

async function abrirModalReceitaApi() {
  await carregarPacientesOptions('receitaPacienteId');
  openModal('modalReceitaApi');
}

async function salvarReceitaApi() {
  try {
    const body = {
      descricao: document.getElementById('receitaDescricao').value,
      valor: Number(document.getElementById('receitaValor').value || 0),
      formaPagamento: document.getElementById('receitaForma').value,
      pacienteId: document.getElementById('receitaPacienteId').value ? Number(document.getElementById('receitaPacienteId').value) : null,
      categoria: 'Receita Avulsa',
      status: 'PAGO'
    };
    await apiRequest('/financeiro/receitas', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalReceitaApi');
    showToast('Receita salva no banco!', 'success');
    await carregarFinanceiro();
    await carregarDashboard();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

async function salvarDespesaApi() {
  try {
    const body = {
      descricao: document.getElementById('despesaDescricao').value,
      valor: Number(document.getElementById('despesaValor').value || 0),
      categoria: document.getElementById('despesaCategoria').value,
      tipo: 'VARIAVEL',
      status: 'PAGO'
    };
    await apiRequest('/financeiro/despesas', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalDespesaApi');
    showToast('Despesa salva no banco!', 'success');
    await carregarFinanceiro();
    await carregarDashboard();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

async function salvarPlanoApi() {
  try {
    const body = {
      nome: document.getElementById('planoNome').value,
      quantidadeSessoes: Number(document.getElementById('planoQtd').value || 1),
      valor: Number(document.getElementById('planoValor').value || 0),
      descontoPercentual: Number(document.getElementById('planoDesconto').value || 0),
      descricao: document.getElementById('planoDescricao').value || undefined
    };
    await apiRequest('/planos', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalPlanoApi');
    showToast('Plano salvo no banco!', 'success');
    await carregarPlanos();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

async function salvarConvenioApi() {
  try {
    const body = {
      nome: document.getElementById('convenioNome').value,
      percentualCobertura: Number(document.getElementById('convenioCobertura').value || 0),
      percentualPaciente: Number(document.getElementById('convenioPaciente').value || 100),
      observacoes: document.getElementById('convenioObs').value || undefined
    };
    await apiRequest('/convenios', { method: 'POST', body: JSON.stringify(body) });
    closeModal('modalConvenioApi');
    showToast('Convênio salvo no banco!', 'success');
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

// Botões dinâmicos inseridos nas páginas existentes
function injetarBotoesApi() {
  const mapa = [
    ['#page-prontuario main > div:first-child', `<button class="btn-sm-custom btn-primary-sm" onclick="abrirModalProntuarioApi()"><i class="bi bi-plus-lg"></i> Novo prontuário</button>`],
    ['#page-financeiro main > div:first-child', `<div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="btn-sm-custom btn-primary-sm" onclick="abrirModalReceitaApi()"><i class="bi bi-plus-lg"></i> Nova receita</button><button class="btn-sm-custom btn-outline-sm" onclick="openModal('modalDespesaApi')"><i class="bi bi-plus-lg"></i> Nova despesa</button></div>`],
    ['#page-planos main > div:first-child', `<button class="btn-sm-custom btn-primary-sm" onclick="openModal('modalPlanoApi')"><i class="bi bi-plus-lg"></i> Novo plano</button>`],
    ['#page-relatorios main > div:first-child', `<button class="btn-sm-custom btn-outline-sm" onclick="carregarRelatorios();showToast('Relatórios atualizados com dados do banco.','success')"><i class="bi bi-arrow-clockwise"></i> Atualizar relatórios</button>`]
  ];

  mapa.forEach(([selector, html]) => {
    const el = document.querySelector(selector);
    if (el && !el.querySelector('.btn-api-injetado')) {
      const wrap = document.createElement('div');
      wrap.className = 'btn-api-injetado';
      wrap.innerHTML = html;
      el.appendChild(wrap);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(injetarBotoesApi, 500);
});

const showPageComBotoesApi = showPage;
showPage = function(pageId) {
  showPageComBotoesApi(pageId);
  setTimeout(injetarBotoesApi, 200);
};

async function excluirPacienteApi(id) {
  if (!confirm('Deseja realmente excluir este paciente?')) return;
  await apiRequest(`/pacientes/${id}`, { method: 'DELETE' });
  showToast('Paciente excluído.', 'success');
  await carregarPacientes();
}

async function excluirSessaoApi(id) {
  if (!confirm('Deseja realmente excluir esta sessão?')) return;
  await apiRequest(`/sessoes/${id}`, { method: 'DELETE' });
  showToast('Sessão excluída.', 'success');
  await carregarAgenda();
}

async function excluirProntuarioApi(id) {
  if (!confirm('Deseja realmente excluir este prontuário?')) return;
  await apiRequest(`/prontuarios/${id}`, { method: 'DELETE' });
  showToast('Prontuário excluído.', 'success');
  await carregarProntuarios();
}


// ───────────────────────────────────────────────────────────
// REMOÇÃO DE DADOS ESTÁTICOS / PERFIL REAL DO USUÁRIO
// ───────────────────────────────────────────────────────────
let pacienteSelecionadoId = null;
let cachePacientesApi = [];
let cacheSessoesApi = [];
let cacheProntuariosApi = [];

function atualizarInterfaceUsuarioLogado() {
  const user = getUser();
  if (!user || !user.nome) return;

  document.querySelectorAll('h1').forEach(h => {
    const txt = h.textContent || '';
    if (txt.includes('Bom dia') || txt.includes('Olá,')) {
      h.textContent = `${txt.includes('Bom dia') ? 'Bom dia' : 'Olá'}, ${user.nome} 👋`;
    }
  });

  document.querySelectorAll('option').forEach(opt => {
    if (/Ana|Mariana|Rafael|Fernanda|Carlos|Paulo|Luana|Aline|Bruno|Carla/i.test(opt.textContent)) {
      opt.remove();
    }
  });
}

function emptyState(colspan, msg) {
  return `<tr><td colspan="${colspan}" style="text-align:center;color:var(--text-3);padding:22px;">${msg}</td></tr>`;
}

function removerConteudoEstaticoVisivel() {
  // Limpa tabelas e listas que vinham preenchidas só para protótipo.
  const selectors = [
    '#page-dashboard-admin table tbody', '#page-dashboard-psi table tbody', '#page-dashboard-pac table tbody',
    '#page-agenda table tbody', '#page-pacientes table tbody', '#page-prontuario table tbody',
    '#page-financeiro table tbody', '#page-planos table tbody', '#page-documentos table tbody',
    '#page-auditoria table tbody'
  ];
  selectors.forEach(sel => {
    const tb = document.querySelector(sel);
    if (tb && /Ana|Mariana|Rafael|Fernanda|Carlos|Paulo|Luana|Aline/i.test(tb.textContent)) {
      tb.innerHTML = emptyState(7, 'Carregando dados do banco...');
    }
  });

  document.querySelectorAll('.evolution-item .evo-date, .evolution-item .evo-text').forEach(el => {
    if (/Ana|Mariana|sessão #|Paciente compareceu/i.test(el.textContent)) el.textContent = 'Carregando prontuários do banco...';
  });

  document.querySelectorAll('.cal-event').forEach(el => {
    if (/Ana|Mariana|Carlos|Paulo|Luana|Fernanda/i.test(el.textContent)) el.textContent = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const demo = document.querySelector('#page-login p');
  document.querySelectorAll('[onclick^="loginAs"]').forEach(btn => btn.remove());
  if (demo && demo.textContent.includes('demonstração')) demo.textContent = 'Use o e-mail e senha cadastrados no banco.';
  const token = getToken();
  if (token) {
    const u = getUser();
    currentRole = u.role === 'PSICOLOGO' ? 'psi' : u.role === 'PACIENTE' ? 'pac' : 'admin';
    atualizarInterfaceUsuarioLogado();
    removerConteudoEstaticoVisivel();
  }
});

// ───────────────────────────────────────────────────────────
// CORREÇÃO FINAL: remover protótipo estático das páginas gerais
// ───────────────────────────────────────────────────────────
function qsAll(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
function primeiroPorTexto(root, tag, texto){ return qsAll(tag, root).find(el => (el.textContent||'').trim().toLowerCase().includes(texto.toLowerCase())); }
function limparElementosComTextoEstatico(root=document){
  const termos = /Administrador Geral|admin@psicoflow|Paciente carregado do banco|Marcos Ribeiro|Marcos R\.|João P\.|Contrato_Paciente|Laudo_Psicologico|Relatorio_Faturamento|PacienteMendes|PacienteOliveira|Fevereiro 2025|Instituto PsicoFlow|Av\. Paulista|12\.345\.678|Ana Beatriz|Mariana Fonseca/i;
  qsAll('td, .cal-event, .evolution-item, .message-preview, .chat-bubble, .activity-item', root).forEach(el=>{
    if(termos.test(el.textContent||'')) el.textContent = '';
  });
}

function carregarConfiguracoesUsuario(){
  const user = getUser();
  const cfg = document.getElementById('cfg-perfil');
  if(!cfg || !user) return;
  const avatar = cfg.querySelector('div[style*="border-radius:50%"]');
  if(avatar) avatar.textContent = iniciais(user.nome || 'Usuário');
  const inputs = cfg.querySelectorAll('input');
  if(inputs[0]) inputs[0].value = user.nome || '';
  if(inputs[1]) inputs[1].value = user.email || '';
  if(inputs[2]) inputs[2].value = user.telefone || '';
  if(inputs[3]) inputs[3].value = getCurrentUserInfo().role || '';

  const clinica = document.getElementById('cfg-clinica');
  if(clinica){
    clinica.querySelectorAll('input').forEach(input => { input.value = ''; input.placeholder = 'Configure este dado no backend/banco'; });
  }
}

function carregarDocumentosReais(){
  const page = document.getElementById('page-documentos');
  if(!page) return;
  page.querySelectorAll('.card-custom').forEach(card=>{
    const txt = card.textContent || '';
    if(/arquivos/i.test(txt)){
      const smalls = card.querySelectorAll('div, span, p');
      smalls.forEach(el=>{ if(/\d+\s+arquivos/i.test(el.textContent||'')) el.textContent = '0 arquivos'; });
    }
  });
  const tbody = page.querySelector('table tbody');
  if(tbody) tbody.innerHTML = emptyState(6, 'Nenhum documento cadastrado no banco para este usuário.');
}

function carregarComunicacaoReal(){
  const page = document.getElementById('page-comunicacao');
  if(!page) return;
  const cards = page.querySelectorAll('.card-custom');
  if(cards[0]) cards[0].innerHTML = '<h2 style="font-size:1rem;font-weight:700;margin-bottom:16px;">Caixa de entrada</h2><div style="color:var(--text-3);font-size:.9rem;padding:18px;text-align:center;">Nenhuma mensagem cadastrada no banco.</div>';
  if(cards[1]) cards[1].innerHTML = '<div style="height:100%;min-height:360px;display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:.9rem;text-align:center;">As conversas aparecerão aqui quando existirem mensagens reais no backend.</div>';
}

function montarCalendarioAtual(sessoes=[]){
  const page = document.getElementById('page-agenda');
  if(!page) return;
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const titulo = page.querySelector('.card-custom h2');
  if(titulo) titulo.textContent = hoje.toLocaleDateString('pt-BR', {month:'long', year:'numeric'}).replace(/^./, c=>c.toUpperCase());

  const grid = page.querySelector('#agenda-view-mes .cal-grid');
  if(grid){
    const headers = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d=>`<div class="cal-day-header">${d}</div>`).join('');
    const primeiro = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const inicioSemana = primeiro.getDay();
    let html = headers;
    for(let i=0;i<inicioSemana;i++) html += '<div class="cal-day other-month"><div class="day-num"></div></div>';
    for(let dia=1; dia<=ultimoDia; dia++){
      const eventos = sessoes.filter(s=>{ const d=new Date(s.dataHora); return d.getFullYear()===ano && d.getMonth()===mes && d.getDate()===dia; });
      html += `<div class="cal-day ${dia===hoje.getDate()?'today':''}"><div class="day-num">${dia}</div>${eventos.map(s=>`<div class="cal-event blue">${new Date(s.dataHora).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})} ${s.paciente?.nome || 'Paciente'}</div>`).join('')}</div>`;
    }
    grid.innerHTML = html;
  }

  const sem = page.querySelector('#agenda-view-sem');
  if(sem){
    const proximas = sessoes.slice(0,10);
    sem.innerHTML = `<p style="color:var(--text-3);font-size:.9rem;">Vista semanal carregada do banco.</p>` + (proximas.length ? proximas.map(s=>`<div class="card-custom" style="padding:10px 12px;margin-bottom:8px;"><strong>${formatarDataHora(s.dataHora)}</strong> — ${s.paciente?.nome || 'Paciente'} · ${s.tipo || 'Sessão'}</div>`).join('') : '<div style="color:var(--text-3);padding:18px;text-align:center;">Nenhuma sessão cadastrada.</div>');
  }
  const dia = page.querySelector('#agenda-view-dia');
  if(dia){
    const deHoje = sessoes.filter(s=>{ const d=new Date(s.dataHora); return d.toDateString()===hoje.toDateString(); });
    dia.innerHTML = `<h3 style="font-size:.9rem;font-weight:700;margin-bottom:16px;">${hoje.toLocaleDateString('pt-BR', {weekday:'long', day:'2-digit', month:'long', year:'numeric'})}</h3>` + (deHoje.length ? deHoje.map(s=>`<div class="card-custom" style="padding:10px 12px;margin-bottom:8px;"><strong>${new Date(s.dataHora).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</strong> — ${s.paciente?.nome || 'Paciente'} · ${s.status || ''}</div>`).join('') : '<div style="color:var(--text-3);padding:18px;text-align:center;">Nenhuma consulta para hoje.</div>');
  }
}

async function carregarAgendaCorrigida(){
  const sessoes = await apiRequest('/sessoes').catch(()=>[]);
  cacheSessoesApi = sessoes;
  montarCalendarioAtual(sessoes);
  const selects = document.querySelectorAll('#page-agenda select');
  selects.forEach(sel=>{ sel.innerHTML = '<option>Dados filtrados pelo usuário logado</option>'; });
}

function limparDashboardsEstaticos(){
  ['#page-dashboard-admin', '#page-dashboard-psi', '#page-dashboard-pac'].forEach(sel=>{
    const page = document.querySelector(sel);
    if(!page) return;
    page.querySelectorAll('table tbody').forEach(tb=>{ tb.innerHTML = emptyState(5, 'Dados carregados do banco.'); });
    limparElementosComTextoEstatico(page);
  });
}

async function carregarPlanosCorrigido(){
  const page = document.getElementById('page-planos');
  if(!page) return;
  let planos=[];
  try { planos = await apiRequest('/planos'); } catch {}
  const tbody = page.querySelector('table tbody');
  if(tbody) tbody.innerHTML = emptyState(6, planos.length ? 'Use os cards acima para ver os planos cadastrados.' : 'Nenhum plano cadastrado no banco.');
  if(planos.length) await carregarPlanos();
}

const carregarDadosDaPaginaOriginalFinal = carregarDadosDaPagina;
carregarDadosDaPagina = async function(pageId){
  await carregarDadosDaPaginaOriginalFinal(pageId).catch(()=>{});
  if(pageId === 'page-agenda') await carregarAgendaCorrigida();
  if(pageId === 'page-documentos') carregarDocumentosReais();
  if(pageId === 'page-comunicacao') carregarComunicacaoReal();
  if(pageId === 'page-configuracoes') carregarConfiguracoesUsuario();
  if(pageId === 'page-planos') await carregarPlanosCorrigido();
  limparDashboardsEstaticos();
  limparElementosComTextoEstatico(document.getElementById(pageId) || document);
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof removerConteudoEstaticoVisivel === 'function') removerConteudoEstaticoVisivel();
  }, 100);
  setTimeout(() => {
    limparElementosComTextoEstatico();
    carregarConfiguracoesUsuario();
    if(getToken()) carregarDadosDaPagina(currentPage);
  }, 700);
});

// ───────────────────────────────────────────────────────────
// MÓDULOS COMPLETOS: todas as páginas com dados reais da API
// ───────────────────────────────────────────────────────────
function pfMoney(v){ return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
function pfDate(v){ return v ? new Date(v).toLocaleDateString('pt-BR') : '-'; }
function pfDateTime(v){ return v ? new Date(v).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'}) : '-'; }
function pfSafe(v){ return (v ?? '').toString().replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function pfTable(headers, rows, empty='Nenhum dado cadastrado no banco.'){ return `<table class="table-custom"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${headers.length}" style="text-align:center;color:var(--text-3);padding:24px;">${empty}</td></tr>`}</tbody></table>`; }
function pfCard(title, body){ return `<div class="card-custom" style="padding:20px;margin-bottom:16px;"><h2 style="font-size:1rem;font-weight:700;margin-bottom:16px;">${title}</h2>${body}</div>`; }

async function pfLoadDocumentos(){
  const page=document.getElementById('page-documentos'); if(!page) return;
  const docs=await apiRequest('/documentos').catch(()=>[]);
  const grupos={CONTRATO:0,LAUDO:0,RELATORIO:0,RECIBO:0,OUTRO:0}; docs.forEach(d=>grupos[d.tipo]=(grupos[d.tipo]||0)+1);
  page.innerHTML = `<div class="page-header"><h1>Módulo de Documentos</h1><div style="display:flex;gap:8px;"><button class="btn-custom btn-outline-custom" onclick="showToast('Funcionalidade conectada ao backend. Use POST /api/documentos para cadastrar.','success')"><i class="bi bi-folder-plus"></i> Nova pasta</button><button class="btn-custom btn-primary-custom" onclick="showToast('Documento deve ser cadastrado pelo endpoint /api/documentos.','success')"><i class="bi bi-plus"></i> Novo documento</button></div></div>
  <div class="stats-grid" style="margin-bottom:20px;">${['CONTRATO','LAUDO','RELATORIO','RECIBO'].map(t=>`<div class="stat-card"><div class="stat-icon"><i class="bi bi-file-earmark-text"></i></div><div class="stat-title">${t}</div><div class="stat-value">${grupos[t]||0}</div></div>`).join('')}</div>
  ${pfCard('Documentos Recentes', pfTable(['Nome','Tipo','Paciente','Data','Tamanho'], docs.map(d=>`<tr><td>${pfSafe(d.titulo)}</td><td><span class="badge-custom badge-primary">${d.tipo}</span></td><td>${pfSafe(d.paciente?.nome || '— Clínica —')}</td><td>${pfDate(d.createdAt)}</td><td>${d.tamanhoKb?d.tamanhoKb+' KB':'-'}</td></tr>`)))}`;
}

async function pfLoadComunicacao(){
  const page=document.getElementById('page-comunicacao'); if(!page) return;
  const msgs=await apiRequest('/comunicacao').catch(()=>[]); const me=getUser();
  page.innerHTML = `<div class="page-header"><h1>Central de Comunicação</h1><button class="btn-custom btn-primary-custom" onclick="showToast('Envie mensagens pelo endpoint POST /api/comunicacao.','success')"><i class="bi bi-plus"></i> Nova mensagem</button></div>
  <div style="display:grid;grid-template-columns:340px 1fr;gap:16px;">${pfCard('Caixa de entrada', msgs.length?msgs.map(m=>`<div style="padding:12px;border-bottom:1px solid var(--border);"><strong>${pfSafe(m.remetenteId===me.id?m.destinatario?.nome:m.remetente?.nome)}</strong><div style="font-size:.8rem;color:var(--text-3);">${pfDateTime(m.createdAt)}</div><p style="font-size:.88rem;margin:6px 0 0;">${pfSafe(m.conteudo)}</p></div>`).join(''):'<div style="text-align:center;color:var(--text-3);padding:20px;">Nenhuma mensagem no banco.</div>')}
  ${pfCard('Conversa', msgs[0]?msgs.slice(0,8).reverse().map(m=>`<div style="display:flex;justify-content:${m.remetenteId===me.id?'flex-end':'flex-start'};margin:8px 0;"><div style="max-width:70%;padding:10px 14px;border-radius:12px;background:${m.remetenteId===me.id?'var(--primary)':'var(--bg)'};color:${m.remetenteId===me.id?'white':'var(--text-1)'};">${pfSafe(m.conteudo)}<div style="font-size:.7rem;opacity:.7;margin-top:4px;">${pfDateTime(m.createdAt)}</div></div></div>`).join(''):'<div style="text-align:center;color:var(--text-3);padding:80px 20px;">As conversas reais aparecerão aqui.</div>')}</div>`;
}

async function pfLoadTarefas(){
  const page=document.getElementById('page-tarefas'); if(!page) return;
  const tarefas=await apiRequest('/tarefas').catch(()=>[]);
  page.innerHTML = `<div class="page-header"><h1>Módulo de Tarefas</h1><button class="btn-custom btn-primary-custom" onclick="showToast('Crie tarefas pelo endpoint POST /api/tarefas.','success')"><i class="bi bi-plus"></i> Nova tarefa</button></div>
  ${pfCard('Tarefas cadastradas', pfTable(['Tarefa','Paciente','Responsável','Prioridade','Status','Prazo'], tarefas.map(t=>`<tr><td>${pfSafe(t.titulo)}<div style="font-size:.75rem;color:var(--text-3);">${pfSafe(t.descricao||'')}</div></td><td>${pfSafe(t.paciente?.nome||'-')}</td><td>${pfSafe(t.responsavel?.nome||'-')}</td><td>${t.prioridade}</td><td><span class="badge-custom badge-primary">${t.status}</span></td><td>${pfDate(t.prazo)}</td></tr>`)))}`;
}

async function pfLoadSalas(){
  const page=document.getElementById('page-salas'); if(!page) return;
  const espacos=await apiRequest('/espacos').catch(()=>[]);
  page.innerHTML = `<div class="page-header"><h1>Gestão de Espaços</h1><button class="btn-custom btn-primary-custom" onclick="showToast('Cadastre salas pelo endpoint POST /api/espacos.','success')"><i class="bi bi-plus"></i> Nova sala</button></div>
  ${pfCard('Salas e recursos', pfTable(['Sala','Capacidade','Recursos','Status','Reservas'], espacos.map(e=>`<tr><td>${pfSafe(e.nome)}<div style="font-size:.75rem;color:var(--text-3);">${pfSafe(e.descricao||'')}</div></td><td>${e.capacidade||'-'}</td><td>${pfSafe(e.recursos||'-')}</td><td>${e.status}</td><td>${e.reservas?.length||0}</td></tr>`)))}`;
}

async function pfLoadConfiguracoes(){
  carregarConfiguracoesUsuario();
  const clinica=await apiRequest('/configuracoes/clinica').catch(()=>null);
  const box=document.getElementById('cfg-clinica');
  if(box && clinica){
    const inputs=box.querySelectorAll('input');
    if(inputs[0]) inputs[0].value=clinica.nome||'';
    if(inputs[1]) inputs[1].value=clinica.cnpj||'';
    if(inputs[2]) inputs[2].value=clinica.telefone||'';
    if(inputs[3]) inputs[3].value=clinica.email||'';
  }
}

async function pfLoadRelatorios(){
  const page=document.getElementById('page-relatorios'); if(!page) return;
  const r=await apiRequest('/relatorios/completo').catch(()=>null); if(!r) return;
  page.innerHTML=`<div class="page-header"><h1>Relatórios e Dashboards</h1><button class="btn-custom btn-outline-custom" onclick="window.print()"><i class="bi bi-filetype-pdf"></i> Exportar PDF</button></div>
  <div class="stats-grid"><div class="stat-card"><div class="stat-title">Receita total</div><div class="stat-value">${pfMoney(r.financeiro.receitaTotal)}</div></div><div class="stat-card"><div class="stat-title">Despesas</div><div class="stat-value">${pfMoney(r.financeiro.despesaTotal)}</div></div><div class="stat-card"><div class="stat-title">Atendimentos</div><div class="stat-value">${r.operacional.sessoesRealizadas}</div></div><div class="stat-card"><div class="stat-title">Sem prontuário</div><div class="stat-value">${r.clinico.sessoesSemProntuario}</div></div></div>
  ${pfCard('Resumo operacional', pfTable(['Indicador','Valor'], Object.entries({...r.financeiro,...r.operacional,...r.clinico}).map(([k,v])=>`<tr><td>${k}</td><td>${typeof v==='number'?v:pfSafe(v)}</td></tr>`)))}`;
}

const pfOldLoader = carregarDadosDaPagina;
carregarDadosDaPagina = async function(pageId){
  await pfOldLoader(pageId).catch(()=>{});
  if(pageId==='page-documentos') await pfLoadDocumentos();
  if(pageId==='page-comunicacao') await pfLoadComunicacao();
  if(pageId==='page-tarefas') await pfLoadTarefas();
  if(pageId==='page-salas') await pfLoadSalas();
  if(pageId==='page-configuracoes') await pfLoadConfiguracoes();
  if(pageId==='page-relatorios') await pfLoadRelatorios();
};

// ───────────────────────────────────────────────────────────
// HOTFIX DEFINITIVO DE LAYOUT + PÁGINAS DINÂMICAS
// Nunca substitua a div .page inteira, apenas o <main>, para não quebrar
// sidebar, topbar e CSS do app-shell.
// ───────────────────────────────────────────────────────────
function pfMain(pageId){
  const page = document.getElementById(pageId);
  if(!page) return null;
  return page.querySelector('main.main-content') || page.querySelector('main') || page;
}
function pfBadge(status){
  const s = String(status || '').toUpperCase();
  const cls = s.includes('PAGO') || s.includes('CONFIRM') || s.includes('REALIZ') || s.includes('ATIVO') || s.includes('CONCLUID') ? 'badge-success' :
              s.includes('CANCEL') || s.includes('INATIVO') ? 'badge-danger' : 'badge-warning';
  return `<span class="badge-custom ${cls}">${pfSafe(status || '-')}</span>`;
}
function pfHeader(title, actions=''){
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px;"><h1 style="font-size:1.25rem;font-weight:700;margin:0;">${title}</h1><div style="display:flex;gap:8px;flex-wrap:wrap;">${actions}</div></div>`;
}
function pfEmpty(msg='Nenhum dado cadastrado no banco.'){
  return `<div class="card-custom" style="padding:28px;text-align:center;color:var(--text-3);">${msg}</div>`;
}
function pfActionToast(endpoint){
  showToast(`Funcionalidade conectada ao backend. Use ${endpoint}.`, 'success');
}
async function pfGet(path, fallback=[]){
  try { return await apiRequest(path); } catch(e){ console.warn('API falhou:', path, e); return fallback; }
}

async function pfRenderDocumentos(){
  const main = pfMain('page-documentos'); if(!main) return;
  const docs = await pfGet('/documentos', []);
  const grupos = { CONTRATO:0, LAUDO:0, RELATORIO:0, RECIBO:0 };
  docs.forEach(d => { const t = String(d.tipo || 'OUTRO').toUpperCase(); if(grupos[t] !== undefined) grupos[t]++; });
  main.innerHTML = pfHeader('Módulo de Documentos',
    `<button class="btn-sm-custom btn-outline-sm" onclick="pfActionToast('POST /api/documentos')"><i class="bi bi-folder-plus"></i> Nova pasta</button><button class="btn-sm-custom btn-primary-sm" onclick="pfActionToast('POST /api/documentos')"><i class="bi bi-plus-lg"></i> Novo documento</button>`
  ) + `<div class="row g-3 mb-4">${Object.entries(grupos).map(([tipo,total]) => `<div class="col-md-3"><div class="card-custom" style="text-align:center;padding:16px;"><i class="bi bi-file-earmark-text" style="font-size:2rem;color:var(--primary);display:block;margin-bottom:8px;"></i><div style="font-weight:600;font-size:.9rem;">${tipo}</div><div style="font-size:1.4rem;font-weight:700;color:var(--text-1);">${total}</div></div></div>`).join('')}</div>` +
  pfCard('Documentos Recentes', pfTable(['Nome','Tipo','Paciente','Data','Tamanho'], docs.map(d => `<tr><td>${pfSafe(d.titulo)}</td><td>${pfBadge(d.tipo)}</td><td>${pfSafe(d.paciente?.nome || '— Clínica —')}</td><td>${pfDate(d.createdAt)}</td><td>${d.tamanhoKb ? d.tamanhoKb + ' KB' : '-'}</td></tr>`), 'Nenhum documento cadastrado no banco para este usuário.'));
}

async function pfRenderComunicacao(){
  const main = pfMain('page-comunicacao'); if(!main) return;
  const msgs = await pfGet('/comunicacao', []);
  const me = getUser();
  const lista = msgs.length ? msgs.map(m => {
    const outro = m.remetenteId === me.id ? m.destinatario : m.remetente;
    return `<div style="padding:12px;border-bottom:1px solid var(--border);"><div style="font-weight:700;color:var(--text-1);">${pfSafe(outro?.nome || 'Usuário')}</div><div style="font-size:.75rem;color:var(--text-3);">${pfDateTime(m.createdAt)}</div><div style="font-size:.88rem;color:var(--text-2);margin-top:5px;">${pfSafe(m.conteudo)}</div></div>`;
  }).join('') : '<div style="text-align:center;color:var(--text-3);padding:28px;">Nenhuma mensagem cadastrada no banco.</div>';
  const conversa = msgs.length ? msgs.slice().reverse().slice(0,12).map(m => {
    const mine = m.remetenteId === me.id;
    return `<div style="display:flex;justify-content:${mine?'flex-end':'flex-start'};margin:8px 0;"><div style="max-width:75%;padding:10px 14px;border-radius:12px;background:${mine?'var(--primary)':'var(--bg)'};color:${mine?'#fff':'var(--text-1)'};">${pfSafe(m.conteudo)}<div style="font-size:.7rem;opacity:.75;margin-top:4px;">${pfDateTime(m.createdAt)}</div></div></div>`;
  }).join('') : '<div style="height:330px;display:flex;align-items:center;justify-content:center;color:var(--text-3);text-align:center;">As conversas reais aparecerão aqui quando existirem mensagens no backend.</div>';
  main.innerHTML = pfHeader('Central de Comunicação', `<button class="btn-sm-custom btn-primary-sm" onclick="pfActionToast('POST /api/comunicacao')"><i class="bi bi-plus-lg"></i> Nova mensagem</button>`) +
    `<div class="row g-3"><div class="col-lg-4">${pfCard('Caixa de entrada', lista)}</div><div class="col-lg-8">${pfCard('Conversa', conversa + '<div style="display:flex;gap:8px;margin-top:16px;"><input class="form-control" placeholder="Escreva uma mensagem..." disabled><button class="btn-sm-custom btn-primary-sm" onclick="pfActionToast(\'POST /api/comunicacao\')"><i class="bi bi-send-fill"></i></button></div>')}</div></div>`;
}

async function pfRenderTarefas(){
  const main = pfMain('page-tarefas'); if(!main) return;
  const tarefas = await pfGet('/tarefas', []);
  main.innerHTML = pfHeader('Módulo de Tarefas', `<button class="btn-sm-custom btn-primary-sm" onclick="pfActionToast('POST /api/tarefas')"><i class="bi bi-plus-lg"></i> Nova tarefa</button>`) +
    pfCard('Tarefas cadastradas', pfTable(['Tarefa','Paciente','Responsável','Prioridade','Status','Prazo'], tarefas.map(t => `<tr><td>${pfSafe(t.titulo)}<div style="font-size:.75rem;color:var(--text-3);">${pfSafe(t.descricao || '')}</div></td><td>${pfSafe(t.paciente?.nome || '-')}</td><td>${pfSafe(t.responsavel?.nome || '-')}</td><td>${pfSafe(t.prioridade)}</td><td>${pfBadge(t.status)}</td><td>${pfDate(t.prazo)}</td></tr>`)));
}

async function pfRenderSalas(){
  const main = pfMain('page-salas'); if(!main) return;
  const espacos = await pfGet('/espacos', []);
  main.innerHTML = pfHeader('Gestão de Espaços', `<button class="btn-sm-custom btn-primary-sm" onclick="pfActionToast('POST /api/espacos')"><i class="bi bi-plus-lg"></i> Nova sala</button>`) +
    pfCard('Salas e recursos', pfTable(['Sala','Capacidade','Recursos','Status','Reservas'], espacos.map(e => `<tr><td>${pfSafe(e.nome)}<div style="font-size:.75rem;color:var(--text-3);">${pfSafe(e.descricao || '')}</div></td><td>${e.capacidade || '-'}</td><td>${pfSafe(e.recursos || '-')}</td><td>${pfBadge(e.status)}</td><td>${e.reservas?.length || 0}</td></tr>`)));
}

async function pfRenderRelatorios(){
  const main = pfMain('page-relatorios'); if(!main) return;
  const r = await pfGet('/relatorios/completo', null);
  if(!r){ main.innerHTML = pfHeader('Relatórios e Dashboards') + pfEmpty('Nenhum relatório retornado pela API.'); return; }
  main.innerHTML = pfHeader('Relatórios e Dashboards', `<button class="btn-sm-custom btn-outline-sm" onclick="window.print()"><i class="bi bi-filetype-pdf"></i> Exportar PDF</button>`) +
    `<div class="row g-3 mb-4"><div class="col-md-3"><div class="card-custom"><div class="stat-title">Receita total</div><div class="stat-value">${pfMoney(r.financeiro?.receitaTotal)}</div></div></div><div class="col-md-3"><div class="card-custom"><div class="stat-title">Despesas</div><div class="stat-value">${pfMoney(r.financeiro?.despesaTotal)}</div></div></div><div class="col-md-3"><div class="card-custom"><div class="stat-title">Atendimentos</div><div class="stat-value">${r.operacional?.sessoesRealizadas || 0}</div></div></div><div class="col-md-3"><div class="card-custom"><div class="stat-title">Sem prontuário</div><div class="stat-value">${r.clinico?.sessoesSemProntuario || 0}</div></div></div></div>` +
    pfCard('Resumo completo', pfTable(['Indicador','Valor'], Object.entries({...(r.financeiro||{}), ...(r.operacional||{}), ...(r.clinico||{})}).map(([k,v]) => `<tr><td>${pfSafe(k)}</td><td>${typeof v === 'number' ? v : pfSafe(v)}</td></tr>`)));
}

async function pfRenderConfiguracoes(){
  const main = pfMain('page-configuracoes');
  if(!main) return;
  const u = getUser();
  const clinica = await pfGet('/configuracoes/clinica', {});
  main.innerHTML = pfHeader('Configurações do Sistema') + `<div class="card-custom" style="padding:20px;"><h2 style="font-size:1rem;font-weight:700;margin-bottom:18px;">Perfil do Usuário</h2><div class="row g-3"><div class="col-md-6"><label class="form-label">Nome completo</label><input class="form-control" value="${pfSafe(u.nome || '')}" readonly></div><div class="col-md-6"><label class="form-label">E-mail</label><input class="form-control" value="${pfSafe(u.email || '')}" readonly></div><div class="col-md-6"><label class="form-label">Função / Cargo</label><input class="form-control" value="${pfSafe(getCurrentUserInfo().role)}" readonly></div></div></div>` +
    `<div class="card-custom" style="padding:20px;margin-top:16px;"><h2 style="font-size:1rem;font-weight:700;margin-bottom:18px;">Dados da Clínica</h2><div class="row g-3"><div class="col-md-6"><label class="form-label">Nome da clínica</label><input class="form-control" value="${pfSafe(clinica?.nome || '')}" readonly></div><div class="col-md-6"><label class="form-label">CNPJ</label><input class="form-control" value="${pfSafe(clinica?.cnpj || '')}" readonly></div><div class="col-md-6"><label class="form-label">Telefone</label><input class="form-control" value="${pfSafe(clinica?.telefone || '')}" readonly></div><div class="col-md-6"><label class="form-label">E-mail</label><input class="form-control" value="${pfSafe(clinica?.email || '')}" readonly></div><div class="col-12"><label class="form-label">Endereço</label><input class="form-control" value="${pfSafe(clinica?.endereco || '')}" readonly></div></div></div>`;
}

async function pfRenderPlanos(){
  const main = pfMain('page-planos'); if(!main) return;
  const planos = await pfGet('/planos', []);
  const pacientes = await pfGet('/planos/pacientes', []);
  main.innerHTML = pfHeader('Planos por Cliente', `<button class="btn-sm-custom btn-primary-sm" onclick="pfActionToast('POST /api/planos')"><i class="bi bi-plus-lg"></i> Novo plano</button>`) +
    `<div class="row g-3 mb-4">${planos.length ? planos.map(p => `<div class="col-md-4"><div class="card-custom"><h2 style="font-size:1rem;font-weight:700;">${pfSafe(p.nome)}</h2><div style="font-size:1.5rem;font-weight:800;color:var(--primary);">${pfMoney(p.valor)}</div><div style="color:var(--text-3);font-size:.85rem;">${p.quantidadeSessoes} sessões · ${p.descontoPercentual || 0}% desconto</div><p style="margin-top:10px;color:var(--text-2);font-size:.86rem;">${pfSafe(p.descricao || '')}</p></div></div>`).join('') : '<div class="col-12">'+pfEmpty('Nenhum plano cadastrado no banco.')+'</div>'}</div>` +
    pfCard('Pacientes por Plano', pfTable(['Paciente','Plano','Sessões usadas','Restantes','Validade','Status'], pacientes.map(pp => `<tr><td>${pfSafe(pp.paciente?.nome || '-')}</td><td>${pfSafe(pp.plano?.nome || '-')}</td><td>${pp.sessoesUtilizadas} / ${pp.sessoesContratadas}</td><td>${Math.max((pp.sessoesContratadas||0)-(pp.sessoesUtilizadas||0),0)}</td><td>${pfDate(pp.dataFim)}</td><td>${pfBadge(pp.status)}</td></tr>`)));
}

const pfLoaderBackendOriginal = carregarDadosDaPagina;
carregarDadosDaPagina = async function(pageId){
  if(!getToken()) return;
  const direct = {
    'page-documentos': pfRenderDocumentos,
    'page-comunicacao': pfRenderComunicacao,
    'page-tarefas': pfRenderTarefas,
    'page-salas': pfRenderSalas,
    'page-relatorios': pfRenderRelatorios,
    'page-configuracoes': pfRenderConfiguracoes,
    'page-planos': pfRenderPlanos
  };
  if(direct[pageId]) { await direct[pageId](); return; }
  await pfLoaderBackendOriginal(pageId).catch(e => console.warn('Loader antigo falhou:', e));
  limparElementosComTextoEstatico(document.getElementById(pageId) || document);
};
