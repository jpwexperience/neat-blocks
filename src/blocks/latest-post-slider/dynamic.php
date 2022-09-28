<?php
namespace Neat\LatestPostSlider;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');
function register_dynamic_block() {
    // Only load if Gutenberg is available.
    if (!function_exists('register_block_type')) {
        return;
    }

    $config     = get_config_attributes(__DIR__ . '/block.json');
    $name       = $config['name'];
    $attributes = $config['attributes'];

    // Hook server side rendering into render callback
    // Make sure name matches registerBlockType in ./index.js (main jblock js file)
    //register_block_type($name, [
    register_block_type(__DIR__, [
        'attributes'        => $attributes,
        'render_callback'   => __NAMESPACE__ . '\render_dynamic_block'
    ]);
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
 * Things to have attributes for
 *  - Posts per page
 *  - Post Type
 *  - ID Include/Exclude
 *  - Taxonomy Include/Exclude 
 *
 * @param array     $attributes block attributes
 * @return string   block markup
 */
function render_dynamic_block($attributes) {
    $block_class    = $attributes['blockClass'] ?? 'wp-block-default';
    $post_args      = [
        'post_type'         => 'post',
        'posts_per_page'    => 5,
        'post_status'       => 'publish',
        'fields'            => 'ids',
    ];
    $posts          = get_posts( $post_args );
    ob_start();
    ?>
    <div class="<?= $block_class ?>">
        <div class="neat-slider">
            <button class="neat-slider__nav button backward"><span class="sr-only">previous slide</span></button>
            <button class="neat-slider__nav button forward"><span class="sr-only">next slide</span></button>
            <?php 
            $count = 0;
            foreach( $posts as $p ): 
                $title          = get_the_title( $p );
                $featured_id    = get_post_thumbnail_id( $p );
                $featured_url   = wp_get_attachment_url( $featured_id );
                $featured_alt   = get_post_meta( $featured_id, '_wp_attachment_image_alt', true );
                $excerpt        = get_the_excerpt( $p );
            ?>
                <div class="neat-slider__slide <?= $count === 0 ? 'is-current' : '' ?>">
                    <div class="neat-slider__slide__image">
                        <img class="neat-slider__slide__image__src" src="<?= $featured_url ?>" alt="<?= $featured_alt ?>" />
                    </div>
                    <div class="neat-slider__slide__content">
                        <h2 class="neat-slider__slide__content__title"><?= $title ?></h2>
                        <div class="neat-slider__slide__content__excerpt">
                            <?= $excerpt ?>
                        </div>
                    </div>
                </div>
            <?php 
                $count++;
            endforeach; 
            ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
