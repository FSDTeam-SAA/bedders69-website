import { JobProps } from "../types/jobs.types";

export function normalizeSearchToken(token: string): string[] {
  const t = token.toLowerCase().trim();
  if (!t) return [];

  // "carer" or "carers" -> also matches "care"
  if (t === "carer" || t === "carers") {
    return [t, "care"];
  }
  // "care" -> matches "care", "carer", "carers"
  if (t === "care") {
    return ["care", "carer", "carers"];
  }
  // "nurse" or "nurses" or "nursing"
  if (t.startsWith("nurs")) {
    return ["nurse", "nursing", "nurs", "rgn", "rmn"];
  }
  // "manager" or "management"
  if (t.startsWith("manage")) {
    return ["manager", "management", "manage", "coordinator"];
  }
  // "live-in" or "livein" or "live"
  if (t === "live-in" || t === "livein" || t === "live") {
    return ["live-in", "live in", "livein"];
  }
  // "night" or "nights"
  if (t.startsWith("night")) {
    return ["night", "waking"];
  }
  // "support"
  if (t.startsWith("support")) {
    return ["support"];
  }

  return [t];
}

export function matchJobSearch(
  job: {
    title: string;
    company?: string;
    location?: string;
    type?: string;
    tags?: string[];
    description?: string;
  },
  query: string
): boolean {
  if (!query || query.trim() === "") return true;

  const raw = query.toLowerCase().trim();
  const rawTokens = raw.split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return true;

  const title = (job.title || "").toLowerCase();
  const company = (job.company || "").toLowerCase();
  const location = (job.location || "").toLowerCase();
  const type = (job.type || "").toLowerCase();
  const desc = (job.description || "").toLowerCase();
  const tags = (job.tags || []).map((t) => t.toLowerCase());

  const searchable = `${title} ${company} ${location} ${type} ${tags.join(" ")} ${desc}`;

  return rawTokens.every((token) => {
    const variants = normalizeSearchToken(token);
    return variants.some((v) => searchable.includes(v));
  });
}

export function matchJobCategory(
  job: {
    title: string;
    tags?: string[];
    type?: string;
    description?: string;
  },
  selectedCategory: string
): boolean {
  if (!selectedCategory || selectedCategory === "All") return true;

  const cat = selectedCategory.toLowerCase().trim();
  const title = (job.title || "").toLowerCase();
  const tags = (job.tags || []).map((t) => t.toLowerCase());
  const type = (job.type || "").toLowerCase();
  const desc = (job.description || "").toLowerCase();
  const combined = `${title} ${tags.join(" ")} ${type} ${desc}`;

  // 1. Nursing
  if (cat.includes("nurs")) {
    return (
      title.includes("nurse") ||
      title.includes("nursing") ||
      title.includes("rgn") ||
      title.includes("rmn") ||
      title.includes("rn") ||
      tags.some((t) =>
        t.includes("nurse") ||
        t.includes("nursing") ||
        t.includes("rgn") ||
        t.includes("rmn") ||
        t.includes("clinical")
      ) ||
      combined.includes("nurse") ||
      combined.includes("nursing") ||
      combined.includes("rgn")
    );
  }

  // 2. Management
  if (cat.includes("manage")) {
    return (
      title.includes("manager") ||
      title.includes("management") ||
      title.includes("coordinator") ||
      title.includes("co-ordinator") ||
      title.includes("supervisor") ||
      title.includes("director") ||
      title.includes("lead") ||
      title.includes("head of") ||
      tags.some((t) =>
        t.includes("management") ||
        t.includes("manager") ||
        t.includes("leadership") ||
        t.includes("coordinator") ||
        t.includes("governance")
      ) ||
      combined.includes("manager") ||
      combined.includes("management") ||
      combined.includes("coordinator")
    );
  }

  // 3. Live-In Care
  if (cat.includes("live-in") || cat.includes("live in")) {
    return (
      title.includes("live-in") ||
      title.includes("live in") ||
      title.includes("livein") ||
      type.includes("live-in") ||
      type.includes("live in") ||
      tags.some((t) => t.includes("live-in") || t.includes("live in") || t.includes("livein")) ||
      combined.includes("live-in") ||
      combined.includes("live in")
    );
  }

  // 4. Night Care
  if (cat.includes("night")) {
    return (
      title.includes("night") ||
      title.includes("waking") ||
      title.includes("sleep-in") ||
      title.includes("overnight") ||
      type.includes("night") ||
      tags.some((t) => t.includes("night") || t.includes("waking") || t.includes("sleep-in")) ||
      combined.includes("night") ||
      combined.includes("waking night")
    );
  }

  // 5. Support Worker
  if (cat.includes("support")) {
    return (
      title.includes("support worker") ||
      title.includes("support assistant") ||
      title.includes("supported living") ||
      title.includes("support") ||
      tags.some((t) => t.includes("support") || t.includes("supported living")) ||
      combined.includes("support worker") ||
      combined.includes("supported living")
    );
  }

  // 6. Care Assistant / Care
  if (cat.includes("care assistant") || cat.includes("carer") || cat === "care") {
    return (
      title.includes("care assistant") ||
      title.includes("carer") ||
      title.includes("care worker") ||
      title.includes("healthcare assistant") ||
      title.includes("hca") ||
      title.includes("domiciliary") ||
      title.includes("personal care") ||
      tags.some((t) =>
        t.includes("care assistant") ||
        t.includes("carer") ||
        t.includes("care worker") ||
        t.includes("hca") ||
        t.includes("personal care") ||
        t.includes("domiciliary")
      ) ||
      combined.includes("care assistant") ||
      combined.includes("care worker") ||
      combined.includes("carer") ||
      combined.includes("healthcare assistant")
    );
  }

  return (
    title.includes(cat) ||
    tags.some((t) => t.includes(cat)) ||
    combined.includes(cat)
  );
}

