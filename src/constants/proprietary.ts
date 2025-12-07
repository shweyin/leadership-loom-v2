// ================================================================
// SURVEY QUESTIONS - MIGRATED FROM LEGACY APP
// This file contains all survey questions, titles, summaries, and
// 9-Box Grid matrix definitions. PRESERVED EXACTLY FROM:
// C:\Repos\leadership-loom\src\constants\proprietary.js
// ================================================================

interface Question {
  question: string;
  effectiveBehaviours: string;
  ineffectiveBehaviours: string;
}

interface YesNoQuestion {
  question: string;
  descriptor: string;
  criteria: string;
}

export const category2x1Questions: Question[] = [
  {
    question: "leadership-potential-1",
    effectiveBehaviours: "Co-ordinates group activities",
    ineffectiveBehaviours:
      "Abdicates coordination of team activities to others or coordinates ineffectively",
  },
  {
    question: "leadership-potential-2",
    effectiveBehaviours: "Keeps the team focused on goals",
    ineffectiveBehaviours: "Team loses focus easily",
  },
  {
    question: "leadership-potential-3",
    effectiveBehaviours: "Provides clear direction to the team",
    ineffectiveBehaviours: "Direction is misaligned, vague or ambiguous",
  },
  {
    question: "leadership-potential-4",
    effectiveBehaviours: "Clarifies roles and expectations",
    ineffectiveBehaviours: "Roles and expectations are unclear",
  },
  {
    question: "leadership-potential-5",
    effectiveBehaviours: "Offers clear and constructive feedback",
    ineffectiveBehaviours:
      "Does not offer feedback or is unclear and/or harsh in delivering feedback",
  },
  {
    question: "leadership-potential-6",
    effectiveBehaviours: "Addresses inappropriate behaviour",
    ineffectiveBehaviours: "Overlooks inappropriate behaviour",
  },
  {
    question: "leadership-potential-7",
    effectiveBehaviours:
      "Takes appropriate action when expectations are not met",
    ineffectiveBehaviours: "Does nothing to address underperformers",
  },
  {
    question: "leadership-potential-8",
    effectiveBehaviours: "Coaches staff for success",
    ineffectiveBehaviours: "Offers no coaching to staff",
  },
  {
    question: "leadership-potential-9",
    effectiveBehaviours: "Pushes empowerment and autonomy downwards",
    ineffectiveBehaviours:
      "Holds onto power, controls and causes bottle-necks due to a refusal to release control",
  },
  {
    question: "leadership-potential-10",
    effectiveBehaviours:
      "Delegates work in accordance with understanding of skills, interests and development needs",
    ineffectiveBehaviours:
      "Delegates work void of linkages to staff's skills, interests and/or development needs",
  },
];

export const category2x2Questions: Question[] = [
  {
    question: "adapt-respond-1",
    effectiveBehaviours: "Adjust to change positively",
    ineffectiveBehaviours:
      "Remains entrenched in old attitudes or resists change",
  },
  {
    question: "adapt-respond-2",
    effectiveBehaviours: "Adapts work style to suit changing circumstances",
    ineffectiveBehaviours:
      "Maintains work style when a different work style is required",
  },
  {
    question: "adapt-respond-3",
    effectiveBehaviours: "Accepts new ideas",
    ineffectiveBehaviours: "Is closed to new ideas or maintains the status quo",
  },
  {
    question: "adapt-respond-4",
    effectiveBehaviours: "Supports change initiatives",
    ineffectiveBehaviours: "Resists change initiatives",
  },
  {
    question: "adapt-respond-5",
    effectiveBehaviours: "Adapts interpersonal style to suit situation",
    ineffectiveBehaviours:
      "Persists with singular interpersonal style that does not match the situation",
  },
  {
    question: "adapt-respond-6",
    effectiveBehaviours:
      "Functions effectively when information or direction is lacking",
    ineffectiveBehaviours:
      "Fails to proceed or abdicates responsibility when information or direction is lacking",
  },
  {
    question: "adapt-respond-7",
    effectiveBehaviours:
      "Tolerates and remains confident during conditions of uncertainty",
    ineffectiveBehaviours:
      "Appears overwhelmed or at a loss in uncertain situations",
  },
  {
    question: "adapt-respond-8",
    effectiveBehaviours: "Maintains control during difficult situations",
    ineffectiveBehaviours:
      "Appears to lose control of self or situation during difficult situations",
  },
  {
    question: "adapt-respond-9",
    effectiveBehaviours: "Bounces back from setbacks",
    ineffectiveBehaviours: "Appears to be immersed in setbacks",
  },
  {
    question: "adapt-respond-10",
    effectiveBehaviours: "Uses unfair criticism as an opportunity to grow",
    ineffectiveBehaviours: "Allows unfair criticism to impact performance",
  },
];

