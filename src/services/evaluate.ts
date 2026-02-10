export interface ValidationStudyFormData {
  role_level: string;
  years_experience: string;
  years_leadership: string;
  direct_reports: string;
  org_size: string;
  org_sector: string;
  geographic_region: string;
  education_level: string;
  previous_assessment: boolean | undefined;
  primary_language: boolean | undefined;
  voluntary_participation: boolean | undefined;
  data_consent: boolean | undefined;
}

interface SurveyData {
  validationStudy: ValidationStudyFormData;
  category1: {
    experience: string;
    licensing: string;
    other: string;
  };
  category2_1: Record<string, string>;
  category2_2: Record<string, string>;
  category2_3: Record<string, string>;
  category2_4: Record<string, string>;
  category2_5: Record<string, string>;
  category2_6: Record<string, string>;
  category2_7: Record<string, string>;
  category3: Record<string, string>;
  category4: Record<string, string>;
}

interface DimensionValue {
  name: string;
  value: number;
}

interface EvaluationResult {
  totals: {
    total_score: number;
    leadership_potential: number;
    personal_characteristics: number;
    past_performance: number;
    learning: number;
    risk_of_leaving: number;
  };
  experience: {
    experience: string;
    licensing: string;
    other: string;
  };
  leadership: {
    leadership: DimensionValue;
    adapt: DimensionValue;
    working_with_people: DimensionValue;
    business_acumen: DimensionValue;
    setting_goals_and_deliver_results: DimensionValue;
    planning_and_organizing: DimensionValue;
    strategic_thinking_and_action: DimensionValue;
  };
  personal: {
    aspiration: DimensionValue;
    intent_to_stay: DimensionValue;
    discretionary_effort: DimensionValue;
    motivation: DimensionValue;
    learning: DimensionValue;
  };
  pastPerformance: {
    satisfactory_past_appraisals: DimensionValue;
    cost_management: DimensionValue;
  };
}

// Extract numeric value from question response
// e.g., "question-4" -> 2 (since 4 - 2 = 2)
// "Yes" -> 2, "No" -> 0
const getValue = (str: string | undefined): number => {
  if (!str) return 0;
  const tempStr = str.substr(str.lastIndexOf("-") + 1);
  let res = 1;

  if (tempStr.length === 1) {
    res = parseInt(tempStr) - 2;
  } else if (tempStr === "Yes") {
    res = 2;
  } else if (tempStr === "No") {
    res = 0;
  } else if (tempStr === "N/A") {
    res = 1;
  }
  return res;
};

// Sum all values in a category
const getCatSum = (cat: Record<string, string>): number => {
  if (Object.keys(cat).length === 0) return 0;
  const res: number[] = [];
  for (const prop in cat) {
    res.push(getValue(cat[prop]));
  }
  return res.reduce((a, b) => a + b);
};

