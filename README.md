# Neon_Snake
As part of PromptWar I'm building Neon Snake game with stages and levels for each 100 points.

==Prompt is used to build the project is ==


"Act as a Senior Full-Stack Developer. Build a Neon-Retro Snake Game using React, HTML5 Canvas, and Firebase.
1. Visuals & UX:
Splash Screen: High-quality neon graphics with 'crawling snake' CSS/Canvas animations and nature-themed assets (leaves/apples).
Theme: Dark mode with neon-glow borders. Accessibility: Include ARIA labels and full keyboard navigation.
2. Core Gameplay Logic:
Level 1 (Beginner): Slow speed. Target: 15 points. Upon completion, animate a 'Door Open' transition.
Level 2 (Intermediate): same speed but small to increase. Food = Apples. Target: 10 apples. Open door to next level.
Level 3 (Infinity): Food = Bananas. Snake grows per unit. Score tracking for highest ever.
3. Data & Google Services:
Entry: User provides Email ID at start (Validation required).
Database: Integrate Google Firebase Firestore to save user sessions, scores, and timestamps.
Automation: Use a Firebase Cloud Function (or a secure API) to trigger a 'Score Report' email to the user upon game completion/death.
4. Technical Requirements (Evaluation Grade):
Code Quality: Modular components, Clean Code principles (DRY), and TypeScript for type safety.
Security: Sanitize user inputs; secure Firebase rules; hide API keys.
Efficiency: Use requestAnimationFrame for smooth 60FPS canvas rendering; optimize re-renders.
Testing: Provide a suite of Jest/React Testing Library scripts for movement logic and scoring.
Accessibility: High-contrast colors and focus-state management.
Output: Provide the complete organized directory structure, optimized source code, and Firebase configuration."
Why this prompt works for your Evaluation Criteria:
Code Quality: By specifying "Senior Full-Stack Developer," "TypeScript," and "Clean Code principles," you ensure the AI doesn't write "spaghetti code."
Security: Mentioning "Input Validation," "Sanitizing," and "Firebase Rules" ensures the AI handles the Email ID and Database safely.
Efficiency: Specifically asking for requestAnimationFrame instead of setInterval makes the game run smoothly without lagging.
Testing: It explicitly asks for a test suite (Jest), which is often the difference between a "pass" and "fail" in AI evaluations.
Accessibility: It mandates ARIA labels and keyboard controls, covering the accessibility requirement.
Google Services: It uses Firebase (Google's standard) for both the Database (Firestore) and the Backend logic (Cloud Functions) for emails.
Pro-Tip for your Submission:
When the AI generates the code, ensure the Snake movement logic is separated from the Rendering logic. AI evaluators love "Separation of Concerns." Also, make sure your firebase-rules.json file is included in your project folder to show you understand security.
Footers: Developed by Prasan kumar and add Icons for Github link, Linkedin profile,instagram link

