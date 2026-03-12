export function useFormatDate() {
  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return {
    formatMonthYear,
  };
}
