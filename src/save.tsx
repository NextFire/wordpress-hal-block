/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
// @ts-ignore WP TS types def is broken
import { useBlockProps } from '@wordpress/block-editor';

import * as React from 'react';

import { HALBlock } from './hal';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }: { attributes: HALBlock }) {
    return (
        <div {...useBlockProps.save()} url={queryBuilder(attributes)}></div>
    );
}

////////////////////
// Query building //
////////////////////

const API_HAL = 'https://api.archives-ouvertes.fr/search/';

function queryBuilder(attributes: HALBlock) {
    let url = API_HAL;

    // portal or COLLECTION
    url += attributes.portColl + '/';

    // Parameters
    // query
    url += '?q=' + attributes.q;
    // sort if not by relevance
    if (attributes.sortField) url += '&sort='
        + (attributes.sortField == 'custom' ? attributes.customSortField : attributes.sortField)
        + ' ' + (attributes.desc ? 'desc' : 'asc');
    // filters
    url += '&fq=' + attributes.fq;
    // number of docs
    url += '&rows=' + attributes.rows;
    // doctypes
    if (!attributes.allDocTypes) url += '&docType_s=' + attributes.docTypes.join(' OR ');
    // include all fields
    url += '&fl=*';

    return url;
}
