/**
 * Subiksen AI Virtual Assistant
 * Subiksen V S Portfolio
 */

(function () {
  const chatBotToggleBtn = document.getElementById('chatBotToggleBtn');
  const chatBotDrawer = document.getElementById('chatBotDrawer');
  const closeChatBotBtn = document.getElementById('closeChatBotBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  if (!chatBotDrawer || !chatForm || !chatInput || !chatMessages) return;

  const knowledgeBase = [
    {
      keywords: ['skill', 'stack', 'tech', 'languages', 'java', 'spring', 'angular', 'backend', 'frontend', 'database'],
      answer: "Subiksen specializes in **Java, Spring Boot, Angular, MySQL, and Python**. He has strong foundations in REST API design, CRUD workflows, Data Structures & Algorithms (DSA), OOP, and modern frontend technologies (HTML5, CSS3, ES6 JavaScript)."
    },
    {
      keywords: ['rag', 'ticket', 'support', 'ai project', 'machine learning', 'python project', 'streamlit'],
      answer: "Subiksen engineered an **AI-Based Ticket Support System** using Python, Streamlit, and Retrieval-Augmented Generation (RAG). It provides intelligent, automated responses grounded in documentation, along with real-time ticket lifecycle tracking to drastically cut support resolution times."
    },
    {
      keywords: ['neighbourhood', 'service portal', 'community', 'angular project'],
      answer: "The **Neighbourhood Service Portal** is a full-stack web application built with Angular and MySQL. It features role-based user authentication, community service request dispatching, and clean REST APIs for smooth resident interactions."
    },
    {
      keywords: ['inventory', 'spring boot project', 'stock', 'management'],
      answer: "The **Inventory Management System** is an enterprise backend developed in Java with Spring Boot, Spring Data JPA, and MySQL. It manages product catalogs, automated stock thresholds, and transactional CRUD operations."
    },
    {
      keywords: ['internship', 'experience', 'infosys', 'edunet', 'matrimorphosis', 'work'],
      answer: "Subiksen has completed 3 key industry milestones:\n1. **Infosys Virtual Internship 6.0 (2025)**: Enterprise SDLC & problem-solving.\n2. **Matrimorphosis Training (2025)**: Full Stack Development with Angular & REST APIs.\n3. **Edunet Foundation (2024)**: AI Developer Intern working on Generative AI pipelines."
    },
    {
      keywords: ['education', 'college', 'degree', 'cgpa', 'marks', 'university'],
      answer: "Subiksen is pursuing a **B.E. in Computer Science and Engineering** at **K. Ramakrishnan College of Technology, Trichy** with an impressive **CGPA of 8.3 / 10.0**."
    },
    {
      keywords: ['cert', 'certificate', 'simplilearn', 'oracle', 'google', 'meta'],
      answer: "Subiksen holds 4 industry certifications:\n• Applied Generative AI Specialization (Simplilearn)\n• Oracle Fusion Cloud Applications HCM Certified Foundations Associate\n• Google UX Design: Foundations of UX (Coursera)\n• Meta: Introduction to Frontend Development (Coursera)"
    },
    {
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'hire', 'location', 'trichy'],
      answer: "You can reach Subiksen directly:\n📧 **Email:** subiksen.v.s@gmail.com\n📞 **Phone:** +91 7904600551\n📍 **Location:** Trichy, Tamil Nadu, India\nHe is actively available for full stack and software engineering roles!"
    },
    {
      keywords: ['why hire', 'about', 'summary', 'candidate', 'who is subiksen'],
      answer: "Subiksen combines rigorous backend architecture skills (Java/Spring Boot) with reactive modern frontend development (Angular) and state-of-the-art AI integration (RAG/Python). With a 8.3 CGPA and a relentless drive for clean, scalable code, he delivers immediate value to product engineering teams."
    }
  ];

  function toggleChat() {
    chatBotDrawer.classList.toggle('open');
    if (chatBotDrawer.classList.contains('open')) {
      chatInput.focus();
    }
  }

  function appendMessage(sender, text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`;
    
    if (!isUser) {
      const senderElem = document.createElement('div');
      senderElem.className = 'bubble-sender';
      senderElem.innerHTML = `<i class="fa-solid fa-robot"></i> ${sender}`;
      bubble.appendChild(senderElem);
    }

    const p = document.createElement('p');
    // Simple markdown-style bold and newlines parsing
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
    p.innerHTML = formatted;
    bubble.appendChild(p);

    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getAiResponse(userQuery) {
    const lower = userQuery.toLowerCase();

    for (const item of knowledgeBase) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.answer;
      }
    }

    return "Subiksen is a skilled Java Full Stack & AI Developer adept in Spring Boot, Angular, MySQL, and Python RAG. Feel free to ask about his specific projects, technical stack, or reach out to him at subiksen.v.s@gmail.com!";
  }

  function handleUserInput(query) {
    const text = query.trim();
    if (!text) return;

    appendMessage('You', text, true);
    chatInput.value = '';

    // Simulate typing delay for realistic interaction
    setTimeout(() => {
      const reply = getAiResponse(text);
      appendMessage('Subiksen AI', reply, false);
    }, 450);
  }

  if (chatBotToggleBtn) chatBotToggleBtn.addEventListener('click', toggleChat);
  if (closeChatBotBtn) closeChatBotBtn.addEventListener('click', toggleChat);

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserInput(chatInput.value);
  });

  // Quick prompt buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-chip')) {
      const prompt = e.target.getAttribute('data-prompt');
      if (prompt) {
        if (!chatBotDrawer.classList.contains('open')) {
          chatBotDrawer.classList.add('open');
        }
        handleUserInput(prompt);
      }
    }
  });

})();
