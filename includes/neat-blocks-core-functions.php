<?php
/**
 * Core functions
 */

/**
 * Markup for post blocks
 * 
 * @param array $posts  Array of post IDs
 * @return string
 */
function neat_get_post_blocks( $posts = [] ) {
    ob_start();
    ?>
    <div class="post-blocks">
        <?php foreach( $posts as $p ) {
            echo neat_get_post_block( $p );
        } ?>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Markup for a single post block
 * 
 * @param int $post_id
 * 
 * @return string
 */
function neat_get_post_block( $post_id ) {
    $title          = get_the_title( $post_id );
    $permalink      = get_the_permalink( $post_id );
    $featured_id    = get_post_thumbnail_id( $post_id );
    $featured_url   = wp_get_attachment_url( $featured_id );
    $featured_alt   = get_post_meta( $featured_id, '_wp_attachment_image_alt', true );
    ob_start();
    ?>
    <div class="post-blocks__block">
        <div class="post-blocks__block__image">
            <img class="post-blocks__block__image__src" src="<?= $featured_url ?>" alt="<?= $featured_alt ?>" />
        </div>
        <a href="<?= $permalink ?>">
            <div class="post-blocks__block__content">
                <h2 class="post-blocks__block__content__title"><?= $title ?></h2>
            </div>
        </a>
    </div> 
    <?php
    return ob_get_clean();
}

/**
 * Check is a post has an excerpt and return it. If not, return an 
 * appended version of the content.
 * 
 * @param int $post_id
 * @param int $word_limit
 * 
 * @return string
 */
function neat_get_excerpt( $post_id, $word_limit = 20 ) {
    $has_excerpt    = has_excerpt( $post_id );
    if( $has_excerpt ) {
        return get_the_excerpt( $post_id );
    }
    $excerpt    = apply_filters( 'the_content', get_post_field('post_content', $post_id) );
    return wp_trim_words( $excerpt, $word_limit, '' );
}