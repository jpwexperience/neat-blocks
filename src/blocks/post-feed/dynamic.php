<?php

namespace Neat\PostFeed;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');
function register_dynamic_block() {

    // Only load if Gutenberg is available.
    if (!function_exists('register_block_type')) {
        return;
    }

    $config = get_config_attributes(__DIR__ . '/block.json');
    $name       = $config['name'];
    $attributes = $config['attributes'];

    // Hook server side rendering into render callback
    // Make sure name matches registerBlockType in ./index.js (main jblock js file)
    register_block_type($name, array(
        'attributes'        => $attributes,
        'render_callback'   => __NAMESPACE__ . '\render_dynamic_block'
    ));
}

/**
 * Returns decoded JSON config file
 *
 * @param string $json_path
 * @return array block attributes
 */
function get_config_attributes($json_path) {
    $config_contents    = file_get_contents($json_path);
    $config_decode      = json_decode($config_contents, true);
    return $config_decode;
}

/**
 * Render Dynamic Block
 *
 * @param array     $attributes block attributes
 * @return string   block markup
 */
function render_dynamic_block($attributes) {
    $block_class    = $attributes['blockClass'] ? $attributes['blockClass'] : 'wp-block-default';
    $args = [
        'post_type'         => 'post',
        'post_status'       => 'publish',
        'posts_per_page'    => -1,
    ];

    $query = new \WP_Query($args);
    
    ob_start();
    echo "<div class='$block_class'>";

    if( $query->have_posts() ) {
        while( $query->have_posts() ) {
            $query->the_post();
            $post_id        = get_the_ID();

            $image_id       = get_post_thumbnail_id();
            $image_url      = wp_get_attachment_url($image_id);
            $image_alt      = get_post_meta($image_id, '_wp_attachment_image_alt', true);
            $title          = get_the_title();

            ?>
            <div class="post">
                <a href="<?= get_the_permalink() ?>">
                    <div class="container">
                        <img src="<?= $image_url ?>" alt="<?= $image_alt ?>" />
                    </div>
                    <h2 class="title"><?= $title ?></h2>
                </a>
            </div>
            <?php
        }
    }

    echo '</div>';

    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}
