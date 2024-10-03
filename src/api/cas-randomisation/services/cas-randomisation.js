'use strict';

/**
 * cas-randomisation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cas-randomisation.cas-randomisation');
