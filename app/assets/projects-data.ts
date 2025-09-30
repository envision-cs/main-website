type Image = {
  src: string;
  alt: string;
};

type Project = {
  id: string;
  title: string;
  content: string;
  heroImg: string;
  heroAlt: string;
  withBeck: boolean;
  images: Image[];
};

type Catagories = {
  id: string;
  name: string;
  description?: string;
  projects: Project[];
};

export const portfolio: Catagories[] = [{
  id: '1',
  name: 'Aviation',
  description: 'Explore our diverse range of entertainment projects.',
  projects: [
    {
      id: '1',
      title: 'HCCA TPA Airside A, C, and F Restroom Renovations',
      content: `This renovation refurbished and expanded public restrooms to enhance maintainability, improve the overall appearance, and provide a new layout with larger stalls. It also included an expansion to the Airside C building to accommodate offices displaced by the expansion.

      **Envision and The Beck Group carried out the following to ensure the success of the project:**

      - Using the Building Information Model (BIM) to create models of the existing space to make planning and design more efficient and informed
      - Modeling passenger and pedestrian flow through the airport to analyze a proposed solution
      - Applying new technologies in bathroom best practices, such as latch sensors and interactive monitors that allow passengers to indicate their level of satisfaction with the restroom

      In collaboration with our CM partner, **The Beck Group**, Envision provided comprehensive support across all phases of the project to include:

      - Executive oversight
      - Project management
      - Field supervision
      - Preconstruction services
      - Client engagement

      Our integrated role ensured alignment, continuity, and excellence from pursuit to delivery.
`,
      heroImg: '/TPA_ASC_Restrooms_Hero.jpg',
      heroAlt: 'a hero image',
      withBeck: true,
      images: [
        { src: '/MaternityBathroom_Vanity.jpg', alt: 'Project 1 image 1' },
        { src: '/WomensRestroom_BathroomSinkAngle.jpg', alt: 'Project 1 image 2' },
        { src: '/WomensRestroom_StallsVacant.jpg', alt: 'Project 1 image 2' },
      ],
    },
  ],
}];
