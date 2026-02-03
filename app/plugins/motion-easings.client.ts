export default defineNuxtPlugin(() => {
  const { EASINGS } = useAppConfig();
  const style = document.createElement('style');

  style.textContent = `
    :root {
      ${Object.entries(EASINGS)
        .map(
          ([name, [a, b, c, d]]) =>
            `--ease-${name}: cubic-bezier(${a}, ${b}, ${c}, ${d});`,
        )
        .join('\n')}
    }
  `;

  document.head.appendChild(style);
});
