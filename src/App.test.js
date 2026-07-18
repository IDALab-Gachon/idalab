import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './Pages/Home';
import Members from './Pages/Members';
import Professor from './Pages/Professor';
import Projects from './Pages/Projects';
import Publications from './Pages/Publications';
import Photo from './Pages/Photo';
import Theme from './Styles/Theme';

jest.mock('./hooks/usePublications', () => ({
  CATEGORY_LABELS: {
    international_journal_sci: 'International Journals (SCIE)',
    international_conference: 'International Conferences',
  },
  CATEGORY_ORDER: [
    'international_journal_sci',
    'international_conference',
  ],
  usePublications: () => ({
    publications: {
      international_journal_sci: [
        {
          id: 'journal-paper',
          title: 'An intelligent data analytics journal article',
          authors: 'Ok-Ran Jeong and IDA Lab',
          venue: 'IEEE Access',
          year: 2025,
          month: 3,
          index_type: 'SCIE',
          impact_factor: '3.4',
          url: 'https://example.com/journal-paper',
          display_order: 1,
        },
      ],
      international_conference: [
        {
          id: 'conference-paper',
          title: 'A knowledge discovery conference paper',
          authors: 'IDA Lab',
          venue: 'International Conference on Data Engineering',
          year: 2024,
          display_order: 1,
        },
      ],
    },
    loading: false,
    error: null,
  }),
}));

jest.mock('./hooks/useMembers', () => ({
  useMembers: () => ({
    activeMembers: {
      professor: [
        {
          id: 1,
          name: 'Prof. OkRan Jeong',
          role: 'professor',
          photo_url: 'professor.jpg',
          email: 'professor@example.com',
        },
      ],
    },
    alumni: [],
    loading: false,
    error: null,
    ROLE_ORDER: ['professor'],
  }),
}));

jest.mock('./hooks/useProfessor', () => ({
  useProfessor: () => ({
    professor: {
      id: 1,
      name: 'Prof. OkRan Jeong',
      photo_url: 'professor.jpg',
      email: 'professor@example.com',
    },
    details: {
      position_title: 'Distinguished Professor',
      affiliation: 'School of Test\nTest University',
      office: 'Room 101, Test University',
      telephone: '+82-2-1234-5678',
      orcid_url: 'https://orcid.org/test-profile',
      google_scholar_url: 'https://scholar.google.com/test-profile',
      scopus_url: 'https://www.scopus.com/test-profile',
      bio_sketch: 'Admin-managed professor biography.',
      research_interests: [
        { title: 'Intelligent Data Analysis', items: ['Machine learning'] },
      ],
      experiences: [
        { role: 'Professor', org: 'Gachon University', period: '2009 – Present' },
      ],
    },
    loading: false,
    error: null,
  }),
}));

jest.mock('./hooks/useProjects', () => ({
  useProjects: () => ({
    groupedProjects: {
      'Research Projects': [
        {
          id: 1,
          title: 'Ongoing research project',
          description: 'National Research Foundation of Korea (NRF)',
          start_year: 2024,
          end_year: null,
          url: 'https://example.com/project',
          pdf_url: 'https://example.com/project.pdf',
        },
        {
          id: 2,
          title: 'Completed research project',
          start_year: 2020,
          end_year: 2023,
        },
      ],
    },
    loading: false,
    error: null,
  }),
}));

jest.mock('./hooks/useGallery', () => ({
  useGallery: () => ({
    byYear: {
      2025: [
        {
          id: 'album-2025',
          label: 'Lab workshop',
          gallery_photos: Array.from({ length: 10 }, (_, index) => ({
            id: `photo-${index + 1}`,
            photo_url: `https://example.com/photo-${index + 1}.jpg`,
          })),
        },
      ],
      2024: [
        {
          id: 'album-2024',
          label: 'Conference',
          gallery_photos: [
            {
              id: 'older-photo',
              photo_url: 'https://example.com/older-photo.jpg',
            },
          ],
        },
      ],
    },
    loading: false,
    error: null,
  }),
}));

const renderPage = (page) =>
  render(
    <ThemeProvider theme={Theme}>
      <MemoryRouter>{page}</MemoryRouter>
    </ThemeProvider>
  );

test('renders the laboratory homepage', () => {
  const { getByRole } = renderPage(<Home />);

  expect(
    getByRole('heading', {
      level: 1,
      name: 'Intelligent Data Analytics Lab.',
    })
  ).toBeInTheDocument();
});

test('renders member cards by role', () => {
  const { container, getByRole, getByText } = renderPage(<Members />);

  expect(getByRole('heading', { level: 1, name: 'Members' })).toBeInTheDocument();
  expect(
    getByRole('heading', { level: 3, name: 'Prof. OkRan Jeong' })
  ).toBeInTheDocument();
  expect(
    getByRole('link', { name: 'Prof. OkRan Jeong' })
  ).toHaveAttribute('href', '/professor');
  expect(getByText('professor [at] example.com')).toBeInTheDocument();
  expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
});