const evaluate = (data: SurveyData): EvaluationResult => {
  const res: EvaluationResult = {
    totals: {
      total_score: 0,
      leadership_potential: 0,
      personal_characteristics: 0,
      past_performance: 0,
      learning: 0,
      risk_of_leaving: 0,
    },
    experience: {
      experience: data.category1.experience,
      licensing: data.category1.licensing,
      other: data.category1.other,
    },
    leadership: {
      leadership: {
        name: "Leadership",
        value: (getCatSum(data.category2_1) / 40) * 100,
      },
      adapt: { name: "Adapt", value: (getCatSum(data.category2_2) / 40) * 100 },
      working_with_people: {
        name: "Working With People",
        value: (getCatSum(data.category2_3) / 40) * 100,
      },
      business_acumen: {
        name: "Business Acumen",
        value: (getCatSum(data.category2_4) / 40) * 100,
      },
      setting_goals_and_deliver_results: {
        name: "Setting Goals & Deliver Results",
        value: (getCatSum(data.category2_5) / 40) * 100,
      },
      planning_and_organizing: {
        name: "Planning & Organizing",
        value: (getCatSum(data.category2_6) / 40) * 100,
      },
      strategic_thinking_and_action: {
        name: "Strategic Thinking and Action",
        value: (getCatSum(data.category2_7) / 40) * 100,
      },
    },
    personal: {
      aspiration: {
        name: "Aspiration",
        value: getValue(data.category3["personal-characteristics-7"]) * 50,
      },
      intent_to_stay: {
        name: "Intent to Stay",
        value: getValue(data.category3["personal-characteristics-8"]) * 50,
      },
      discretionary_effort: {
        name: "Discretionary Effort",
        value: getValue(data.category3["personal-characteristics-9"]) * 50,
      },
      motivation: {
        name: "Motivation",
        value: getValue(data.category3["personal-characteristics-10"]) * 50,
      },
      learning: {
        name: "Learning",
        value:
          (getCatSum({
            "personal-characteristics-1":
              data.category3["personal-characteristics-1"],
            "personal-characteristics-2":
              data.category3["personal-characteristics-2"],
            "personal-characteristics-3":
              data.category3["personal-characteristics-3"],
            "personal-characteristics-4":
              data.category3["personal-characteristics-4"],
            "personal-characteristics-5":
              data.category3["personal-characteristics-5"],
            "personal-characteristics-6":
              data.category3["personal-characteristics-6"],
          }) /
            24) *
          100,
      },
    },
    pastPerformance: {
      satisfactory_past_appraisals: {
        name: "Satisfactory Past Appraisals",
        value:
          (getValue(data.category4["past-performance-1"]) +
            getValue(data.category4["past-performance-2"])) *
          25,
      },
      cost_management: {
        name: "Cost Management",
        value: getValue(data.category4["past-performance-3"]) * 50,
      },
    },
  };

  res.totals.learning = Math.round(res.personal.learning.value);

  res.totals.personal_characteristics =
    res.personal.aspiration.value / 50 +
    res.personal.discretionary_effort.value / 50 +
    res.personal.intent_to_stay.value / 50 +
    res.personal.motivation.value / 50;

  res.totals.past_performance =
    res.pastPerformance.satisfactory_past_appraisals.value / 50 +
    res.pastPerformance.cost_management.value / 50;

  // CRITICAL: Weighted leadership calculation
  // Weights: Leadership=33, Adapt=10, Working=10, Business=25, Goals=10, Planning=10, Strategic=10
  // Total weight = 108
  const leadership_sum =
    (res.leadership.leadership.value / 100) * 33 +
    (res.leadership.adapt.value / 100) * 10 +
    (res.leadership.working_with_people.value / 100) * 10 +
    (res.leadership.business_acumen.value / 100) * 25 +
    (res.leadership.setting_goals_and_deliver_results.value / 100) * 10 +
    (res.leadership.planning_and_organizing.value / 100) * 10 +
    (res.leadership.strategic_thinking_and_action.value / 100) * 10;

  // CRITICAL: Division by 108, multiplication by 280
  res.totals.leadership_potential = Math.round((leadership_sum / 108) * 280);

  res.totals.total_score =
    res.totals.leadership_potential +
    res.totals.personal_characteristics +
    res.totals.learning +
    res.totals.past_performance;

  return res;
};

// Default state for form initialization
export const defaultState: SurveyData & EvaluationResult = {
  validationStudy: {
    role_level: "",
    years_experience: "",
    years_leadership: "",
    direct_reports: "",
    org_size: "",
    org_sector: "",
    geographic_region: "",
    education_level: "",
    previous_assessment: undefined,
    primary_language: undefined,
    voluntary_participation: undefined,
    data_consent: undefined,
  },
  category1: {
    experience: "",
    licensing: "",
    other: "",
  },
  category2_1: {},
  category2_2: {},
  category2_3: {},
  category2_4: {},
  category2_5: {},
  category2_6: {},
  category2_7: {},
  category3: {},
  category4: {},
  totals: {
    total_score: 0,
    leadership_potential: 0,
    personal_characteristics: 0,
    learning: 0,
    past_performance: 0,
    risk_of_leaving: 0,
  },
  experience: { experience: "", licensing: "", other: "" },
  leadership: {
    leadership: { name: "Leadership", value: 0 },
    adapt: { name: "Adapt", value: 0 },
    working_with_people: { name: "Working With People", value: 0 },
    business_acumen: { name: "Business Acumen", value: 0 },
    setting_goals_and_deliver_results: {
      name: "Setting Goals & Deliver Results",
      value: 0,
    },
    planning_and_organizing: { name: "Planning & Organizing", value: 0 },
    strategic_thinking_and_action: {
      name: "Strategic Thinking and Action",
      value: 0,
    },
  },
  personal: {
    aspiration: { name: "Aspiration", value: 0 },
    intent_to_stay: { name: "Intent to Stay", value: 0 },
    discretionary_effort: { name: "Discretionary Effort", value: 0 },
    motivation: { name: "Motivation", value: 0 },
    learning: { name: "Learning", value: 0 },
  },
  pastPerformance: {
    satisfactory_past_appraisals: {
      name: "Satisfactory Past Appraisals",
      value: 0,
    },
    cost_management: { name: "Cost Management", value: 0 },
  },
};

export default evaluate;
