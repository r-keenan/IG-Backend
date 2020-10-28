'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            /* This sets the default of likes to 0, so no one can update it to a certain number to game the system.*/
            entity = await strapi.services.post.create({...data, likes: 0}, {files});
        } else {
            entity = await strapi.services.post.create({...ctx.request.body, likes: 0});
        }
        return sanitizeEntity(entity, { model: strapi.models.post });
        },
    };  


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
