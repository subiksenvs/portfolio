/**
 * Interactive Developer Terminal CLI
 * Subiksen V S Portfolio
 */

(function () {
  const terminalModal = document.getElementById('terminalModal');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalToggleBtn = document.getElementById('terminalToggleBtn');
  const closeTerminalBtn = document.getElementById('closeTerminalBtn');
  const heroCliBtn = document.getElementById('heroCliBtn');

  if (!terminalModal || !terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<div class="t-line"><span class="text-cyan">Available Commands:</span></div>
<div class="t-line">  <span class="t-cmd">whoami</span>       - Display Subiksen's profile & role</div>
<div class="t-line">  <span class="t-cmd">skills</span>       - List technical skill matrix</div>
<div class="t-line">  <span class="t-cmd">projects</span>     - View flagship software & AI projects</div>
<div class="t-line">  <span class="t-cmd">experience</span>   - Display internships and training records</div>
<div class="t-line">  <span class="t-cmd">education</span>    - View academic degree & CGPA</div>
<div class="t-line">  <span class="t-cmd">certs</span>        - Show professional industry certifications</div>
<div class="t-line">  <span class="t-cmd">contact</span>      - Get direct phone, email, and social links</div>
<div class="t-line">  <span class="t-cmd">cat resume</span>   - Print resume plain text summary</div>
<div class="t-line">  <span class="t-cmd">matrix</span>       - Enter cyber green terminal mode</div>
<div class="t-line">  <span class="t-cmd">sudo hire</span>    - Instant hiring action fast-track</div>
<div class="t-line">  <span class="t-cmd">clear</span>        - Clear the terminal screen</div>
<div class="t-line">  <span class="t-cmd">exit</span>         - Close the terminal window</div>
`,

    whoami: () => `
<div class="t-line"><span class="text-cyan">SUBIKSEN V S</span> - Aspiring Java Full Stack & AI Developer</div>
<div class="t-line">Location: Trichy, Tamil Nadu, India</div>
<div class="t-line">Specialization: Spring Boot Microservices, Angular SPAs, Python AI (RAG), and MySQL Systems.</div>
<div class="t-line">Status: Ready to deploy immediate impact for engineering teams.</div>
`,

    skills: () => `
<div class="t-line"><span class="text-cyan">Technical Skill Breakdown:</span></div>
<div class="t-line">  • <span class="text-green">Languages:</span> Java, Python, C, SQL, JavaScript (ES6+)</div>
<div class="t-line">  • <span class="text-green">Backend:</span> Spring Boot, REST APIs, Hibernate / JPA</div>
<div class="t-line">  • <span class="text-green">Frontend:</span> Angular, HTML5, CSS3, Responsive Design</div>
<div class="t-line">  • <span class="text-green">Database:</span> MySQL, Relational Schema Design, Normalization</div>
<div class="t-line">  • <span class="text-green">AI & Tools:</span> Streamlit, GenAI / RAG, GitHub, VS Code</div>
<div class="t-line">  • <span class="text-green">Core:</span> OOP, Data Structures & Algorithms (DSA), DBMS, OS</div>
`,

    projects: () => `
<div class="t-line"><span class="text-cyan">Featured Engineering Projects:</span></div>
<div class="t-line">1. <span class="text-yellow">[AI/RAG]</span> <span class="text-cyan">AI-Based Ticket Support System</span></div>
<div class="t-line">   - Streamlit & Python RAG pipeline for automated support responses & ticket tracking.</div>
<div class="t-line">2. <span class="text-purple">[Full Stack]</span> <span class="text-cyan">Neighbourhood Service Portal</span></div>
<div class="t-line">   - Angular + MySQL web app for localized civic/neighbourhood request workflows.</div>
<div class="t-line">3. <span class="text-green">[Backend]</span> <span class="text-cyan">Inventory Management System</span></div>
<div class="t-line">   - Spring Boot & MySQL system with stock tracking, REST APIs & full CRUD.</div>
`,

    experience: () => `
<div class="t-line"><span class="text-cyan">Career Timeline:</span></div>
<div class="t-line">  • <span class="text-green">[2025]</span> <span class="text-cyan">Infosys Virtual Internship 6.0</span> - Enterprise SDLC & problem-solving.</div>
<div class="t-line">  • <span class="text-green">[2025]</span> <span class="text-cyan">Matrimorphosis</span> - Full Stack Developer Training (Angular + REST APIs).</div>
<div class="t-line">  • <span class="text-green">[2024]</span> <span class="text-cyan">Edunet Foundation</span> - AI Developer Intern (AI & GenAI Workflows).</div>
`,

    education: () => `
<div class="t-line"><span class="text-cyan">Academic Credentials:</span></div>
<div class="t-line">Degree: B.E. in Computer Science and Engineering</div>
<div class="t-line">Institution: K. Ramakrishnan College of Technology, Trichy</div>
<div class="t-line">Performance: <span class="text-yellow">CGPA: 8.3 / 10.0</span></div>
`,

    certs: () => `
<div class="t-line"><span class="text-cyan">Industry Certifications:</span></div>
<div class="t-line">  1. Applied Generative AI Specialization - Simplilearn</div>
<div class="t-line">  2. Oracle Fusion Cloud Applications HCM Certified Foundations Associate - Oracle</div>
<div class="t-line">  3. Google UX Design: Foundations of User Experience Design - Coursera</div>
<div class="t-line">  4. Meta: Introduction to Frontend Development - Coursera</div>
`,

    contact: () => `
<div class="t-line"><span class="text-cyan">Contact & Profiles:</span></div>
<div class="t-line">  • Email: <a href="mailto:subiksen.v.s@gmail.com" class="text-green">subiksen.v.s@gmail.com</a></div>
<div class="t-line">  • Phone: <a href="tel:+917904600551" class="text-green">+91 7904600551</a></div>
<div class="t-line">  • Location: Trichy, Tamil Nadu, India</div>
<div class="t-line">  • LinkedIn / GitHub / LeetCode: Available on portfolio header</div>
`,

    'cat resume': () => `
<div class="t-line text-cyan">=== RESUME: SUBIKSEN V S ===</div>
<div class="t-line">Java Full Stack Developer | Trichy, Tamil Nadu</div>
<div class="t-line">Phone: +91 7904600551 | Email: subiksen.v.s@gmail.com</div>
<div class="t-line">--------------------------------------------------</div>
<div class="t-line">SUMMARY: Aspiring Java Full Stack Developer skilled in Java, Spring Boot, Angular, MySQL, and AI-powered Python (RAG) applications.</div>
<div class="t-line">SKILLS: Java, Python, C, SQL, JavaScript, HTML, CSS, Spring Boot, Angular, MySQL, REST APIs, Streamlit.</div>
<div class="t-line">EDUCATION: B.E. Computer Science (CGPA: 8.3) - K. Ramakrishnan College of Technology.</div>
`,

    matrix: () => {
      document.querySelector('.terminal-window').style.borderColor = '#10b981';
      document.querySelector('.terminal-window').style.boxShadow = '0 0 50px rgba(16, 185, 129, 0.4)';
      return `<div class="t-line text-emerald">Wake up, Neo... Matrix protocol enabled. 🟢</div>`;
    },

    'sudo hire': () => {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      return `
<div class="t-line text-yellow">ACCESS GRANTED: Full Stack Engineer Candidate Selected! 🎉</div>
<div class="t-line text-cyan">Executing contact dispatch protocol to subiksen.v.s@gmail.com...</div>
<div class="t-line">Subiksen is excited to join your team and drive engineering results!</div>
`;
    },

    'sudo hire-subiksen': () => {
      return commands['sudo hire']();
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },

    exit: () => {
      closeTerminal();
      return '';
    }
  };

  function openTerminal() {
    terminalModal.classList.add('open');
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalModal.classList.remove('open');
  }

  function handleCommand(cmdStr) {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add command to output
    const cmdLine = document.createElement('div');
    cmdLine.className = 't-line';
    cmdLine.innerHTML = `<span class="t-prompt"><span class="text-green">guest@subiksen-portfolio</span>:<span class="text-cyan">~</span>$&nbsp;</span><span>${trimmed}</span>`;
    terminalOutput.appendChild(cmdLine);

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    const lowerCmd = trimmed.toLowerCase();
    let responseHtml = '';

    if (commands[lowerCmd]) {
      responseHtml = commands[lowerCmd]();
    } else if (lowerCmd.startsWith('cat ') && commands[lowerCmd]) {
      responseHtml = commands[lowerCmd]();
    } else if (lowerCmd.startsWith('sudo hire')) {
      responseHtml = commands['sudo hire']();
    } else {
      responseHtml = `<div class="t-line text-red">command not found: '${trimmed}'. Type <span class="t-cmd">help</span> for a list of valid commands.</div>`;
    }

    if (responseHtml) {
      const respElem = document.createElement('div');
      respElem.innerHTML = responseHtml;
      terminalOutput.appendChild(respElem);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Event Listeners
  if (terminalToggleBtn) terminalToggleBtn.addEventListener('click', openTerminal);
  if (heroCliBtn) heroCliBtn.addEventListener('click', openTerminal);
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  window.addEventListener('keydown', (e) => {
    // Press ` (backtick) or ~ to toggle terminal
    if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      terminalModal.classList.contains('open') ? closeTerminal() : openTerminal();
    }
    // ESC to close
    if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
      closeTerminal();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });
})();