export const category2x3Questions: Question[] = [
  {
    question: "working-with-people-1",
    effectiveBehaviours:
      "Demonstrates an interest in, or seeks to understand others",
    ineffectiveBehaviours: "Lacks an interest or understanding of others",
  },
  {
    question: "working-with-people-2",
    effectiveBehaviours:
      "Acknowledges the contributions of others through formal and/or informal recognition",
    ineffectiveBehaviours:
      "Focuses on own contribution or overlooks the contributions others make",
  },
  {
    question: "working-with-people-3",
    effectiveBehaviours: "Shows tolerance and consideration for others",
    ineffectiveBehaviours:
      "Has no tolerance and/or consideration for the issues of others",
  },
  {
    question: "working-with-people-4",
    effectiveBehaviours:
      "Encourages others to share their views, thoughts and feelings",
    ineffectiveBehaviours:
      "Does not solicit (encourage) others to share their views, thoughts and feelings",
  },
  {
    question: "working-with-people-5",
    effectiveBehaviours: "Encourages a climate of teamwork by own actions",
    ineffectiveBehaviours: "Discourages a climate of teamwork by own actions",
  },
  {
    question: "working-with-people-6",
    effectiveBehaviours: "Aligns personal style with the character of the team",
    ineffectiveBehaviours:
      "Dogmatically demonstrates singular style that undermines team effectiveness",
  },
  {
    question: "working-with-people-7",
    effectiveBehaviours: "Treats others with dignity and respect",
    ineffectiveBehaviours:
      "Is disrespectful, condescending and/or treats others with arrogance",
  },
  {
    question: "working-with-people-8",
    effectiveBehaviours:
      "Listens, pays close attention to others when they are speaking",
    ineffectiveBehaviours:
      "Devotes little concentration to others when they are speaking",
  },
  {
    question: "working-with-people-9",
    effectiveBehaviours:
      "Creates a sense of team spirit by encouraging harmony, co-operation and communication",
    ineffectiveBehaviours:
      "Undermines team spirit by creating disharmony, undermining co-operation and creates communication barriers",
  },
  {
    question: "working-with-people-10",
    effectiveBehaviours:
      "Demonstrates an ability to find appropriate meaning in non-verbal behaviour or emotion",
    ineffectiveBehaviours:
      "Misses or appears lost when presented with non-verbal behaviour or emotion",
  },
];

