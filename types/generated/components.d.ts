import type { Schema, Attribute } from '@strapi/strapi';

export interface TestProposition extends Schema.Component {
  collectionName: 'components_test_propositions';
  info: {
    displayName: 'proposition';
  };
  attributes: {
    proposition: Attribute.String;
    isCorrect: Attribute.Boolean;
    correction: Attribute.String;
  };
}

export interface TestQcm extends Schema.Component {
  collectionName: 'components_test_qcms';
  info: {
    displayName: 'QCM';
  };
  attributes: {
    question: Attribute.String;
    proposition: Attribute.Component<'test.proposition', true>;
  };
}

export interface TestQuestion extends Schema.Component {
  collectionName: 'components_test_questions';
  info: {
    displayName: 'question';
    description: '';
  };
  attributes: {
    question: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'Markdown';
          preset: 'standard';
        }
      >;
    correction: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'Markdown';
          preset: 'standard';
        }
      >;
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
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'test.proposition': TestProposition;
      'test.qcm': TestQcm;
      'test.question': TestQuestion;
      'test.test': TestTest;
    }
  }
}
