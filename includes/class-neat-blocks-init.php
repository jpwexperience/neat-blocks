<?php
/**
 * Handle frontend scripts
 *
 * @package Neat_Blocks
 * @version 0.1.0
 */
defined( 'ABSPATH' ) || exit;

/**
 * Frontend scripts class.
 */
class Neat_Blocks_Init {
    /**
	 * Hook methods
	 */
	public function __construct() {
		$this->include();
        add_action( 'init', [$this, 'init']);
		add_action( 'block_categories_all', [$this, 'block_categories'], 10, 2 );
	}
    
    /**
     * Include dynamic files
     */
    public function include() {
        include NEAT_BLOCKS_ABSPATH . '/src/blocks/video-fade/dynamic.php';
        include NEAT_BLOCKS_ABSPATH . '/src/blocks/post-feed/dynamic.php';
    }
    
    /**
     * Initialize
     */
    public function init() {
        // Prepare file paths
        $build_path     = NEAT_BLOCKS_URL . 'build/';
        $asset_file     = include( NEAT_BLOCKS_ABSPATH . 'build/index.asset.php' );
        $version        = $asset_file['version'] ?? null;
        $dependencies   = $asset_file['dependencies'] ?? [];

        // Register assets
        wp_register_style( 'neat-blocks', $build_path . 'index.css', null, $version );
        wp_register_script( 'neat-blocks-editor', $build_path . 'index.js', $dependencies, $version);
        wp_register_style( 'neat-blocks-editor', $build_path . 'index.css', ['wp-edit-blocks'], $version);
        
        // Need this to get other blocks going    
        register_block_type( 'neat/init', [
            'style'         => 'neat-blocks',
            'editor_script' => 'neat-blocks-editor',
        ]);
    }
	
    /**
     * Custom block categories
     */
	public function block_categories( $categories, $context ) {
        $categories[] = [
            'slug'  => 'neat_blocks',
            'title' => 'Neat Blocks',
        ];
        return $categories;
	}
}
return new Neat_Blocks_Init();