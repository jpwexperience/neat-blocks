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
 * @param int $post Post ID
 * 
 * @return string
 */
function neat_get_post_block( $post ) {
    ob_start();
    ?>
    <div class="post-blocks__block">
        <h2>Placeholder</h2>
    </div> 
    <?php
    return ob_get_clean();
}