export function formatRouteTitle(routeName: string): string {
  const words = routeName.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+/g);

  if (!words) return routeName;

  return words
    .map((word) =>
      word === word.toUpperCase()
        ? word // keep acronyms like QR or FAQ as-is
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}
