import { __ }                from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	SelectControl,
}                            from '@wordpress/components';

const Inspector = ( {
	setAttributes,
} ) => {
	return (
		<InspectorControls>
			<PanelBody title={__( 'Settings' )}>
			</PanelBody>

		</InspectorControls>
	);
};

export default Inspector;
