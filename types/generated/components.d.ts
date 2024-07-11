import type { Schema, Attribute } from '@strapi/strapi';

export interface TestQuestion extends Schema.Component {
  collectionName: 'components_test_questions';
  info: {
    displayName: 'question';
  };
  attributes: {
    question: Attribute.String;
    correction: Attribute.String;
  };
}

export interface TestTest extends Schema.Component {
  collectionName: 'components_test_tests';
  info: {
    displayName: 'test';
    description: '';
  };
  attributes: {
    titre: Attribute.String;
    image: Attribute.Media;
    test: Attribute.Component<'test.question', true>;
    sous_matiere: Attribute.Relation<
      'test.test',
      'oneToOne',
      'api::sous-matiere.sous-matiere'
    >;
    enonce: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'Markdown';
          preset: 'rich';
        }
      >;
    hasParts: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'test.question': TestQuestion;
      'test.test': TestTest;
    }
  }
}
