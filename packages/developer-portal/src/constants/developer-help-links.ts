import routes from '@/constants/routes'

export const HelpLinks = {
  WHATS_NEW: `${routes.API_DOCS}/whats-new`,
  BUG_REPORT:
    'https://github.com/reapit/foundations/issues/new?assignees=&labels=bug%2C+needs-triage&template=bug_report.md&title=',
  API_REQUEST:
    'https://github.com/reapit/foundations/issues/new?assignees=&labels=external-request%2C+needs-triage&template=feature_request.md&title=',
  ROADMAP: 'https://github.com/reapit/foundations/milestones?direction=asc&sort=due_date&state=open',
}
