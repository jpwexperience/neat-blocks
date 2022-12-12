<?php
/**
 * Plugin Name: Neat Blocks
 * Description: In-house gutenberg blocks
 * Version: 0.1.0
 * Author: John Williams
 * Author URI: https://jpwexperience.com
 * Text Domain: neat_blocks
 * 
 * Requires at least: 5.8
 * Requires PHP: 7.3
 * @package Neat_blocks
 * @link https://github.com/DevinVinson/WordPress-Plugin-Boilerplate
 * @link https://github.com/woocommerce/woocommerce
 * 
 * This should get absorbed into neat-core
 */
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'NEAT_BLOCKS_PLUGIN_FILE' ) ) define( 'NEAT_BLOCKS_PLUGIN_FILE', __FILE__ );

// Include main class
if ( !class_exists('Neat_Blocks', false) ) {
	include_once dirname(NEAT_BLOCKS_PLUGIN_FILE) . '/includes/class-neat-blocks.php';
}

/**
 * Returns the main instance of Neat_Blocks
 *
 * @since  0.1.0
 * @return Neat_Blocks
 */
function Neat_Blocks() { // phpcs:ignore WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
	return Neat_Blocks::instance();
}
Neat_Blocks();