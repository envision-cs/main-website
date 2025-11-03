export function useHeaderHeight() {
  const height = useState<number>('headerHeight', () => 0);

  function setHeaderHeight(newHeight: number) {
    height.value = newHeight;
  }

  return { height, setHeaderHeight };
}
