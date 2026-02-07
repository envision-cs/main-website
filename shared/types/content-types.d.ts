export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};

export type APICollectionResponse<T> = {
  data: T[];
  meta: Meta;
};

export type Formats = unknown;

export type ProviderMetadata = {
  fileId: string;
};

export type Photo = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: unknown;
  caption: unknown;
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

export type APITeamMember = APICollectionResponse<TeamMember>;

export type Children = {
  text: string;
  type: string;
};

export type Content = {
  type: string;
  children: Children[];
};

export type Project = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  completed: string;
  location: string;
  area: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  content: Content[];
  beck: unknown;
  gallery: Photo[];
  mainImage: Photo;
  sector: Sector;
};

export type Sector = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Photo;
  projects: Project[];
};

export type APISectors = APICollectionResponse<Sector>;
export type APIProjects = APICollectionResponse<Project>;

export type Service = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  param: string;
  description?: string;
  image?: string | Photo;
  meta?: unknown;
  content?: unknown;
};

export type APIServices = APICollectionResponse<Service>;

export type ContentProject = {
  id: string;
  title: string;
  slug: string;
  completed: string;
  location: string;
  area: string;
  sector: string;
  sectorSlug: string;
  main_image: string;
  gallery: string[];
  [key: string]: unknown;
};

export type ContentService = {
  id: string;
  param: string;
  title: string;
  description?: string;
  image?: string;
  meta?: unknown;
  [key: string]: unknown;
};
