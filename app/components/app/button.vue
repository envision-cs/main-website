<template>
  <button>
    <app-typography tag="span" variant="text-lg">
      <slot />
    </app-typography>
  </button>
</template>

<style scoped>
:root {
  --button-width: max(
    245px,
    calc(
      0.1875 * (calc(100 * var(--vw, 1vw)) - 2 * var(1rem, 0px)) - (1 - 0.1875) * var(1rem, 0px) + 0 *
        var(--grid-gutter, 0px)
    )
  );
}

button {
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  background: none transparent;
  color: inherit;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  font: inherit;
  line-height: normal;
  cursor: pointer;

  display: flex;
  width: var(--button-width);
  align-items: flex-end;
  color: var(--ui-text-muted);
  background: white;
  padding: calc(var(--spacing) * 1) calc(var(--spacing) * 1);
  display: flex;
  min-height: 3.25em;
  min-width: 8em;
  justify-items: start;
  align-items: end;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  transition: all 0.35s;

  span {
    z-index: 2;
  }
}

button:before,
button:after {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  left: -100%;
  background: var(--ui-primary);
  z-index: 1;
  transition: all 0.35s;
}

button:before {
  opacity: 0.5;
}

button:after {
  transition-delay: 0.2s;
}

button:hover {
  color: #fff;
}

button:hover:before,
button:hover:after {
  left: 0;
}
</style>
