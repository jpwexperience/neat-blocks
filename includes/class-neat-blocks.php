<?php
/**
 * Neat Blocks Setup
 *
 * @package Neat_Blocks
 * @since   0.1.0
 */
defined( 'ABSPATH' ) || exit;

/**
 * Main plugin class
 */
final class Neat_Blocks {
	/**
	 * NEAT_BLOCKS version.
	 *
	 * @var string
	 */
	public $version = '0.1.0';
	
	/**
	 * The single instance of the class.
	 *
	 * @var Neat_Blocks
	 */
	protected static $_instance = null;
	
	/**
	 * Main NEAT_BLOCKS Instance.
	 *
	 * Ensures only one instance of NEAT_BLOCKS is loaded or can be loaded.
	 *
	 * @return Neat_Blocks
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	/**
	 * Cloning is forbidden.
	 *
	 * @since 0.1.0
	 */
	public function __clone() {
		error_log( __( 'Cloning is forbidden.', 'neat_blocks' ) );
	}
	
	/**
	 * Unserializing instances of this class is forbidden.
	 *
	 * @since 2.1
	 */
	public function __wakeup() {
		error_log( __( 'Unserializing instances of this class is forbidden.', 'neat_blocks' ) );
	}
	
	/**
	 * Auto-load in-accessible properties on demand.
	 *
	 * @param mixed $key Key name.
	 * @return mixed
	 */
	public function __get( $key ) {
	}
	
	/**
	 * Define constant if not already set.
	 *
	 * @param string      $name  Constant name.
	 * @param string|bool $value Constant value.
	 */
	private function define( $name, $value ) {
		if( !defined($name) ) {
			define( $name, $value );
		}
	}
	
	/**
	 * What type of request is this?
	 *
	 * @param  string $type admin, ajax, cron or frontend.
	 * @return bool
	 */
	private function is_request( $type ) {
		switch( $type ) {
			case 'admin':
				return is_admin();
			case 'ajax':
				return defined( 'DOING_AJAX' );
			case 'cron':
				return defined( 'DOING_CRON' );
			case 'frontend':
				return ( !is_admin() || defined('DOING_AJAX') ) && !defined('DOING_CRON');
		}
	}
	
	/**
	 * Constructor
	 */
	public function __construct() {
		$this->define_constants();
		$this->includes();
		$this->init_hooks();
	}
	
	/**
	 * When WP has loaded all plugins, trigger the `neat_blocks_loaded` hook.
	 *
	 * This ensures `neat_blocks_loaded` is called only after all other plugins
	 * are loaded, to avoid issues caused by plugin directory naming changing
	 * the load order.
	 */
	public function on_plugins_loaded() {
		do_action( 'neat_blocks_loaded' );
	}
	
	/**
	 * Hook into actions and filters.
	 *
	 */
	private function init_hooks() {
		add_action( 'init', [$this, 'init'], 0 );
	}
	
	/**
	 * Define WC Constants.
	 */
	private function define_constants() {
		$this->define( 'NEAT_BLOCKS_VERSION', $this->version );
		$this->define( 'NEAT_BLOCKS_ABSPATH', dirname( NEAT_BLOCKS_PLUGIN_FILE ) . '/' ); // Should replace NEAT_BLOCKS_ROOT
		$this->define( 'NEAT_BLOCKS_ROOT', plugin_dir_path( NEAT_BLOCKS_PLUGIN_FILE ) );
		$this->define( 'NEAT_BLOCKS_URL', plugin_dir_url( NEAT_BLOCKS_PLUGIN_FILE ) );
	}
	
	/**
	 * Include required core files used in admin and on the frontend.
	 */
	public function includes() {
		include_once NEAT_BLOCKS_ABSPATH . 'includes/class-neat-blocks-init.php';
		
		if ( $this->is_request( 'frontend' ) ) {
			$this->frontend_includes();
		}
		
		if ( $this->is_request( 'admin' ) ) {
			//include_once NEAT_BLOCKS_ABSPATH . 'includes/admin/class-neat-blocks-admin.php';
		}
	}

	/**
	 * Include required frontend files.
	 */
	public function frontend_includes() {
		//include_once NEAT_BLOCKS_ABSPATH . 'includes/class-neat-blocks-frontend-scripts.php';	
	}

	/**
	 * Init NEAT_BLOCKS when WP initialises.
	 */
	public function init() {
		do_action( 'neat_blocks_init' );
	}
}