export const category2x4Questions: Question[] = [
  {
    question: "business-acumen-1",
    effectiveBehaviours:
      "Demonstrates awareness of how the organization functions and/or asks for clarity when unclear",
    ineffectiveBehaviours:
      "Lacks an understanding of how the organization functions, or proceeds with a limited understanding",
  },
  {
    question: "business-acumen-2",
    effectiveBehaviours:
      "Keeps up-to-date on current and future policies, trends, technology and information is affecting the organization's operational effectiveness",
    ineffectiveBehaviours:
      "Is unaware of how current and future policies, trends, technology and information is affecting the organization's operational effectiveness",
  },
  {
    question: "business-acumen-3",
    effectiveBehaviours:
      "Understands how strategic priorities can be achieved within the organization",
    ineffectiveBehaviours:
      "Considers strategic priorities as unnecessary or unachievable",
  },
  {
    question: "business-acumen-4",
    effectiveBehaviours:
      "Able to draw on expertise outside of their own area to achieve goals",
    ineffectiveBehaviours:
      "Narrowly focuses on own area of expertise, without consideration of broader impacts of potential contributions",
  },
  {
    question: "business-acumen-5",
    effectiveBehaviours:
      "Demonstrates understanding of the principles that underlie financial management such as cost management, revenue generation, expenditures, fiscal reporting and cost benefit",
    ineffectiveBehaviours:
      "Exhibits a limited understanding of financial management that supports the successful delivery of the organizations products and/or services",
  },
  {
    question: "business-acumen-6",
    effectiveBehaviours:
      "Adjusts service delivery model based upon fundamental environmental changes",
    ineffectiveBehaviours:
      "Maintains service delivery model in the face of fundamental environmental changes, other than if directed to do so",
  },
  {
    question: "business-acumen-7",
    effectiveBehaviours:
      "Works to strengthen delivery capacity to sustain service delivery during times of budget challenges",
    ineffectiveBehaviours:
      "Allows delivery capacity to be eroded through years of challenging budgets without building capacity for leaner years",
  },
  {
    question: "business-acumen-8",
    effectiveBehaviours:
      "Understands the value of own services within the organization",
    ineffectiveBehaviours:
      "Over- or underestimates the value of own services within the organization",
  },
];

export const category2x5Questions: Question[] = [
  {
    question: "set-goals-deliver-results-1",
    effectiveBehaviours:
      "Clearly understands the strategic direction of the organization and translates it into unit goals",
    ineffectiveBehaviours:
      "Misinterprets or has difficulty translating organization or departmental goals into unit goals",
  },
  {
    question: "set-goals-deliver-results-2",
    effectiveBehaviours:
      "Recognizes the importance of how goals need to be related to one another to achieve the organization's goals",
    ineffectiveBehaviours:
      "Creates goals in a vacuum that do not link to the organization's or department's goals",
  },
  {
    question: "set-goals-deliver-results-3",
    effectiveBehaviours:
      "Communicates the organization's or department's goals to allow front line staff to create their own aligned goals",
    ineffectiveBehaviours:
      "Is unclear or vague when communicating organization or departmental goals to front line staff",
  },
  {
    question: "set-goals-deliver-results-4",
    effectiveBehaviours:
      "Communicates goals at the appropriate time to allow front line staff to set goals for themselves",
    ineffectiveBehaviours:
      "Procrastinates in communicating organization or departmental goals with no sense of urgency",
  },
  {
    question: "set-goals-deliver-results-5",
    effectiveBehaviours:
      "Sets goals and works diligently to meet or exceed expectations",
    ineffectiveBehaviours: "Procrastinates in setting goals",
  },
  {
    question: "set-goals-deliver-results-6",
    effectiveBehaviours:
      "Consistently achieves results in a sustainable manner",
    ineffectiveBehaviours: "Does not deliver results consistently",
  },
  {
    question: "set-goals-deliver-results-7",
    effectiveBehaviours:
      "Targets time and resources into essential activities only",
    ineffectiveBehaviours: "Wastes time and resources pursuing non-essentials",
  },
  {
    question: "set-goals-deliver-results-8",
    effectiveBehaviours:
      "Adapts working methods in order to achieve objectives and overcome obstacles",
    ineffectiveBehaviours:
      "Resists adapting work methods in order to achieve goals",
  },
  {
    question: "set-goals-deliver-results-9",
    effectiveBehaviours:
      "Takes reasonable risks to get things done and assumes accountability for the outcomes",
    ineffectiveBehaviours:
      "Adopts an over-cautious approach that limits ability to achieve goals and/or blames others for inability to achieve results",
  },
  {
    question: "set-goals-deliver-results-10",
    effectiveBehaviours:
      "Seeks challenges and development opportunities inside and/or outside current scope of work",
    ineffectiveBehaviours: "Makes a minimal contribution to get by",
  },
];

