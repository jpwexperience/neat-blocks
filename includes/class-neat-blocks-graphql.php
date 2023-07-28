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

        /**
         * Connect products to product feed block
         */
        register_graphql_field( 'NeatProductFeedBlock', 'products', [
			'type'          => ['list_of' => 'Product'],
			'description'   => __( 'Connected products', 'wp-graphql' ),
			'resolve'       => [$this, 'resolve_connected_products'],
		]);

        /**
         * Connect products to product slider block
         */
        register_graphql_field( 'NeatProductSliderBlock', 'products', [
			'type'          => ['list_of' => 'Product'],
			'description'   => __( 'Connected products', 'wp-graphql' ),
			'resolve'       => [$this, 'resolve_connected_products'],
		]);
    }

    /**
     * Get latest products for a block.
     */
    public function resolve_connected_products( $block, $args, $context ) {
        $attributes     = $block->attributes;
        $num_products   = $attributes['numProducts'] ?? 10;
        return $this->get_products( $num_products, $context );
    }

    /**
     * Get a number of products.
     * 
     * @param Int $num_products
     * @param AppContext $context
     * @return Array
     */
    public function get_products( $num_products, $context ) {
       $connected_products  = [];
        $products           = get_posts([
            'post_type'         => 'product',
            'posts_per_page'    => $num_products,
            'fields'            => 'ids',
            'tax_query' => [
                [
                    'taxonomy' => 'product_visibility',
                    'field'    => 'name',
                    'terms'    => ['outofstock'],
                    'operator' => 'NOT IN'
                ],
            ],
        ]);
        $connected_products = [];
        foreach( $products as $product ) {
            $connected_products[]   = Factory::resolve_crud_object( $product, $context );
        }
        return $connected_products; 
    }
}
return new Neat_Blocks_GraphQL();