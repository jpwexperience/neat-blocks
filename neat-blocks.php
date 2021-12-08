<?php
/**
 * Plugin Name: Neat Blocks
 * Description: Custom Neat Film Gutenberg Blocks
 * Author: John Williams
 * Author URI: https://jpwexperience
 * Version: 0.0.0
 */

if ( !defined( 'ABSPATH' ) ) exit;

// Register Block Category
function neat_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'neat-blocks',
				'title' => __( 'Neat Blocks', 'neat-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'neat_block_category', 10, 2);

// Register block types
add_action('init', function(){

	// Prepare file paths
	$dist = 'build';
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );

	// Register assets
	wp_register_style('neat-blocks', plugins_url("$dist/index.css", __FILE__), null, $asset_file['version']);
	wp_register_script('neat-blocks-editor', plugins_url("$dist/index.js", __FILE__), $asset_file['dependencies'], $asset_file['version']);
	wp_register_style('neat-blocks-editor', plugins_url("$dist/index.css", __FILE__), ['wp-edit-blocks'], $asset_file['version']);

	// Register custom blocks
	// I guess you need something to kick it all off 
	register_block_type('neat/anything', [
		'style' => 'neat-blocks',
		'editor_script' => 'neat-blocks-editor',
	]);

});

// Load dynamic block files
include __DIR__ . '/src/blocks/blah/blah.php';
