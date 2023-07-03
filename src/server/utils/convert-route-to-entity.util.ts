const mapping: Record<string, string> = {
  feedbacks: 'feedback',
  'onboarding-flows': 'onboarding_flow',
  platforms: 'platform',
  templates: 'template',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
