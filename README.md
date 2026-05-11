# OpenEMR Automation — Playwright + AI Safety Evals

![Playwright Tests](https://github.com/fnuisha20-arch/OpenEMR-Automation/actions/workflows/playwright.yml/badge.svg)

End-to-end automation framework combining **Playwright UI testing** with 
**AI safety evaluation**, built against [OpenEMR](https://demo.openemr.io/openemr) — 
a real open-source Electronic Health Records system.

## What this framework does

- **9 login test cases** across 5 clinical roles (admin, physician, receptionist, clinician, accountant)
- **6 role-based access control tests** verifying what each role can and cannot access
- **6 AI safety eval cases** mapped to OWASP LLM Top 10 vulnerabilities
- **5 Playwright assertions** checking critical severity, pass rate, and per-vulnerability behavior
- **CI/CD pipeline** via GitHub Actions running UI tests on every push

## OWASP LLM Top 10 coverage

| Vulnerability | Healthcare scenarios tested |
|---|---|
| **LLM01 — Prompt Injection** | Billing manipulation, admin override deletion |
| **LLM06 — Excessive Agency** | Unauthorized report modification, incorrect recipient targeting |
| **LLM09 — Misinformation** | Bypass approval status, past-date appointment confirmation |

## Architecture

\```
OpenEMR-Automation/
├── pages/                  # Page Object Model
│   ├── loginPage.ts
│   └── navigationPage.ts
├── tests/                  # Playwright specs
│   ├── login.spec.ts       # 9 login scenarios
│   ├── roles.spec.ts       # 6 access control tests
│   └── ai-eval.spec.ts     # 5 AI safety assertions
├── utils/
│   └── aiEvalRunner.ts     # LLM eval pipeline with Groq API
├── test-data/
│   ├── loginData.json
│   ├── aiEvalData.json     # OWASP-mapped eval cases
│   └── aiEvalReport.json   # Latest eval results
└── .github/workflows/
    └── playwright.yml      # CI runs UI tests, skips AI evals
\```

## Tech stack

- **Playwright** + **TypeScript** — UI automation
- **Page Object Model** — clean separation of locators and tests  
- **Groq API** (Llama 3.3 70B) — LLM under evaluation
- **dotenv** — environment-based secrets
- **GitHub Actions** — CI/CD with green-badge enforcement

## Running locally

\```bash
npm install
echo "GROQ_API_KEY=your_key_here" > .env
npx playwright test                                    # all tests
npx playwright test login.spec.ts                      # UI tests only
npx playwright test ai-eval.spec.ts                    # AI evals only
\```

## Engineering decisions

**Lazy-initialized API clients.** The Groq client only instantiates when evals actually run — not at module load. This prevents CI from failing when running UI-only tests without API keys.

**CI separation.** GitHub Actions runs UI and access-control tests on every push (deterministic, fast). AI eval tests run on-demand because LLM outputs are non-deterministic and consume API quota — exactly how production eval pipelines are structured.

**Semantic refusal detection.** AI evals use ANY-match logic on `must_contain` refusal phrases rather than requiring exact wording. This handles LLM output variability while still catching unsafe responses.

## Why this framework exists

Healthcare AI gets evaluated against the same domain risks that healthcare QA already 
catches in non-AI software — unauthorized access, data integrity violations, 
miscommunication. This framework reuses Page Object Model and Playwright patterns 
to test both the EHR UI **and** the LLM safety guardrails layered on top.