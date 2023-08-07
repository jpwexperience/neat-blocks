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

class Neat_Blocks_GraphQL_WC {
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
        register_graphql_connection(
			Products::get_connection_config(
				[
					'fromType' => 'NeatProductFeedBlock',
					'resolve'  => static function ( $source, array $args, AppContext $context, ResolveInfo $info ) {
						$resolver = new PostObjectConnectionResolver( $source, $args, $context, $info, 'product' );
						return $resolver->get_connection();
					},
				]
			)
		);

        /**
         * Connect products to product slider block
         * Don't need pagination for the slider
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
        $product_ids    = $attributes['productIds'] ?? '';
        $product_ids    = preg_replace( '/\s+/', '', $product_ids );
        $product_ids    = empty($product_ids) ? [] : explode(',', $product_ids);
        return $this->get_products( $context, $num_products, $product_ids );
    }

    /**
     * Get a number of products.
     * 
     * @param Int $num_products
     * @param AppContext $context
     * @return Array
     */
    public function get_products( $context, $num_products = 10, $product_ids = [] ) {
       $connected_products  = [];
        $args = [
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
        ];
        if( !empty($product_ids) ) {
            $args['post__in']   = $product_ids;
            $args['orderby']    = 'post__in';
        }
        $products           = get_posts( $args );
        $connected_products = [];
        foreach( $products as $product ) {
            $connected_products[]   = Factory::resolve_crud_object( $product, $context );
        }
        return $connected_products; 
    }
}
return new Neat_Blocks_GraphQL_WC();