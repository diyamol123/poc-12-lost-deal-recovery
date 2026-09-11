"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Info,
  Filter,
  Database,
  TrendingDown,
  IndianRupee,
  Target,
  AlertTriangle,
  X,
} from "lucide-react";

import DashboardCharts from "./components/DashboardCharts";
import RecoveryTable from "./components/RecoveryTable";
import DecisionPanel from "./components/DecisionPanel";

type Deal = {
  id: string;
  date: string;
  location: string;
  team: string;
  product: string;
  company: string;
  segment: string;
  reason: string;
  competitor: string;
  stage: string;
  value: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  action: string;
};

const deals: Deal[] = [
  {
    id: "CRM-001",
    date: "2026-01-08",
    location: "Bengaluru",
    team: "Enterprise",
    product: "Analytics Suite",
    company: "Aster Systems",
    segment: "Enterprise",
    reason: "Price",
    competitor: "Salesforce",
    stage: "Negotiation",
    value: 850000,
    priority: "HIGH",
    action: "Re-engage with ROI comparison and flexible pricing.",
  },
  {
    id: "CRM-002",
    date: "2026-01-14",
    location: "Mumbai",
    team: "Enterprise",
    product: "Cloud Platform",
    company: "Nova Retail",
    segment: "Enterprise",
    reason: "Competitor",
    competitor: "Microsoft",
    stage: "Proposal",
    value: 720000,
    priority: "HIGH",
    action: "Review competitor feature gap and schedule executive follow-up.",
  },
  {
    id: "CRM-003",
    date: "2026-01-22",
    location: "Kochi",
    team: "SMB",
    product: "Analytics Suite",
    company: "Bluewave Foods",
    segment: "SMB",
    reason: "Product Fit",
    competitor: "Zoho",
    stage: "Evaluation",
    value: 280000,
    priority: "MEDIUM",
    action: "Offer a product-fit workshop and targeted demo.",
  },
  {
    id: "CRM-004",
    date: "2026-02-03",
    location: "Chennai",
    team: "Mid-Market",
    product: "CRM Platform",
    company: "Orbit Logistics",
    segment: "Mid-Market",
    reason: "Timing",
    competitor: "HubSpot",
    stage: "Proposal",
    value: 460000,
    priority: "MEDIUM",
    action: "Create a 60-day re-engagement reminder.",
  },
  {
    id: "CRM-005",
    date: "2026-02-11",
    location: "Hyderabad",
    team: "Enterprise",
    product: "Cloud Platform",
    company: "Vertex Health",
    segment: "Enterprise",
    reason: "Price",
    competitor: "AWS",
    stage: "Negotiation",
    value: 1100000,
    priority: "HIGH",
    action: "Escalate for commercial review and ROI justification.",
  },
  {
    id: "CRM-006",
    date: "2026-02-18",
    location: "Pune",
    team: "SMB",
    product: "CRM Platform",
    company: "Bright Retail",
    segment: "SMB",
    reason: "Budget",
    competitor: "Zoho",
    stage: "Qualification",
    value: 190000,
    priority: "LOW",
    action: "Revisit during next budget cycle.",
  },
  {
    id: "CRM-007",
    date: "2026-02-26",
    location: "Delhi",
    team: "Mid-Market",
    product: "Analytics Suite",
    company: "Northstar Finance",
    segment: "Mid-Market",
    reason: "Competitor",
    competitor: "Power BI",
    stage: "Negotiation",
    value: 640000,
    priority: "HIGH",
    action: "Compare analytics capabilities and migration benefits.",
  },
  {
    id: "CRM-008",
    date: "2026-03-04",
    location: "Kochi",
    team: "SMB",
    product: "Cloud Platform",
    company: "Harbor Tech",
    segment: "SMB",
    reason: "Product Fit",
    competitor: "AWS",
    stage: "Evaluation",
    value: 230000,
    priority: "MEDIUM",
    action: "Run a technical discovery session.",
  },
  {
    id: "CRM-009",
    date: "2026-03-12",
    location: "Bengaluru",
    team: "Enterprise",
    product: "CRM Platform",
    company: "Zenith Motors",
    segment: "Enterprise",
    reason: "Competitor",
    competitor: "Salesforce",
    stage: "Proposal",
    value: 920000,
    priority: "HIGH",
    action: "Build competitor battlecard and executive outreach.",
  },
  {
    id: "CRM-010",
    date: "2026-03-18",
    location: "Mumbai",
    team: "Mid-Market",
    product: "Analytics Suite",
    company: "Urban Living",
    segment: "Mid-Market",
    reason: "Timing",
    competitor: "Tableau",
    stage: "Evaluation",
    value: 370000,
    priority: "MEDIUM",
    action: "Schedule future re-engagement based on buying cycle.",
  },
  {
    id: "CRM-011",
    date: "2026-03-25",
    location: "Chennai",
    team: "SMB",
    product: "CRM Platform",
    company: "Green Basket",
    segment: "SMB",
    reason: "Budget",
    competitor: "Zoho",
    stage: "Qualification",
    value: 150000,
    priority: "LOW",
    action: "Send lower-tier package when budget becomes available.",
  },
  {
    id: "CRM-012",
    date: "2026-04-02",
    location: "Hyderabad",
    team: "Enterprise",
    product: "Cloud Platform",
    company: "Prime Energy",
    segment: "Enterprise",
    reason: "Price",
    competitor: "Azure",
    stage: "Negotiation",
    value: 1250000,
    priority: "HIGH",
    action: "Conduct executive pricing review and ROI analysis.",
  },
  {
    id: "CRM-013",
    date: "2026-04-10",
    location: "Pune",
    team: "Mid-Market",
    product: "CRM Platform",
    company: "Axis Manufacturing",
    segment: "Mid-Market",
    reason: "Product Fit",
    competitor: "HubSpot",
    stage: "Evaluation",
    value: 410000,
    priority: "MEDIUM",
    action: "Map missing requirements and propose configuration.",
  },
  {
    id: "CRM-014",
    date: "2026-04-18",
    location: "Delhi",
    team: "Enterprise",
    product: "Analytics Suite",
    company: "Summit Bank",
    segment: "Enterprise",
    reason: "Competitor",
    competitor: "Tableau",
    stage: "Negotiation",
    value: 980000,
    priority: "HIGH",
    action: "Present differentiated analytics capabilities.",
  },
  {
    id: "CRM-015",
    date: "2026-04-25",
    location: "Kochi",
    team: "SMB",
    product: "Cloud Platform",
    company: "Coastal Foods",
    segment: "SMB",
    reason: "Timing",
    competitor: "AWS",
    stage: "Proposal",
    value: 210000,
    priority: "LOW",
    action: "Place into quarterly recovery campaign.",
  },
  {
    id: "CRM-016",
    date: "2026-05-03",
    location: "Bengaluru",
    team: "Mid-Market",
    product: "CRM Platform",
    company: "Techline India",
    segment: "Mid-Market",
    reason: "Price",
    competitor: "Salesforce",
    stage: "Proposal",
    value: 570000,
    priority: "HIGH",
    action: "Reopen pricing discussion with value-based package.",
  },
  {
    id: "CRM-017",
    date: "2026-05-11",
    location: "Mumbai",
    team: "Enterprise",
    product: "Cloud Platform",
    company: "Metro Infra",
    segment: "Enterprise",
    reason: "Budget",
    competitor: "Azure",
    stage: "Qualification",
    value: 690000,
    priority: "MEDIUM",
    action: "Monitor budget approval and prepare re-entry plan.",
  },
  {
    id: "CRM-018",
    date: "2026-05-19",
    location: "Chennai",
    team: "SMB",
    product: "Analytics Suite",
    company: "FreshMart",
    segment: "SMB",
    reason: "Competitor",
    competitor: "Power BI",
    stage: "Evaluation",
    value: 175000,
    priority: "LOW",
    action: "Share product comparison and customer proof points.",
  },
  {
    id: "CRM-019",
    date: "2026-05-27",
    location: "Hyderabad",
    team: "Mid-Market",
    product: "CRM Platform",
    company: "Medix Labs",
    segment: "Mid-Market",
    reason: "Product Fit",
    competitor: "HubSpot",
    stage: "Proposal",
    value: 520000,
    priority: "MEDIUM",
    action: "Schedule solution-design workshop.",
  },
  {
    id: "CRM-020",
    date: "2026-06-05",
    location: "Pune",
    team: "Enterprise",
    product: "Analytics Suite",
    company: "Global Textiles",
    segment: "Enterprise",
    reason: "Price",
    competitor: "Tableau",
    stage: "Negotiation",
    value: 890000,
    priority: "HIGH",
    action: "Create executive-level commercial recovery plan.",
  },
];

