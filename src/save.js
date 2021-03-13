import { __ }            from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const save = ({attributes}) => {

	const {title, questionBank} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div>{__(title)}</div>
			<InnerBlocks.Content/>
		</div>
	);
};

export default save;
