import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import './style.scss';

registerBlockType( 'create-block/qa-block', {
	apiVersion: 2,
	title: __( 'Q&A Block', 'qa-block' ),

	description: __(
		'Block for creating question and answer responses.',
		'qa-block'
	),
	category: 'widgets',
	icon: 'welcome-write-blog',
	supports: {
		// Removes support for an HTML mode.
		html: false,
		alignWide: true,
		color: true,
		fontSize: true,
		lineHeight: true,
	},
	attributes: {
		questionBank: {
			type: 'array',
		}
	},
	edit,
	save,
} );
