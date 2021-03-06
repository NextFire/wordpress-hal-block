/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
// @ts-ignore WP TS types def is broken
import { useBlockProps } from "@wordpress/block-editor";

import * as React from "react";

import { HALDocTypes } from "./hal";
import { HALProps } from "./types";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }: { attributes: HALProps }) {
    return (
        <div
            {...useBlockProps.save()}
            {...attributes}
            desc={attributes.desc ? 'true' : 'false'}
            docTypesStr={(attributes.docTypes.length == 0 ? Object.keys(HALDocTypes) : attributes.docTypes).join()}
        >
            <em>Loading HAL...</em>
        </div>
    );
}
