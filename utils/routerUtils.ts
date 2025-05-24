export function formatRouteTitle(routeName: string): string {
  const withSpaces = routeName.replace(/([A-Z])/g, ' $1');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
