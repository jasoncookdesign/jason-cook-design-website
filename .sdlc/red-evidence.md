---
title: "Contract RED evidence — website"
status: draft
date: 2026-10-18
---

# Contract RED evidence

Baseline on `main`: 18 suites, 162 tests, all passing.

Against the empty skeleton, after the adversarial review round: 26 suites, 235 tests; 70 fail, 165 pass. No suite failed to load. Of the 70 failures, 69 are assertion failures and 1 is a `TypeError` from the case-study renderer reading `testimonial.quote` when `testimonial` is absent, which is the missing behavior M6 must add.

Tests that pass against the skeleton are regression guards by design (the operating card keeps its price, the hero H1 and CTAs stay, Hero "8" with eight studies, the real-data work tests, the redirect null checks, the clean-repo and untracked-file cases of the check script). They are not RED evidence.

Adversarial round: an independent reviewer built a lorem-and-constants implementation that passed all 214 contract tests of the first draft. After the contracts were strengthened (shared fee matcher, distinct phase content, role-based and exposure checks, same-component check, computed counts, stricter sixth-phase wording, a wider check-script fixture set, anchored docs assertions), the same hostile build fails 30 tests in 7 suites. The tests it still passes are ones a correct implementation also passes.
