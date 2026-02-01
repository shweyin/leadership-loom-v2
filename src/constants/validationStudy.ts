export const validationStudyTitles = {
  title: 'Validation Study',
  summary: 'Please provide some background information about yourself. This section only appears once and helps us improve our assessment methodology.',
};

export interface SelectQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface YesNoQuestion {
  id: string;
  question: string;
}

export const validationStudySelectQuestions: SelectQuestion[] = [
  {
    id: 'role_level',
    question: 'Current role level',
    options: ['Individual Contributor', 'People Manager', 'Senior Manager', 'Executive', 'C-Suite'],
  },
  {
    id: 'years_experience',
    question: 'Total years of professional work experience',
    options: ['<5', '6-9', '10-14', '15-24', '25+'],
  },
  {
    id: 'years_leadership',
    question: 'Years of formal leadership or people-management experience',
    options: ['None', '1-3', '4-7', '8-14', '15+'],
  },
  {
    id: 'direct_reports',
    question: 'Number of direct reports currently managed',
    options: ['None', '1-5', '6-15', '16-25', '26-50', '51+'],
  },
  {
    id: 'org_size',
    question: 'Approximate size of your organization',
    options: ['<100', '100-499', '500-4,999', '5000+'],
  },
  {
    id: 'org_sector',
    question: 'Primary organizational sector',
    options: ['Private sector', 'Public sector', 'Non-profit', 'Academic/Education', 'Other'],
  },
  {
    id: 'geographic_region',
    question: 'Primary geographic region of work',
    options: ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East/Africa', 'Global/Multi-region'],
  },
  {
    id: 'education_level',
    question: 'Highest level of education completed',
    options: ['Secondary', 'Undergraduate', 'Graduate/Professional', 'Doctoral'],
  },
];

export const validationStudyYesNoQuestions: YesNoQuestion[] = [
  {
    id: 'previous_assessment',
    question: 'Have you previously completed leadership or personality assessment?',
  },
  {
    id: 'primary_language',
    question: 'Are you completing this assessment in your primary working language?',
  },
  {
    id: 'voluntary_participation',
    question: 'Is your participation in this study voluntary?',
  },
  {
    id: 'data_consent',
    question: 'I understand that my anonymized data may be used for psychometric analysis and research purposes?',
  },
];
