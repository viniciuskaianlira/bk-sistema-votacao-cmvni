// Mapeamento de itens de menu por role, incluindo ícones Font Awesome
export const MENU_MAP = {
  vereador: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'fas fa-tachometer-alt'
    },
    { label: 'Ato', path: '/ato', icon: 'fas fa-file-alt' },
    { label: 'Indicações', path: '/indicacoes', icon: 'fas fa-lightbulb' },
    { label: 'Projetos', path: '/projetos', icon: 'fas fa-project-diagram' },
    { label: 'Sessões', path: '/sessoes', icon: 'fas fa-calendar-check' }
  ],
  admin: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'fas fa-tachometer-alt'
    },
    { label: 'Cargo', path: '/cargos', icon: 'fas fa-id-badge' },
    { label: 'Histórico de Protocolos', path: '/historico-protocolos', icon: 'fas fa-history' },
    { label: 'Legislatura', path: '/legislaturas', icon: 'fas fa-landmark' },
    { label: 'Mesa Diretora', path: '/mesadiretora', icon: 'fas fa-table' },
    { label: 'Ofícios Recebidos', path: '/oficios-recebidos', icon: 'fas fa-inbox' },
    { label: 'Ofícios', path: '/oficios', icon: 'fas fa-file-signature' },
    { label: 'Presença Sessões', path: '/presenca-sessoes', icon: 'fas fa-user-check' },
    { label: 'Protocolos', path: '/protocolos', icon: 'fas fa-file-contract' },
    
    { label: 'Vereadores', path: '/vereadores', icon: 'fas fa-users' },
    {
      label: 'Configurações',
      icon: 'fas fa-cogs',
      // em vez de path:[], definimos submenu:
      children: [
        {
          label: 'Usuários',
          path: '/configuracoes/usuarios',
          icon: 'fas fa-user'
        },
        {
          label: 'Permissões',
          path: '/configuracoes/permissoes',
          icon: 'fas fa-key'
        },
        {
          label: 'Preferências',
          path: '/configuracoes/preferencias',
          icon: 'fas fa-sliders-h'
        },
        { label: 'Tipo de Ato', path: '/tipos-ato', icon: 'fas fa-tags' },
        { label: 'Tipo de Projetos', path: '/tipos-projetos', icon: 'fas fa-tags' },
      ]
    }
  ],
  servidor: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'fas fa-tachometer-alt'
    },
    {
      label: 'Configurações',
      icon: 'fas fa-cogs',
      // em vez de path:[], definimos submenu:
      children: [
        {
          label: 'Preferências',
          path: '/configuracoes/preferencias',
          icon: 'fas fa-sliders-h'
        }
      ]
    }
  ]
};