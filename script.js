(() => {
    "use strict";
    const form = document.querySelector("#signup-form"), name = document.querySelector("#full-name"), email = document.querySelector("#email"), password = document.querySelector("#password"), terms = document.querySelector("#terms");
    const inputs = { name, email, password }, errors = { name: document.querySelector("#name-error"), email: document.querySelector("#email-error"), password: document.querySelector("#password-error") };
    const success = document.querySelector("#success-panel"), dashboard = document.querySelector("#dashboard-panel"), termsError = document.querySelector("#terms-error"), bars = [...document.querySelectorAll(".strength span")], strengthText = document.querySelector("#password-strength-text strong");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const checks = {
        name: v => !v.trim() ? "Please enter your full name." : v.trim().length < 2 ? "Name must be at least 2 characters." : "",
        email: v => !v.trim() ? "Please enter your email address." : !emailRegex.test(v.trim()) ? "Enter a valid email address." : "",
        password: v => !v ? "Please create a password." : v.length < 8 ? "Use at least 8 characters." : !/[a-z]/.test(v) || !/[A-Z]/.test(v) ? "Add uppercase and lowercase letters." : !/\d/.test(v) ? "Include at least one number." : !/[^A-Za-z0-9]/.test(v) ? "Include at least one symbol." : ""
    };
    function validate(k) { let msg = checks[k](inputs[k].value); errors[k].textContent = msg; inputs[k].setAttribute("aria-invalid", msg ? "true" : "false"); inputs[k].classList.add("touched"); return !msg }
    function accounts() { try { return JSON.parse(localStorage.getItem("northstar-demo-accounts") || "[]") } catch { return [] } }
    function strength() { let v = password.value, n = 0; if (v.length >= 8) n++; if (v.length >= 12) n++; if (/[a-z]/.test(v) && /[A-Z]/.test(v)) n++; if (/\d/.test(v)) n++; if (/[^A-Za-z0-9]/.test(v)) n++; n = v ? Math.min(4, Math.max(1, Math.ceil(n / 1.5))) : 0; let c = ["#e9ebf2", "#e56b73", "#eab85c", "#72b9a0", "#42a980"]; bars.forEach((b, i) => b.style.background = i < n ? c[n] : c[0]); strengthText.textContent = ["—", "Weak", "Fair", "Good", "Strong"][n] }
    Object.keys(inputs).forEach(k => { inputs[k].addEventListener("blur", () => validate(k)); inputs[k].addEventListener("input", () => { success.hidden = true; dashboard.hidden = true; if (inputs[k].classList.contains("touched")) validate(k); if (k === "password") strength() }) });
    document.querySelector("#toggle-password").addEventListener("click", () => { let b = password.type === "password"; password.type = b ? "text" : "password"; document.querySelector("#toggle-password").setAttribute("aria-label", b ? "Hide password" : "Show password") });
    terms.addEventListener("change", () => termsError.textContent = terms.checked ? "" : "Please accept the terms to continue.");
    form.addEventListener("submit", e => {
        e.preventDefault(); let valid = Object.keys(inputs).map(validate).every(Boolean); termsError.textContent = terms.checked ? "" : "Please accept the terms to continue."; if (!valid || !terms.checked) { success.hidden = true; dashboard.hidden = true; let k = Object.keys(inputs).find(k => checks[k](inputs[k].value)); if (k) inputs[k].focus(); return }
        let account = { name: name.value.trim().replace(/\s+/g, " "), email: email.value.trim().toLowerCase(), createdAt: new Date().toISOString() };
        let saved = accounts(); if (saved.some(a => a.email === account.email)) { errors.email.textContent = "This email has already signed up in this browser."; email.focus(); return }
        try { saved.push(account); localStorage.setItem("northstar-demo-accounts", JSON.stringify(saved)) } catch (e) { }
        document.querySelector("#success-message").textContent = "Welcome to Northstar, " + account.name.split(" ")[0] + "! Your signup was successful.";
        document.querySelector("#created-profile").textContent = account.name + " · " + account.email;
        document.querySelector("#dashboard-user-name").textContent = account.name; document.querySelector("#dashboard-user-email").textContent = account.email;
        success.hidden = false; dashboard.hidden = true; success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    document.querySelector("#dashboard-button").addEventListener("click", () => { success.hidden = true; dashboard.hidden = false; dashboard.scrollIntoView({ behavior: "smooth", block: "nearest" }) });
    function reset() { form.reset(); success.hidden = true; dashboard.hidden = true; Object.keys(inputs).forEach(k => { errors[k].textContent = ""; inputs[k].removeAttribute("aria-invalid"); inputs[k].classList.remove("touched") }); termsError.textContent = ""; strength(); name.focus() }
    document.querySelector("#create-another-button").addEventListener("click", reset); document.querySelector("#back-to-form").addEventListener("click", reset);
    document.querySelector("#google-button").addEventListener("click", () => alert("Google sign-in needs an OAuth provider; this is a demo button."));
    document.querySelector("#signin-link").addEventListener("click", e => { e.preventDefault(); alert("Sign-in page is not included in this demo.") });
    document.querySelectorAll(".policy-link").forEach(a => a.addEventListener("click", e => { e.preventDefault(); alert("Add your real Terms or Privacy page URL here.") }));
    strength();
})();