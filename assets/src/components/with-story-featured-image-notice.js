/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Notice } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { hasMinimumStoryPosterDimensions } from '../helpers';

/**
 * Higher-order component that is used for filtering the PostFeaturedImage component for AMP stories.
 *
 * Used to display notices in case the image does not meet minimum requirements.
 *
 * @return {Function} Higher-order component.
 */
export default createHigherOrderComponent(
	( PostFeaturedImage ) => {
		return ( props ) => {
			const { media } = props;

			if ( media && hasMinimumStoryPosterDimensions( media ) ) {
				return <PostFeaturedImage { ...props } />;
			}

			const message = ! media ? __( 'Selecting a featured image is required.', 'amp' ) : __( 'The featured image must have minimum dimensions of 696px x 928px.', 'amp' );

			return (
				<Fragment>
					<Notice
						status="warning"
						isDismissible={ false }
					>
						<span>
							{ message }
						</span>
					</Notice>
					<PostFeaturedImage { ...props } />
				</Fragment>
			);
		};
	},
	'withStoryFeaturedImageNotice'
);