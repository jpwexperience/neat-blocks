<?php
/**
 * GraphQL endpoints
 * 
 * Main for meta values
 */
defined( 'ABSPATH' ) || exit;

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
	}

	/**
	 * Hook methods
	 */
	public function init() {
		add_action( 'plugins_loaded', [$this, 'plugin_integrations'] );
		add_action( 'graphql_register_types', [$this, 'register_types'] );
	}

	/**
	 * Import classes that depend on certain plugins
	 */
	public function plugin_integrations() {
		// WooCommerce
		if ( class_exists( 'WooCommerce' ) ) {
			include __DIR__ . '/class-neat-blocks-graphql-wc.php';
		}
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


		/**
		 * Connect media item to block data
		 */
		register_graphql_field( 'NeatImageTextBlock', 'image', [
			'type'          => 'MediaItem',
			'description'   => __( 'Connected image', 'wp-graphql' ),
			'resolve'       => function( $block, $args, $context ) {
				$attributes     = $block->attributes;
				$attachment_id  = $attributes['imageId'] ?? '';
				return $context->get_loader( 'post' )->load_deferred( $attachment_id );
				return 'ayy';
			}
		]);
	}
}
return new Neat_Blocks_GraphQL();