# Northstar — Advanced Signup Form

A polished, responsive signup form built with **HTML5, CSS3, and vanilla JavaScript**. No framework or build step is required.

## Features

- Responsive two-panel desktop layout and mobile-first fallback
- Inline validation for name, email, password, and terms acceptance
- Password visibility toggle and live strength meter
- Accessible labels, `aria-describedby`, invalid states, live status feedback, and keyboard focus styles
- Password policy: 8–128 characters, uppercase + lowercase, a number, and a symbol
- Submit prevention until every field is valid
- Reduced-motion support and clear focus indicators
- No dependencies or build tools

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

For a local server, run `python -m http.server 8000` in the project directory and visit `http://localhost:8000`.

## Project structure

```text
signup-form-pro/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Validation approach

- **Name:** trimmed, 2–80 characters, must contain a Unicode letter.
- **Email:** practical format check with a regular expression. Email regex validation is not proof that an inbox exists.
- **Password:** 8–128 characters and includes uppercase, lowercase, a digit, and a symbol.
- **Terms:** explicit consent checkbox required.
- **UX:** field errors appear inline; fields are revalidated on input after first blur; submit focuses the first invalid field.

## Important production notes

This is a front-end learning project. It does **not** create accounts, verify email ownership, or persist credentials. For production:

1. Submit to a backend over HTTPS and validate all fields again on the server.
2. Hash passwords with a suitable password-hashing algorithm such as Argon2id or bcrypt; never store plain-text passwords.
3. Use a vetted authentication provider or secure session implementation, rate limiting, CSRF protection where applicable, and abuse prevention.
4. Verify email ownership and implement secure account recovery.
5. Wire Google OAuth through a real identity provider; the current button is a demo only.
6. Replace the placeholder Terms, Privacy, and Sign-in links with real routes.
7. Review accessibility with keyboard-only testing and a screen reader.

## Deployment

You can deploy this static project with GitHub Pages, Netlify, or Vercel. Since it is static HTML/CSS/JS, no deployment configuration is required. Add your chosen hosting instructions and deployed URL here after publishing.

## Rollback evidence

For a simple static deployment rollback:
- Keep each known-good version in Git.
- Record the deployed commit SHA and deployment timestamp.
- To revert a bad change, use `git revert <commit-sha>` and redeploy.
- Add a screenshot or deployment-provider history link here once you have deployed.

## Interview questions

**How is email validated?** A regular expression checks a practical email shape, but server-side validation and confirmation are still necessary.

**Why inline errors instead of alerts?** They keep feedback close to the field, preserve context, and make correction faster. Accessible descriptions and focus management help keyboard and assistive-technology users.

**How is password strength checked?** A lightweight heuristic scores length and character variety. It is a user-feedback aid, not a security guarantee; production systems should use vetted password guidance and server-side enforcement.


## Signup action demo
A valid form submission shows a personalized success message and an **Open dashboard** action. Demo profile details (name, email, timestamp) are stored in localStorage, and duplicate emails are blocked in the same browser. Passwords are never stored. This is a front-end simulation, not real server authentication.
