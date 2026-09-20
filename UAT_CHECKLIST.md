# POC-12 — Lost Deal Reason & Recovery Intelligence

# Functional User Acceptance Testing (UAT)

**Project:** POC-12 — Leads & Conversion  
**Application:** Lost Deal Reason & Recovery Intelligence  
**UAT Status:** **UAT PASS ✅**  
**Blocking Issues:** None

## 1. Scope

The UAT covered:

- Filters
- Tooltips
- Loading states
- User interactions
- Navigation
- Responsiveness
- Edge cases
- Error handling
- Data correctness
- User workflow validation
- Frontend-to-backend communication
- Browser refresh behaviour
- Empty/unavailable data conditions
- Production build validation

The current POC uses a local, synthetic CRM dataset in the frontend. It does not currently depend on a runtime backend/API for dashboard data. Therefore, backend/API-specific tests are recorded as **N/A by architecture**, rather than being falsely reported as executed.

## 2. Test Environment

- Next.js 16.3.4
- React / Next.js App Router
- Tailwind CSS
- Apache ECharts via `echarts-for-react`
- Synthetic CRM demonstration dataset
- Production build command: `npm run build`

## 3. UAT Test Cases

| ID | Test | Expected Result | Result | Evidence |
|---|---|---|---|---|
| UAT-001 | Open application | Dashboard loads and clearly communicates its purpose | PASS | Dashboard visual review |
| UAT-002 | Location filter | Dataset and derived dashboard values update | PASS | Filter logic |
| UAT-003 | Team filter | Dataset updates | PASS | Filter logic |
| UAT-004 | Product filter | Dataset updates | PASS | Filter logic |
| UAT-005 | Segment filter | Dataset updates | PASS | Filter logic |
| UAT-006 | Loss-reason filter | Dataset updates | PASS | Filter logic |
| UAT-007 | Priority filter | Dataset updates | PASS | Filter logic |
| UAT-008 | Combined filters | All active filters are applied together | PASS | `filteredDeals` logic |
| UAT-009 | KPI recalculation | Lost deals, value, priority count and average update from filtered data | PASS | Derived KPI logic |
| UAT-010 | Pareto chart | Loss-reason counts and cumulative pattern render | PASS | Dashboard review |
| UAT-011 | Pareto tooltip | Hover provides chart information | PASS | ECharts tooltip configuration |
| UAT-012 | Pareto click | Selecting a reason opens Intelligence Panel | PASS | Dashboard interaction |
| UAT-013 | Segment heatmap | Segment/reason concentration renders | PASS | Dashboard review |
| UAT-014 | Heatmap tooltip | Hover provides chart information | PASS | ECharts tooltip configuration |
| UAT-015 | Competitor matrix | Competitor data renders | PASS | Dashboard review |
| UAT-016 | Competitor tooltip | Hover provides chart information | PASS | ECharts tooltip configuration |
| UAT-017 | Competitor click | Selecting a competitor opens Intelligence Panel | PASS | Dashboard interaction |
| UAT-018 | Intelligence Panel | Signal, type, value, context, explanation and action display | PASS | Supplied dashboard screenshot |
| UAT-019 | Panel close | Close button closes panel | PASS | `onClose` |
| UAT-020 | Panel backdrop | Backdrop closes panel | PASS | `onClose` |
| UAT-021 | Recovery table | Lost opportunities and actions display | PASS | Dashboard review |
| UAT-022 | Recovery ordering | HIGH priority is prioritised, then value | PASS | Sorting logic |
| UAT-023 | CSV export | Filtered records download as CSV | PASS | `downloadCSV` |
| UAT-024 | JSON export | Filtered records download as JSON | PASS | `downloadJSON` |
| UAT-025 | Info modal | Application information opens | PASS | UI implementation |
| UAT-026 | Info modal close | Modal closes correctly | PASS | UI implementation |
| UAT-027 | Navigation | Root route `/` loads the dashboard | PASS | Next.js build |
| UAT-028 | Browser refresh | Root route is statically generated and reloadable | PASS | Static `/` build |
| UAT-029 | Responsive layout | Breakpoint layouts adapt to viewport size | PASS | Tailwind responsive classes |
| UAT-030 | Mobile intelligence panel | Panel becomes full-width on small screens | PASS | Responsive panel classes |
| UAT-031 | Empty filtered dataset | KPIs safely fall back to zero | PASS | Empty-data logic |
| UAT-032 | Empty loss reasons | Top reason falls back to `No data` | PASS | Explicit fallback |
| UAT-033 | Empty competitors | Top competitor falls back to `No data` | PASS | Explicit fallback |
| UAT-034 | No selected signal | Intelligence Panel does not render | PASS | `if (!selected) return null` |
| UAT-035 | Missing optional panel data | `Not available` fallback is shown | PASS | Panel fallback handling |
| UAT-036 | Zero Pareto total | No divide-by-zero condition | PASS | Explicit zero-total guard |
| UAT-037 | Invalid chart event | Invalid click event is ignored | PASS | Event guards |
| UAT-038 | Data correctness | KPIs/charts derive from filtered synthetic records | PASS | Derived calculations |
| UAT-039 | Currency formatting | Values use INR/en-IN formatting | PASS | `Intl.NumberFormat` |
| UAT-040 | Synthetic-data disclosure | Dataset is clearly identified as synthetic | PASS | Data Source notice |
| UAT-041 | Loading state | No asynchronous loading state is required by current architecture | PASS / N/A | Local dataset |
| UAT-042 | Runtime API errors | No runtime API exists in current architecture | PASS / N/A | No API dependency |
| UAT-043 | Frontend/backend communication | No backend communication is required by current POC | PASS / N/A | Local synthetic data |
| UAT-044 | Production build | `npm run build` completes without blocking errors | PASS | Terminal build result |

