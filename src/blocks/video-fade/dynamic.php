<?php

namespace CD\Lightbox;

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
    $block_class    = $attributes['blockClass'] ?: 'wp-block-default';
    $slides         = $attributes['slides'] ?? '';
    ob_start();
    ?>
    <div class="video-fade">
        <?php
        $count = 0;
        foreach( $slides as $s ):
            $url        = $s['url'] ?? '';
            $is_first   = $count === 0;
            $class      = $is_first ? 'active' : '';
            $autoplay   = $is_first ? 'autoplay' : '';
        ?>
            <div class="container <?= $class ?>">
                <video muted <?= $autoplay ?>>
                    <source src="<?= $url ?>" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        <? 
            $count++;
        endforeach; 
        ?>

        <div class="overlay"></div>
    </div>
    <?php
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}
