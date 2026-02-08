export default defineNuxtPlugin(() => {
  const { EASINGS } = useAppConfig();

  const cssContent = `
     :root {
       ${Object.entries(EASINGS)
          .map(
            ([name, [a, b, c, d]]) =>
              `--ease-${name}: cubic-bezier(${a}, ${b}, ${c}, ${d});`,
          )
          .join('\n')}
     }
   `;

  useHead({
    style: [{ innerHTML: cssContent }],
  });
});
