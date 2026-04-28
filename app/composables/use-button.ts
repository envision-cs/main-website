type ButtonProps = {
  to?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  iconOnly?: boolean;
};

export function useButton(props: ButtonProps) {
  const slots = useSlots();

  const isLink = computed(() => !!props.to);
  const isDisabled = computed(() => props.disabled || props.loading);

  const componentProps = computed(() => {
    if (isLink.value) {
      return {
        to: isDisabled.value ? undefined : props.to,
        "aria-disabled": isDisabled.value ? "true" : undefined,
        tabindex: isDisabled.value ? -1 : undefined,
        target: props.target,
        rel: resolveRel(props),
      };
    }

    return {
      type: props.type ?? "button",
      disabled: isDisabled.value,
    };
  });

  function resolveRel(props: ButtonProps) {
    if (props.rel) return props.rel;
    if (props.target === "_blank") return "noopener noreferrer";
    return undefined;
  }

  const hasIcon = computed(() => !!slots.icon);
  const hasLabel = computed(() => !!slots.default);

  const isIconOnly = computed(() => props.iconOnly || (hasIcon.value && !hasLabel.value));

  return {
    componentProps,
    isDisabled,
    hasIcon,
    hasLabel,
    isIconOnly,
  };
}
