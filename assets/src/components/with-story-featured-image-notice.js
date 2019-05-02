/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { Notice } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { validateFeaturedImage, getMinimumStoryPosterDimensions } from '../helpers';

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

			const errors = validateFeaturedImage( media, getMinimumStoryPosterDimensions(), true );

			if ( ! errors ) {
				return <PostFeaturedImage { ...props } />;
			}

			return (
				<Fragment>
					<Notice
						status="warning"
						isDismissible={ false }
					>
						{ errors.map( ( errorMessage, index ) => {
							return (
								<p key={ `error-${ index }` }>
									{ errorMessage }
								</p>
							);
						} ) }
					</Notice>
					<PostFeaturedImage { ...props } />
				</Fragment>
			);
		};
	},
	'withStoryFeaturedImageNotice'
);