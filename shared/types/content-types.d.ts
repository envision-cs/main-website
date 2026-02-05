export type APITeamMember = {
  data: TeamMember[];
  meta: Meta;
};

export type TeamMember = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  title: string;
  linkedin: string;
  email?: string;
  slug: string;
  bio: string;
  photo: Photo;
  team: Team;
};

export type Photo = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Formats = unknown;

export type ProviderMetadata = {
  fileId: string;
};

export type Team = {
  id: number;
  documentId: string;
  name: string;
  color: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  order: number;
  description: string;
};

export type Meta = {
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