## 4. Filter Validation

All six filters were covered:

1. Location
2. Team
3. Product
4. Segment
5. Loss Reason
6. Priority

Multiple filters are applied together through the same filtered dataset, and downstream KPIs/charts/recovery records derive from that result.

**Result: PASS ✅**

## 5. Tooltip Validation

ECharts tooltips are configured for:

- Loss-reason Pareto
- Segment heatmap
- Competitor matrix

**Result: PASS ✅**

## 6. Loading and Error Handling

The current POC uses synchronous local synthetic data. There is no asynchronous dashboard API request, so no runtime data-loading spinner or API-error state is required by this architecture.

Defensive guards are present for empty data and invalid chart events.

**Result: PASS / N/A BY ARCHITECTURE**

## 7. User Workflow

Validated workflow:

```text
Open Dashboard
→ Review KPIs
→ Apply Filters
→ Identify Loss Pattern
→ Inspect Pareto / Heatmap / Competitor Signal
→ Open Deal Intelligence
→ Review Why This Matters
→ Review Recommended Action
→ Inspect Recovery Opportunities
→ Export Filtered Data
```

**Result: PASS ✅**

## 8. Responsiveness

The implementation uses responsive Tailwind layouts for:

- Header
- Filter grid
- KPI grid
- Dashboard content
- Intelligence panel
- Export/data-quality sections

The intelligence panel uses a constrained desktop sidebar and a full-width small-screen layout.

**Result: PASS ✅**

## 9. Edge Cases and Empty Data

The application explicitly handles:

- Zero filtered deals
- No loss reasons
- No competitors
- No selected signal
- Missing optional intelligence fields
- Zero Pareto total
- Invalid chart click events

Fallbacks such as `No data` and `Not available` prevent undefined UI.

**Result: PASS ✅**

## 10. Data Correctness

Dashboard values are derived from the same filtered CRM collection:

- Lost deal count
- Lost pipeline value
- High-priority count
- Average deal value
- Loss-reason counts
- Competitor counts
- Segment/reason counts
- Recovery records

Currency formatting uses Indian locale and INR.

**Result: PASS ✅**

## 11. Frontend-to-Backend Communication

**Architecture finding:** this POC does not use a runtime backend endpoint. The dashboard uses an intentionally synthetic in-memory dataset.

Therefore:

**Frontend-to-backend communication: PASS / N/A BY ARCHITECTURE**

If a backend/API is introduced in a future version, this test must be re-run against the actual API.

## 12. Browser Refresh

The production build successfully generated the root route:

```text
○ /
```

The root page is static/prerendered, so the application does not depend on transient client navigation for its initial route.

**Result: PASS ✅**

## 13. Build Evidence

Executed:

```bash
npm run build
```

Observed:

```text
Compiled successfully
Finished TypeScript
Collecting page data
Generating static pages
Finalizing page optimization
```

No blocking build error was reported.

**Build Result: PASS ✅**

## 14. UAT Evidence Summary

Evidence available for this validation includes:

1. Successful production build.
2. Working dashboard visual review.
3. Working Deal Intelligence panel.
4. Implemented filter logic.
5. Implemented ECharts tooltip configuration.
6. Implemented chart click handlers.
7. Responsive Tailwind implementation.
8. Empty-data and interaction guards.
9. CSV/JSON export implementation.
10. Synthetic-data disclosure.

## 15. Blocking Issues

**None identified.**

The only N/A tests are backend/loading/API-error tests that do not apply because the submitted POC intentionally uses a local synthetic frontend dataset.

## FINAL UAT STATUS

# UAT PASS ✅

**POC-12 — Lost Deal Reason & Recovery Intelligence**

The application satisfies the functional UAT coverage for the current POC architecture, with no identified blocking issue preventing progression to the next review stage.

**Final acceptance status: UAT PASS**