export const category2x6Questions: Question[] = [
  {
    question: "planning-organizing-1",
    effectiveBehaviours: "Designs clear objectives",
    ineffectiveBehaviours: "Objectives are unclear",
  },
  {
    question: "planning-organizing-2",
    effectiveBehaviours: "Sets challenging objectives",
    ineffectiveBehaviours: "Objectives are easily achieved",
  },
  {
    question: "planning-organizing-3",
    effectiveBehaviours:
      "Prioritizes activities in the pursuit and achievement of objectives",
    ineffectiveBehaviours:
      "Generally actions job tasks as they arise and fails to prioritize activities",
  },
  {
    question: "planning-organizing-4",
    effectiveBehaviours: "Creates plans in advance",
    ineffectiveBehaviours: "Initiates action without planning activities",
  },
  {
    question: "planning-organizing-5",
    effectiveBehaviours: "Manages time effectively",
    ineffectiveBehaviours:
      "Wastes time, or fails to capitalize on time efficiencies",
  },
  {
    question: "planning-organizing-6",
    effectiveBehaviours: "Estimates realistic time frames for work activities",
    ineffectiveBehaviours:
      "Over- or under-estimates timeframes for work activities",
  },
  {
    question: "planning-organizing-7",
    effectiveBehaviours: "Identifies and organizes resources",
    ineffectiveBehaviours:
      "Overlooks required resources or fails to organize required resources",
  },
  {
    question: "planning-organizing-8",
    effectiveBehaviours: "Secures critical resources in advance",
    ineffectiveBehaviours:
      "Time is wasted due to the unavailability of resources",
  },
  {
    question: "planning-organizing-9",
    effectiveBehaviours:
      "Monitors own and others progress against deadlines and milestones",
    ineffectiveBehaviours:
      "Allows work to proceed without monitoring its progress or alignment to stated objectives",
  },
  {
    question: "planning-organizing-10",
    effectiveBehaviours:
      "Aware of issues and factors that could hinder progress",
    ineffectiveBehaviours:
      "Overlooks issues or factors that could hinder progress",
  },
];

export const category2x7Questions: Question[] = [
  {
    question: "leadership-potential-1",
    effectiveBehaviours:
      "Takes account of a wide range of issues across the organization",
    ineffectiveBehaviours:
      "Focuses on a narrow range of issues across the organization",
  },
  {
    question: "leadership-potential-2",
    effectiveBehaviours: "Aware of a broad range of issues related to own work",
    ineffectiveBehaviours:
      "Displays limited awareness of the range of issues related to own work",
  },
  {
    question: "leadership-potential-3",
    effectiveBehaviours: "Works to achieve the organization's long-term goals",
    ineffectiveBehaviours:
      "Focuses on short-term goals exclusively or overlooks long term goals",
  },
  {
    question: "leadership-potential-4",
    effectiveBehaviours:
      "Considers future trends, opportunities and contingencies",
    ineffectiveBehaviours:
      "Unaware of changing future trends, opportunities and contingencies",
  },
  {
    question: "leadership-potential-5",
    effectiveBehaviours:
      "Considers the impact of current work on future opportunities",
    ineffectiveBehaviours: "Focuses on current activities exclusively",
  },
  {
    question: "leadership-potential-6",
    effectiveBehaviours:
      "Encourages others to consider the organization's long-term strategy",
    ineffectiveBehaviours: "Focuses on own short-term  priorities",
  },
  {
    question: "leadership-potential-7",
    effectiveBehaviours:
      "Sets and develops a strategy that is aligned with the organization's direction",
    ineffectiveBehaviours:
      "Develops a strategy that is misaligned with the organization's direction",
  },
  {
    question: "leadership-potential-8",
    effectiveBehaviours:
      "Revises own strategy in light of changing circumstances",
    ineffectiveBehaviours:
      "Maintains strategic direction, irrespective of changing circumstances",
  },
  {
    question: "leadership-potential-9",
    effectiveBehaviours:
      "Explores future possibilities that the organization can aspire to achieve",
    ineffectiveBehaviours:
      "Focuses exclusively on immediate goals without considering future possibilities",
  },
];

