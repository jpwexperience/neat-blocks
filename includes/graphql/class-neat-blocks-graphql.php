<?php
/**
 * GraphQL endpoints
 * 
 * Main for meta values
 */
defined( 'ABSPATH' ) || exit;

use WPGraphQL\WooCommerce\Data\Factory;
use WPGraphQL\WooCommerce\Connection\Products;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\Data\Connection\PostObjectConnectionResolver;

class Neat_Blocks_GraphQL {
	/**
	 * Kick things off
	 */
	public function __construct() {
		$this->includes();
		$this->init();
	}

	/**
	 * Import classes
	 */
	public function includes() {
		// WooCommerce
		if ( class_exists( 'WooCommerce' ) ) {
			include __DIR__ . '/class-neat-blocks-graphql-wc.php';
		}
	}

	/**
	 * Hook methods
	 */
	public function init() {
		add_action( 'graphql_register_types', [$this, 'register_types'] );
	}

	/**
	 * Custom graphql endpoints 
	 */
	public function register_types() {
		register_graphql_field( 'clip', 'videoSource', [
			'type'          => 'String',
			'description'   => __( 'Clip data post meta', 'wp-graphql' ),
			'resolve'       => function( $post ) {
			    return get_post_meta( $post->ID, '_video_source', true );
			}
		]);
	}
}
return new Neat_Blocks_GraphQL();