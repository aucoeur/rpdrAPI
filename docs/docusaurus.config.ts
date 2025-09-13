import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RuPaul\'s Drag Race API',
  tagline: 'Authenticated RESTful API for retrieving data from RuPaul\'s Drag Race',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://aucoeur.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/rpdrAPI/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'aucoeur', // Usually your GitHub org/user name.
  projectName: 'rpdrAPI', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/aucoeur/rpdrAPI/tree/main/docs/',
          // Exclude internal documentation from public docs
          exclude: ['internal/**/*'],
        },
        // Disable blog feature - we don't need it
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'RuPaul\'s Drag Race API',
      logo: {
        alt: 'RuPaul\'s Drag Race API Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'API Docs',
        },
        {
          href: 'https://github.com/aucoeur/rpdrAPI',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'API Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'REST API',
              to: '/docs/api/rest/endpoints',
            },
            {
              label: 'Authentication',
              to: '/docs/api/rest/authentication',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/aucoeur/rpdrAPI',
            },
            {
              label: 'Issues',
              href: 'https://github.com/aucoeur/rpdrAPI/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/aucoeur/rpdrAPI/discussions',
            },
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'Contributing',
              href: 'https://github.com/aucoeur/rpdrAPI/blob/main/CONTRIBUTING.md',
            },
            {
              label: 'Development Setup',
              href: 'https://github.com/aucoeur/rpdrAPI/blob/main/DEVELOPMENT.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RuPaul's Drag Race API. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
