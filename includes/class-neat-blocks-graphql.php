<?php
/**
 * GraphQL endpoints
 * 
 * Main for meta values
 */

use WPGraphQL\WooCommerce\Data\Factory;

class Neat_Blocks_GraphQL {
    /**
     * Kick things off
     */
    public function __construct() {
        $this->init();
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

        register_graphql_field( 'NeatProductFeedBlock', 'products', [
			'type'          => ['list_of' => 'Product'],
			'description'   => __( 'Connected products', 'wp-graphql' ),
			'resolve'       => function( $block, $args, $context ) {
                $attributes     = $block->attributes;
                $num_products   = $attributes['numProducts'] ?? 10;
                $products       = get_posts([
                    'post_type'         => 'product',
                    'posts_per_page'    => $num_products,
                    'fields'            => 'ids',
                ]);
                $connected_products = [];
                foreach( $products as $product ) {
                    $connected_products[]   = Factory::resolve_crud_object( $product, $context );
                }
			    return $connected_products;
			}
		]);
    }
}
return new Neat_Blocks_GraphQL();