test('renders professor profile details', () => {
  const { container, getByRole, getByText, queryByText } = renderPage(
    <Professor />
  );

  expect(getByRole('heading', { level: 1, name: 'Professor' })).toBeInTheDocument();
  expect(
    getByRole('heading', { level: 2, name: 'Prof. OkRan Jeong' })
  ).toBeInTheDocument();
  expect(
    getByRole('heading', { level: 2, name: 'Research Interests' })
  ).toBeInTheDocument();
  expect(getByText('Distinguished Professor')).toBeInTheDocument();
  expect(getByText(/School of Test/)).toBeInTheDocument();
  expect(getByText('Room 101, Test University')).toBeInTheDocument();
  expect(getByText('Admin-managed professor biography.')).toBeInTheDocument();
  expect(getByRole('link', { name: '+82-2-1234-5678' })).toHaveAttribute(
    'href',
    'tel:+82212345678'
  );
  expect(getByText('professor [at] example.com')).toBeInTheDocument();
  expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
  expect(queryByText(/IDA Lab Director/)).not.toBeInTheDocument();
  expect(
    getByRole('link', { name: 'Prof. OkRan Jeong ORCID profile' })
  ).toHaveAttribute('href', 'https://orcid.org/test-profile');
  expect(
    getByRole('link', {
      name: 'Prof. OkRan Jeong publications on Google Scholar',
    })
  ).toHaveAttribute(
    'href',
    'https://scholar.google.com/test-profile'
  );
  expect(
    getByRole('link', { name: 'Prof. OkRan Jeong Scopus author profile' })
  ).toHaveAttribute(
    'href',
    'https://www.scopus.com/test-profile'
  );
  expect(queryByText('Personal website ↗')).not.toBeInTheDocument();
});

test('renders project status, periods, and resources', () => {
  const { getByRole, getByText } = renderPage(<Projects />);

  expect(getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
  expect(getByText('2024 – Present')).toBeInTheDocument();
  expect(getByText('Ongoing')).toBeInTheDocument();
  expect(getByText('2020 – 2023')).toBeInTheDocument();
  expect(getByText('Completed')).toBeInTheDocument();
  expect(getByRole('link', { name: 'Project website ↗' })).toHaveAttribute(
    'href',
    'https://example.com/project'
  );
  expect(getByRole('link', { name: 'Project PDF ↗' })).toHaveAttribute(
    'href',
    'https://example.com/project.pdf'
  );
});

test('filters and renders publication records with complete metadata', () => {
  const { getByRole, getByText, queryByText } = renderPage(<Publications />);

  expect(
    getByRole('heading', { level: 1, name: 'Publications' })
  ).toBeInTheDocument();
  expect(
    getByText('An intelligent data analytics journal article')
  ).toBeInTheDocument();
  expect(
    getByText('A knowledge discovery conference paper')
  ).toBeInTheDocument();
  expect(getByText('2025 · Mar')).toBeInTheDocument();
  expect(getByText('IF 3.4')).toBeInTheDocument();
  expect(
    getByRole('link', {
      name: 'Open paper: An intelligent data analytics journal article',
    })
  ).toHaveAttribute('href', 'https://example.com/journal-paper');

  fireEvent.click(
    getByRole('button', { name: /International Journals \(SCIE\)/ })
  );
  expect(
    getByText('An intelligent data analytics journal article')
  ).toBeInTheDocument();
  expect(
    queryByText('A knowledge discovery conference paper')
  ).not.toBeInTheDocument();
});

test('shows event albums before progressively revealing their photos', () => {
  const { getAllByRole, getByRole, queryAllByRole } = renderPage(<Photo />);

  expect(getByRole('heading', { level: 1, name: 'Photos' })).toBeInTheDocument();
  expect(getByRole('heading', { level: 2, name: '2025' })).toBeInTheDocument();
  expect(getByRole('heading', { level: 2, name: '2024' })).toBeInTheDocument();
  expect(
    getByRole('button', { name: 'View 1 photo from Conference' })
  ).toHaveTextContent('View photos');
  expect(
    queryAllByRole('button', { name: /Open Lab workshop/ })
  ).toHaveLength(0);

  fireEvent.click(
    getByRole('button', { name: 'View 10 photos from Lab workshop' })
  );
  expect(getAllByRole('button', { name: /Open Lab workshop/ })).toHaveLength(8);
  fireEvent.click(getByRole('button', { name: 'Show 2 more photos' }));
  expect(
    getAllByRole('button', { name: /Open Lab workshop/ })
  ).toHaveLength(10);
});