export const category3Questions = {
  radioQuestions: [
    {
      question: "personal-characteristics-1",
      effectiveBehaviours: "Learns new materials quickly",
      ineffectiveBehaviours: "Struggles to learn new materials and practices",
    },
    {
      question: "personal-characteristics-2",
      effectiveBehaviours:
        "Easily understands and can articulate the drivers behind innovation in their field of practice",
      ineffectiveBehaviours:
        "Argues to maintain the status quo and/or undermines the value of adopting innovation in their field of practice",
    },
    {
      question: "personal-characteristics-3",
      effectiveBehaviours:
        "Creates a structure for self and others to learn new material and/or practices",
      ineffectiveBehaviours:
        "Learns in a haphazard manner and overlooks important details or misses critical steps/information",
    },
    {
      question: "personal-characteristics-4",
      effectiveBehaviours:
        "Able to concentrate effectively in order to learn new materials and practices",
      ineffectiveBehaviours:
        "Easily distracted and/or procrastinates unnecessarily undermining the adoption of new skills",
    },
    {
      question: "personal-characteristics-5",
      effectiveBehaviours:
        "Perseveres until mastery of new skill has been achieved",
      ineffectiveBehaviours:
        "Gives up easily when learning to master a new skill",
    },
    {
      question: "personal-characteristics-6",
      effectiveBehaviours:
        "Identifies where and how to secure resources to learn and master new materials and practices",
      ineffectiveBehaviours:
        "'Goes it alone' - fails to draw in resources that could aid in learning new materials/practices quickly",
    },
  ] as Question[],
  yesNoQuestions: [
    {
      question: "personal-characteristics-7",
      descriptor: "Expressed Aspiration",
      criteria:
        "This employee has explicitly expressed an interest in taking on more challenges and responsibilities in more senior critical roles",
    },
    {
      question: "personal-characteristics-8",
      descriptor: "Intent to Stay",
      criteria:
        "This employee has explicitly expressed a desire to remain in order to grow their career in the foreseeable future",
    },
    {
      question: "personal-characteristics-9",
      descriptor: "Discretionary Effort",
      criteria:
        "This employee consistently contributes more than is asked of them and expresses the learning that they experience when they go above and beyond what is asked of them",
    },
    {
      question: "personal-characteristics-10",
      descriptor: "Motivation",
      criteria:
        "This employee's behaviour demonstrates a motivation to learn new things, expand their understanding of the organization's operations and make a bigger contribution to the organization's future success",
    },
  ] as YesNoQuestion[],
};

export const category4Questions: YesNoQuestion[] = [
  {
    question: "past-performance-1",
    descriptor: "Performance Appraisals",
    criteria:
      "This employee has achieved nothing less than a 'Satisfactory' rating in their past three Performance Evaluations",
  },
  {
    question: "past-performance-2",
    descriptor: "Cost Management",
    criteria:
      "This employee appears keenly aware of the importance of cost management in the delivery of the organization's products and/or services and works to actively manage cost expenditures",
  },
  {
    question: "past-performance-3",
    descriptor: "Individual Development Plan (IDP)",
    criteria:
      "Does this employee have a current IDP that is being actively pursued?",
  },
];

export const category1Titles = {
  experience1: "Experience",
  experience2: "Licensing / Certifications",
  experience3: "Other",
  summary:
    "Please list any Licensing, Credentials, Trainer Licensing, Experience and/or scope of practice that this employee has gained.",
};

export const category2x1Titles = {
  summary:
    "Models and supports the organization's aspirations and values to ensure its success; Provides clear direction and inspires others to achieve goals beyond their perceived capabilities, Displays appropriate standards of behaviour; Motivates and empowers others to excel; Provides coaching, supports and encourages others to reach higher that they considered possible.",
  title: "Leadership",
};

