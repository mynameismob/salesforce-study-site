/*
 * Main JavaScript for Salesforce Study Portal
 *
 * This script handles the interactive behaviour of the site: toggling
 * the mobile navigation menu, expanding/collapsing FAQ answers and
 * running simple multiple‑choice quizzes for the exercises section.
 */

// Static search index for site content.
// Each entry represents a section of the study plan and contains
// keywords to match against search queries. When a user searches,
// the site filters these entries and navigates to the appropriate
// section. Feel free to expand this list with more keywords and
// links as new pages and topics are added.
const searchData = [
  { title: 'Sales Cloud – Nível Iniciante', keywords: 'sales cloud iniciante leads oportunidades contas contatos pipeline', url: 'sales-cloud.html#nivel-iniciante' },
  { title: 'Sales Cloud – Nível Intermediário', keywords: 'sales cloud intermediário automação relatórios dashboards flow builder master-detail lookup', url: 'sales-cloud.html#nivel-intermediario' },
  { title: 'Sales Cloud – Nível Avançado', keywords: 'sales cloud avançado apex triggers callouts batch apex integração ERP', url: 'sales-cloud.html#nivel-avancado' },
  { title: 'Sales Cloud – Nível Especialista', keywords: 'sales cloud especialista consultant territory management segurança release management governance', url: 'sales-cloud.html#nivel-especialista' },
  { title: 'Service Cloud – Nível Iniciante', keywords: 'service cloud iniciante cases email-to-case web-to-case entitlements milestones console', url: 'service-cloud.html#nivel-iniciante' },
  { title: 'Service Cloud – Nível Intermediário', keywords: 'service cloud intermediário macros omni-channel knowledge reports dashboard', url: 'service-cloud.html#nivel-intermediario' },
  { title: 'Service Cloud – Nível Avançado', keywords: 'service cloud avançado einstein case classification einstein bots flows avançados', url: 'service-cloud.html#nivel-avancado' },
  { title: 'Service Cloud – Nível Especialista', keywords: 'service cloud especialista contact center architecture compliance shield event monitoring cti', url: 'service-cloud.html#nivel-especialista' },
  { title: 'Marketing Cloud – Nível Iniciante', keywords: 'marketing cloud iniciante email studio data extensions send classifications', url: 'marketing-cloud.html#nivel-iniciante' },
  { title: 'Marketing Cloud – Nível Intermediário', keywords: 'marketing cloud intermediário automation studio journey builder ampscript', url: 'marketing-cloud.html#nivel-intermediario' },
  { title: 'Marketing Cloud – Nível Avançado', keywords: 'marketing cloud avançado ssjs api rest deliverability', url: 'marketing-cloud.html#nivel-avancado' },
  { title: 'Marketing Cloud – Nível Especialista', keywords: 'marketing cloud especialista omnichannel ads einstein recommendations', url: 'marketing-cloud.html#nivel-especialista' },
  { title: 'Financial Services Cloud – Nível Iniciante', keywords: 'financial services cloud iniciante household person account financial account financial goal path', url: 'financial-services-cloud.html#nivel-iniciante' },
  { title: 'Financial Services Cloud – Nível Intermediário', keywords: 'financial services cloud intermediário encryption masking reports dashboards advisor productivity', url: 'financial-services-cloud.html#nivel-intermediario' },
  { title: 'Financial Services Cloud – Nível Avançado', keywords: 'financial services cloud avançado lwc d3 batch apex streaming api', url: 'financial-services-cloud.html#nivel-avancado' },
  { title: 'Financial Services Cloud – Nível Especialista', keywords: 'financial services cloud especialista multi-org data residency disaster recovery', url: 'financial-services-cloud.html#nivel-especialista' },
  { title: 'Fundamentos e Integrações – Nível Iniciante', keywords: 'integrações iniciante plataforma fundamentos arquitetura multi-tenant objetos segurança', url: 'integrations.html#nivel-iniciante' },
  { title: 'Fundamentos e Integrações – Nível Intermediário', keywords: 'integrações intermediário data modeling flows relatórios dashboards data loader import', url: 'integrations.html#nivel-intermediario' },
  { title: 'Fundamentos e Integrações – Nível Avançado', keywords: 'integrações avançado apex triggers api callouts devops test coverage', url: 'integrations.html#nivel-avancado' },
  { title: 'Fundamentos e Integrações – Nível Especialista', keywords: 'integrações especialista multi-org patterns ci cd governance compliance shield', url: 'integrations.html#nivel-especialista' },
  { title: 'Trilhas de Aprendizagem', keywords: 'trilhas administrador desenvolvedor consultor marketing gerente projetos arquiteto perfil certificações', url: 'trilhas.html' },
  { title: 'Certificações Salesforce', keywords: 'certificações salesforce preparation admin developer consultant marketing architect', url: 'certificacoes.html' },
  { title: 'Recursos e Ferramentas', keywords: 'trailhead trailblazer resources app exchange vscode community', url: 'recursos.html' }
];

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.navbar .menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('show');
      hamburger.classList.toggle('open');
    });
  }

  // FAQ toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      q.classList.toggle('open');
      if (answer) {
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // Quiz logic
  const quizContainer = document.getElementById('quiz');
  if (quizContainer) {
    const questions = [
      {
        question: 'Qual a principal diferença entre Lead e Opportunity no Sales Cloud?',
        options: [
          'Lead representa um potencial cliente ainda não qualificado, enquanto Opportunity representa uma oportunidade de negócio em andamento.',
          'Lead é usado apenas em Marketing Cloud e Opportunity em Service Cloud.',
          'Lead e Opportunity são a mesma coisa; ambos representam negócios fechados.',
          'Opportunity é um objeto de apoio para relatórios e não armazena dados reais.'
        ],
        answer: 0
      },
      {
        question: 'Quando usar relacionamento Master‑Detail em vez de Lookup?',
        options: [
          'Quando o relacionamento deve ser opcional e não precisar de roll‑up summary.',
          'Quando o relacionamento é forte e os registros dependem da existência do registro pai.',
          'Sempre que o objeto filho precisar existir de forma independente do pai.',
          'Para relacionar objetos padrão apenas.'
        ],
        answer: 1
      },
      {
        question: 'O que é bulkification em triggers Apex?',
        options: [
          'Processar registros um de cada vez para melhor desempenho.',
          'Projetar o código para lidar com vários registros em uma única transação, respeitando limites de governança.',
          'Executar queries SOQL dentro de loops para simplificar o código.',
          'Enviar emails em massa a partir de triggers.'
        ],
        answer: 1
      },
      {
        question: 'Qual ferramenta do Marketing Cloud permite criar jornadas multicanal com emails, SMS e push?',
        options: [
          'Automation Studio',
          'Journey Builder',
          'Email Studio',
          'Content Builder'
        ],
        answer: 1
      },
      {
        question: 'No Financial Services Cloud, qual objeto representa a família de contas de um cliente?',
        options: [
          'PersonAccount',
          'Household',
          'FinancialAccount',
          'Opportunity'
        ],
        answer: 1
      }
    ];
    let currentIndex = 0;
    const results = [];
    const renderQuestion = () => {
      if (currentIndex >= questions.length) {
        showResult();
        return;
      }
      const q = questions[currentIndex];
      quizContainer.innerHTML = '';
      const qEl = document.createElement('div');
      qEl.className = 'quiz-question';
      qEl.textContent = q.question;
      const list = document.createElement('ul');
      list.className = 'quiz-options';
      q.options.forEach((opt, idx) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'quiz-option';
        input.value = idx;
        label.appendChild(input);
        label.append(opt);
        li.appendChild(label);
        list.appendChild(li);
      });
      const button = document.createElement('button');
      button.className = 'btn';
      button.textContent = 'Responder';
      button.addEventListener('click', () => {
        const selected = quizContainer.querySelector('input[name="quiz-option"]:checked');
        if (!selected) {
          alert('Selecione uma opção antes de continuar.');
          return;
        }
        const answerIdx = parseInt(selected.value, 10);
        results.push(answerIdx === q.answer);
        currentIndex++;
        renderQuestion();
      });
      quizContainer.appendChild(qEl);
      quizContainer.appendChild(list);
      quizContainer.appendChild(button);
    };
    const showResult = () => {
      quizContainer.innerHTML = '';
      const score = results.filter(Boolean).length;
      const resultEl = document.createElement('div');
      resultEl.className = 'quiz-result';
      resultEl.textContent = `Você acertou ${score} de ${questions.length} questões.`;
      quizContainer.appendChild(resultEl);
    };
    renderQuestion();
  }

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      if (!query) {
        searchResults.style.display = 'none';
        return;
      }
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query)
      );
      results.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.addEventListener('click', () => {
          window.location.href = item.url;
        });
        searchResults.appendChild(li);
      });
      searchResults.style.display = results.length > 0 ? 'block' : 'none';
    });
    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }
});