---
title: Acme Ledger Approvals Review
subtitle: Where the approval queue loses time, and what to change first
client: Acme Ledger (fictional)
date: 2026-10-17
version: "0.1"
status: Sample
---

# Executive summary

## The approval queue loses most of its time before a human ever sees an item

::: governing
Routing rules, not reviewer capacity, set the pace of approvals. Fixing three rules recovers more time than adding reviewers. [Inference]
:::

::: stats
- **128** open approvals
- **4.2 days** median wait
- **61%** held before first review
:::

**Routing dominates.** Items wait in a holding state while rules decide who owns them. [Observed]

**Capacity is secondary.** Reviewers clear items within a day once they receive them. [Observed]

::: note
Median wait is measured from submission to first reviewer action.
:::

---

# Diagnosis

## Three rules account for nearly all holding time, and each can be changed without new tooling

The cut is by cause of delay: ownership, thresholds, and notifications.

### Ownership

**Unowned items stall.** Items from new cost centers match no routing rule and sit until someone triages them by hand.[^1] [Observed]

::: insight
Every day an item sits unowned adds a median 0.9 days to total wait. Ownership is the first lever.
:::

::: exhibit
Median wait by cause of delay, days

| Cause | Items | Median wait (days) | Share of delay |
|:--------------|------:|-------------------:|---------------:|
| Unowned | 412 | 3.8 | 52% |
| Over threshold | 190 | 2.1 | 21% |
| Missing notice | 133 | 1.4 | 14% |
| Other | 80 | 0.9 | 13% |

Source: Illustrative data, fictional sample.
:::

### Thresholds

**Limits trigger double review.** Items above the threshold need a second approver even when the first is the budget owner. [Inference]

> Nobody told me the item was waiting on me. — Interview 7, fictional

::: {.figure src="samples/img/mock-ui.png" width="two-thirds" alt="Mock approvals dashboard with a count of open approvals and a queue list"}
The approvals dashboard shows the count but not the cause of each hold.

1. Open approvals count hides held items.
2. Queue rows show status without owner.
3. No filter exists for held items.
:::

::: {.figure src="samples/img/mock-ui.png" width="full" alt="Mock approvals dashboard, full width"}
Full-measure version of the same screen.

1. Count tile.
2. Row status.
3. Missing filter.
:::

[^1]: Illustrative source, accessed 2026-10-17, published 2026-01-05.