const reasonOrder = [
  "Price",
  "Competitor",
  "Product Fit",
  "Timing",
  "Budget",
];

const segmentOrder = [
  "Enterprise",
  "Mid-Market",
  "SMB",
];

const competitorOrder = [
  "Salesforce",
  "Microsoft",
  "Zoho",
  "HubSpot",
  "AWS",
  "Power BI",
  "Tableau",
  "Azure",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  const [locationFilter, setLocationFilter] =
    useState("ALL");

  const [teamFilter, setTeamFilter] =
    useState("ALL");

  const [productFilter, setProductFilter] =
    useState("ALL");

  const [segmentFilter, setSegmentFilter] =
    useState("ALL");

  const [reasonFilter, setReasonFilter] =
    useState("ALL");

  const [priorityFilter, setPriorityFilter] =
    useState("ALL");

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      return (
        (locationFilter === "ALL" ||
          deal.location === locationFilter) &&
        (teamFilter === "ALL" ||
          deal.team === teamFilter) &&
        (productFilter === "ALL" ||
          deal.product === productFilter) &&
        (segmentFilter === "ALL" ||
          deal.segment === segmentFilter) &&
        (reasonFilter === "ALL" ||
          deal.reason === reasonFilter) &&
        (priorityFilter === "ALL" ||
          deal.priority === priorityFilter)
      );
    });
  }, [
    locationFilter,
    teamFilter,
    productFilter,
    segmentFilter,
    reasonFilter,
    priorityFilter,
  ]);

  const totalLost = filteredDeals.length;

  const totalValue = filteredDeals.reduce(
    (sum, deal) => sum + deal.value,
    0
  );

  const highPriority = filteredDeals.filter(
    (deal) => deal.priority === "HIGH"
  ).length;

  const averageDealValue =
    totalLost > 0 ? totalValue / totalLost : 0;

  const lossReasons = reasonOrder
    .map((reason) => ({
      reason,
      count: filteredDeals.filter(
        (deal) => deal.reason === reason
      ).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  const topReason =
    lossReasons[0]?.reason ?? "No data";

  const competitorCounts = competitorOrder
  .map((competitor) => {
    const losses = filteredDeals.filter(
      (deal) => deal.competitor === competitor
    ).length;

    return {
      competitor,
      wins: 0,
      losses,
    };
  })
  .filter((item) => item.losses > 0);
  const topCompetitor =
    competitorCounts.length > 0
      ? [...competitorCounts].sort(
          (a, b) => b.losses - a.losses
        )[0].competitor
      : "No data";

  const segments = segmentOrder.flatMap(
    (segment) =>
      reasonOrder.map((reason) => ({
        segment,
        reason,
        value: filteredDeals.filter(
          (deal) =>
            deal.segment === segment &&
            deal.reason === reason
        ).length,
      }))
  );

  const recoveryItems = [...filteredDeals]
    .sort((a, b) => {
      const priorityRank = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      };

      return (
        priorityRank[b.priority] -
          priorityRank[a.priority] ||
        b.value - a.value
      );
    })
    .map((deal) => ({
      id: deal.id,
      company: deal.company,
      reason: deal.reason,
      competitor: deal.competitor,
      stage: deal.stage,
      value: deal.value,
      priority: deal.priority,
      action: deal.action,
    }));

  const downloadJSON = () => {
    const blob = new Blob(
      [JSON.stringify(filteredDeals, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      "lost-deal-recovery-data.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = [
      "ID",
      "Date",
      "Location",
      "Team",
      "Product",
      "Company",
      "Segment",
      "Loss Reason",
      "Competitor",
      "Stage",
      "Value",
      "Priority",
      "Recommended Action",
    ];

    const rows = filteredDeals.map((deal) => [
      deal.id,
      deal.date,
      deal.location,
      deal.team,
      deal.product,
      deal.company,
      deal.segment,
      deal.reason,
      deal.competitor,
      deal.stage,
      deal.value,
      deal.priority,
      deal.action,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      "lost-deal-recovery-data.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100">
      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#1F2937] bg-[#030712]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="text-[9px] font-semibold tracking-[0.35em] text-[#38BDF8]">
              INFOCREON INTERNSHIP • BUSINESS INTELLIGENCE
            </div>

            <h1 className="mt-1 text-xl font-bold tracking-wide sm:text-2xl">
              LOST DEAL REASON & RECOVERY INTELLIGENCE
            </h1>

            <p className="mt-1 text-[9px] tracking-[0.25em] text-slate-500">
              LEADS & CONVERSION • MANAGEMENT INTELLIGENCE
            </p>
          </div>

          <button
            onClick={() => setShowInfo(true)}
            aria-label="Application information"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] transition hover:bg-[#38BDF8]/20"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8">
        {/* SOURCE NOTE */}

        <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#38BDF8]/15 bg-[#38BDF8]/5 p-4">
          <Database className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" />

          <div>
            <div className="text-[9px] font-semibold tracking-widest text-[#38BDF8]">
              DATA SOURCE
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Synthetic CRM loss and follow-up dataset for
              demonstration and decision-support purposes.
              Company names and records shown here are
              synthetic and must not be interpreted as real
              company data.
            </p>
          </div>
        </div>

        {/* FILTER BAR */}

        <section className="mb-6 rounded-2xl border border-[#1F2937] bg-[#0B1117] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#38BDF8]" />

            <div className="text-[10px] font-semibold tracking-[0.25em] text-[#38BDF8]">
              INTELLIGENCE FILTERS
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              {
                label: "LOCATION",
                value: locationFilter,
                setValue: setLocationFilter,
                options: [
                  "ALL",
                  "Bengaluru",
                  "Mumbai",
                  "Kochi",
                  "Chennai",
                  "Hyderabad",
                  "Pune",
                  "Delhi",
                ],
              },
              {
                label: "TEAM",
                value: teamFilter,
                setValue: setTeamFilter,
                options: [
                  "ALL",
                  "Enterprise",
                  "Mid-Market",
                  "SMB",
                ],
              },
              {
                label: "PRODUCT",
                value: productFilter,
                setValue: setProductFilter,
                options: [
                  "ALL",
                  "Analytics Suite",
                  "Cloud Platform",
                  "CRM Platform",
                ],
              },
              {
                label: "SEGMENT",
                value: segmentFilter,
                setValue: setSegmentFilter,
                options: [
                  "ALL",
                  "Enterprise",
                  "Mid-Market",
                  "SMB",
                ],
              },
              {
                label: "LOSS REASON",
                value: reasonFilter,
                setValue: setReasonFilter,
                options: [
                  "ALL",
                  ...reasonOrder,
                ],
              },
              {
                label: "PRIORITY",
                value: priorityFilter,
                setValue: setPriorityFilter,
                options: [
                  "ALL",
                  "HIGH",
                  "MEDIUM",
                  "LOW",
                ],
              },
            ].map((filter) => (
              <label key={filter.label}>
                <div className="mb-1.5 text-[8px] tracking-widest text-slate-500">
                  {filter.label}
                </div>

                <select
                  value={filter.value}
                  onChange={(event) =>
                    filter.setValue(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-[#1F2937] bg-[#030712] px-3 py-2.5 text-xs text-slate-200 outline-none transition focus:border-[#38BDF8]/50"
                >
                  {filter.options.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>

        {/* KPI GRID */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-[#1F2937] bg-[#0B1117] p-5">
            <div className="flex items-center gap-2 text-[9px] tracking-widest text-slate-500">
              <TrendingDown className="h-4 w-4 text-[#38BDF8]" />
              LOST DEALS
            </div>

            <div className="mt-3 text-3xl font-bold">
              {totalLost}
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Filtered opportunities
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#0B1117] p-5">
            <div className="flex items-center gap-2 text-[9px] tracking-widest text-slate-500">
              <IndianRupee className="h-4 w-4 text-[#38BDF8]" />
              PIPELINE VALUE LOST
            </div>

            <div className="mt-3 text-2xl font-bold">
              {formatCurrency(totalValue)}
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Total value of lost opportunities
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#0B1117] p-5">
            <div className="flex items-center gap-2 text-[9px] tracking-widest text-slate-500">
              <AlertTriangle className="h-4 w-4 text-red-300" />
              HIGH PRIORITY
            </div>

            <div className="mt-3 text-3xl font-bold text-red-300">
              {highPriority}
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Opportunities requiring action
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#0B1117] p-5">
            <div className="flex items-center gap-2 text-[9px] tracking-widest text-slate-500">
              <Target className="h-4 w-4 text-[#818CF8]" />
              AVG DEAL VALUE
            </div>

            <div className="mt-3 text-2xl font-bold">
              {formatCurrency(averageDealValue)}
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Average lost opportunity value
            </div>
          </div>
        </section>

        {/* CHARTS */}

        <section className="mb-6">
          <DashboardCharts
            lossReasons={lossReasons}
            segments={segments}
            competitors={competitorCounts}
          />
        </section>

        {/* DECISION SUPPORT */}

        <section className="mb-6">
          <DecisionPanel
            totalLost={totalLost}
            totalValue={totalValue}
            highPriority={highPriority}
            topReason={topReason}
            topCompetitor={topCompetitor}
          />
        </section>

        {/* RECOVERY TABLE */}

        <section className="mb-6">
          <RecoveryTable items={recoveryItems} />
        </section>

        {/* DOWNLOADS + DATA QUALITY */}

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1F2937] bg-[#0B1117] p-5">
            <div className="text-[10px] font-semibold tracking-[0.25em] text-[#38BDF8]">
              EXPORT DATA
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Download the currently filtered synthetic
              CRM dataset for further analysis.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 rounded-lg border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-3 text-[10px] font-semibold tracking-widest text-[#38BDF8] transition hover:bg-[#38BDF8]/20"
              >
                <Download className="h-4 w-4" />
                DOWNLOAD CSV
              </button>

              <button
                onClick={downloadJSON}
                className="flex items-center gap-2 rounded-lg border border-[#818CF8]/30 bg-[#818CF8]/10 px-4 py-3 text-[10px] font-semibold tracking-widest text-[#818CF8] transition hover:bg-[#818CF8]/20"
              >
                <Download className="h-4 w-4" />
                DOWNLOAD JSON
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1F2937] bg-[#0B1117] p-5">
            <div className="text-[10px] font-semibold tracking-[0.25em] text-[#38BDF8]">
              SOURCE QUALITY & KPI DEFINITIONS
            </div>

            <div className="mt-4 space-y-3 text-xs leading-5 text-slate-400">
              <p>
                <strong className="text-slate-200">
                  Lost Deals:
                </strong>{" "}
                Count of opportunities classified as
                closed-lost in the synthetic CRM dataset.
              </p>

              <p>
                <strong className="text-slate-200">
                  Pipeline Value Lost:
                </strong>{" "}
                Sum of opportunity values associated with
                filtered lost deals.
              </p>

              <p>
                <strong className="text-slate-200">
                  High Priority:
                </strong>{" "}
                Lost opportunities marked HIGH based on
                value, buyer stage and recoverability.
              </p>

              <p>
                <strong className="text-slate-200">
                  Data Quality:
                </strong>{" "}
                Synthetic demonstration records are
                intentionally labelled and should not be
                treated as verified Companies House or GLEIF
                records.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="mt-8 border-t border-[#1F2937] py-6">
          <div className="flex flex-col justify-between gap-3 text-[9px] tracking-widest text-slate-600 sm:flex-row">
            <span>
              REAL RAILS BUSINESS INTELLIGENCE LIBRARY
            </span>

            <span>
              POC-12 • LEADS & CONVERSION
            </span>
          </div>
        </footer>
      </div>

      {/* INFO MODAL */}

      {showInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#38BDF8]/25 bg-[#070D14] p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[9px] tracking-[0.3em] text-[#38BDF8]">
                  APPLICATION INFORMATION
                </div>

                <h2 className="mt-2 text-xl font-bold">
                  Lost Deal Reason & Recovery Intelligence
                </h2>
              </div>

              <button
                onClick={() => setShowInfo(false)}
                aria-label="Close information"
                className="text-slate-400 transition hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              A production-style business intelligence
              dashboard focused on lost opportunities,
              competitive patterns and targeted recovery
              actions.
            </p>

            <div className="mt-5 rounded-xl border border-[#1F2937] bg-[#030712] p-4">
              <div className="text-[9px] tracking-widest text-slate-500">
                DEVELOPER SIGNATURE
              </div>

              <div className="mt-3 text-sm font-semibold">
                Architect: Diyamol Jose
              </div>

              <div className="mt-2 text-xs text-slate-400">
                Batch: Batch 2 Interns
              </div>

              <div className="mt-2 text-xs leading-5 text-slate-400">
                Stack: Next.js, FastAPI, Tailwind CSS,
Apache ECharts
              </div>

              <div className="mt-2 text-xs text-slate-400">
                PoC ID: 12
              </div>

              <div className="mt-2 text-xs text-slate-400">
                GitHub: @diyamol123
              </div>

              <div className="mt-3 text-[9px] tracking-widest text-[#38BDF8]">
                INFOCREON INTERNSHIP
              </div>
            </div>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-5 w-full rounded-lg border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-3 text-xs font-semibold tracking-widest text-[#38BDF8] transition hover:bg-[#38BDF8]/20"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </main>
  );
}