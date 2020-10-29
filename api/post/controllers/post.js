'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx)

            if(!data || !data.description){
                ctx.throw(400, "Please write a description")
            }
            if(!files || !files.image){
                ctx.throw(400, "Please upload an Image")
            }
            /* This sets the default of likes to 0, so no one can update it to a certain number to game the system.*/
            entity = await strapi.services.post.create({...data, likes: 0}, {files})
        } else {
            /*eliminating the line below and adding other line makes it so you have to submit a picture(validation)*/
            /*entity = await strapi.services.post.create({...ctx.request.body, likes: 0});*/
            ctx.throw(400, "Please use multipart/form-data")
        }
            return sanitizeEntity(entity, { model: strapi.models.post })
        },
    };  


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
