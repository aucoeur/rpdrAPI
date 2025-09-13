import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/examples',
      ],
    },
    {
      type: 'category',
      label: 'REST API',
      items: [
        'api/rest/endpoints',
        'api/rest/authentication',
      ],
    },
    {
      type: 'category',
      label: 'GraphQL API',
      items: [
        'api/graphql/schema',
        'api/graphql/queries',
        'api/graphql/mutations',
      ],
    },
  ],
};

export default sidebars;
