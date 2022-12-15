<?php
/**
 * Register block meta
 *
 * @package Neat_Blocks
 * @version 0.1.0
 */
defined( 'ABSPATH' ) || exit;

/**
 * Frontend scripts class.
 */
class Neat_Blocks_Meta {
    /**
     * Kick things off
     */
    public function __construct() {
        $this->init();
    }
    
    /**
     * Hook functions
     */
    public function init() {
        add_action( 'init', [$this, 'register_clip_meta'] );
    }
    
    /**
     * Register clip metadata
     */
    public function register_clip_meta() {
        register_post_meta( 'post', '_clip_data', [
            'show_in_rest' 	=> true,
            'single'       	=> true,
            'type'         	=> 'string',
            // Might need object subtype here
            'object_subtype'    => 'clip',
            'auth_callback'	=> function() {
                return current_user_can( 'edit_posts' );
            }
        ]);
    }
}
return new Neat_Blocks_Meta();