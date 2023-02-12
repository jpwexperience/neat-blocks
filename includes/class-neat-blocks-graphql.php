<?php
/**
 * GraphQL endpoints
 * 
 * Main for meta values
 */
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
        add_action( 'graphql_register_types', [$this, 'clip_data'] );
    }
    
    public function clip_data() {
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