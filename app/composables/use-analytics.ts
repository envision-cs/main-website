type AnalyticsEventName
  = | 'cta_clicked'
    | 'contact_form_started'
    | 'contact_form_submitted'
    | 'contact_form_failed'
    | 'project_viewed'
    | 'service_viewed'
    | 'team_member_viewed'
    | 'external_social_clicked'
    | 'email_clicked'
    | 'phone_clicked';

type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

type AnalyticsRouteInput = {
  path: string;
  fullPath?: string;
  name?: string | null;
};

type AnalyticsLinkInput = {
  href: string;
  label?: string;
  path?: string;
  cta?: boolean;
};

type AnalyticsResolvedEvent = {
  event: AnalyticsEventName;
  properties: AnalyticsProperties;
};

const socialHosts = [
  'facebook.com',
  'linkedin.com',
  'instagram.com',
  'youtube.com',
  'x.com',
  'twitter.com',
];

export function resolveAnalyticsRouteEvent(
  route: AnalyticsRouteInput,
): AnalyticsResolvedEvent | null {
  const segments = route.path.split('/').filter(Boolean);

  if (segments[0] === 'projects' && segments.length >= 3) {
    return {
      event: 'project_viewed',
      properties: {
        path: route.path,
        full_path: route.fullPath || route.path,
        route_name: route.name,
        sector_slug: segments[1],
        project_slug: segments[2],
      },
    };
  }

  if (segments[0] === 'services' && segments.length >= 2) {
    return {
      event: 'service_viewed',
      properties: {
        path: route.path,
        full_path: route.fullPath || route.path,
        route_name: route.name,
        service_slug: segments[1],
      },
    };
  }

  if (segments[0] === 'team' && segments.length >= 2) {
    return {
      event: 'team_member_viewed',
      properties: {
        path: route.path,
        full_path: route.fullPath || route.path,
        route_name: route.name,
        team_member_slug: segments[1],
      },
    };
  }

  return null;
}

export function resolveAnalyticsLinkEvent(
  input: AnalyticsLinkInput,
): AnalyticsResolvedEvent | null {
  const href = input.href.trim();

  if (!href)
    return null;

  if (href.startsWith('mailto:')) {
    return {
      event: 'email_clicked',
      properties: {
        path: input.path,
        label: input.label,
      },
    };
  }

  if (href.startsWith('tel:')) {
    return {
      event: 'phone_clicked',
      properties: {
        path: input.path,
        label: input.label,
      },
    };
  }

  const host = resolveHost(href);
  const socialHost = host
    ? socialHosts.find(domain => host === domain || host.endsWith(`.${domain}`))
    : null;

  if (socialHost) {
    return {
      event: 'external_social_clicked',
      properties: {
        path: input.path,
        label: input.label,
        destination_host: host,
      },
    };
  }

  if (input.cta) {
    return {
      event: 'cta_clicked',
      properties: {
        path: input.path,
        label: input.label,
        destination: href,
      },
    };
  }

  return null;
}

export function isInternalCtaDestination(destination?: string) {
  if (!destination)
    return false;
  return destination.startsWith('/') || destination.startsWith('#');
}

export function useAnalytics() {
  function capture(event: AnalyticsEventName, properties: AnalyticsProperties = {}) {
    if (import.meta.server)
      return;

    const posthog = usePostHog();
    posthog?.capture(event, {
      ...properties,
      taxonomy_version: 'launch_v1',
    });
  }

  function captureResolved(resolved: AnalyticsResolvedEvent | null) {
    if (!resolved)
      return;
    capture(resolved.event, resolved.properties);
  }

  return {
    capture,
    captureResolved,
  };
}

function resolveHost(href: string) {
  try {
    return new URL(href, globalThis.location?.origin).hostname.replace(/^www\./, '');
  }
  catch {
    return '';
  }
}
