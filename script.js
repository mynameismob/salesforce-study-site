/*
 * Main JavaScript for Salesforce Study Portal
 *
 * This script handles the interactive behaviour of the site: toggling
 * the mobile navigation menu, expanding/collapsing FAQ answers and
 * running simple multiple‑choice quizzes for the exercises section.
 */

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
});