export const category2x2Titles = {
  summary:
    "Adapts to new and changing situations; accepts new ideas and change initiatives; adapts interpersonal style to situations and is able to deal with ambiguity; is productive in high pressure situations; maintains control during difficult situations; maintains a balance of work and personal life commitments; remains positive and handles criticism well.",
  title: "Adapting and Responding to Change",
};

export const category2x3Titles = {
  summary:
    "Displays an interest and understanding of others; Adjusts to the team and builds team spirit; Acknowledges the contribution of others; Listens, consults others and communicates proactively; Is supportive and compassionate towards others.",
  title: "Working with People",
};

export const category2x4Titles = {
  summary:
    "Understands how the organization works and holds knowledge of policies, practices, trends, technology and information affecting their operation; aware of how strategies and tactics function within the organization.",
  title: "Business Acumen",
};

export const category2x5Titles = {
  summary:
    "Takes responsibility for translating department goals into unit goals and sets standards to measure performance; Is bottom line oriented continuously striving to meet goals; Is consistently one of the top performers.",
  title: "Setting Goals and Delivering Results",
};

export const category2x6Titles = {
  summary:
    "Defines clear goals and plans in advance while taking into account the possibility for change; Manages time and organizes resources; Monitors performance against agreed deadlines and milestones.",
  title: "Planning and Organizing",
};

export const category2x7Titles = {
  summary:
    "Works strategically to realize organization goals; Sets and develops strategies; Takes account of a wide range of issues across, and related to the unit, department or organization.",
  title: "Strategic Thinking and Action",
};

export const category3Titles = {
  title: "Personal Characteristics",
};

export const category4Titles = {
  title: "Past Performance",
};

export const matrixData = [
  {
    title: "Trusted Professional",
    definition:
      "Employee is viewed as an expert in the role. Exceed performance expectations, consistently delivers results and is committed to excellence. A reliable employee with expert knowledge and/or long valued experience.",
  },
  {
    title: "High Impact Performer",
    definition:
      "Employee is a high performer ready for additional challenges and has potential to develop beyond current role over time. Regularly exceeds expectations & objectives in current role. Further development on future skill set should be a priority. Meets some HiPo criteria.",
  },
  {
    title: "Next Leader",
    definition:
      "Employee has mastered current role with clear potential beyond current role. Ready for immediate advancement. Consider for accelerated development/stretch assignments if employee is also likely to move to more senior roles. Employee has cognitive, emotional and behavioural skills sets fully developed, strong business and leadership qualities, functional expertise and excellent business acumen. Employee promotable now.",
  },
  {
    title: "Effective Contributor",
    definition:
      "Employee is meeting objectives and hitting the expected standard of performance. Is making a valued contribution to the team and department. Displays a need for stronger engagement and motivation.",
  },
  {
    title: "Core Contributor",
    definition:
      "Employee is meeting all objectives and making a valued contribution. Is capable of growing with the changing demands of the role. A capable employee who could work at the next level in time. Can take on more complexity at current level but should be encouraged to move to next level.",
  },
  {
    title: "Emerging Potential",
    definition:
      "Employee has potential to development beyond current role. Making a valuable contribution to the role and to the team in current role. Employee should be stretched to move at least one level, by enhancing consistency and reliability of performance.",
  },
  {
    title: "Under Performer",
    definition:
      "Employee is not meeting objectives or performance expectations of the role and/or level of role. Ability or motivation issues present/observed. Focus must be on improving performance within the next 3 months. Assess if it is an Ability or Motivation issue and take action.",
  },
  {
    title: "Role Dilemma",
    definition:
      "Employee has some potential but is not delivering on stated/agreed objectives and/or standards. Assess if it is an Ability or Motivation issue and take action.",
  },
  {
    title: "New to Role",
    definition:
      "New to role or recent transition into a leadership role. Too early to assess performance, however displays elements of potentials criteria and demonstrates a keen interest to learn and grow. Currently adapting to new role and perceived to be able to take on more responsibilities. Focus is on coaching and a solid development plan. If  employee in this quadrant  in their role for a while, there may be a derailer in abilitiy/ motivation.",
  },
];
