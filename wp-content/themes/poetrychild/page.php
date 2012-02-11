<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

/*
	Template Name: Home
*/

$browser = get_browser();
$useragent=$_SERVER['HTTP_USER_AGENT'];
if (ismobile($useragent)) {
	include 'mobile.php';
} else {

get_header(); ?>

		<div id="primary">
			<div id="content" role="main">

				<?php
				
				$args = array(
					'category__not_in' => array( 3, 5 ),
					'posts_per_page' => -1,
					'order' => 'ASC'
				);
				
				// The Query
				$the_query = new WP_Query( $args );

				// The Loop
				while ( $the_query->have_posts() ) : $the_query->the_post(); 
					$slug = basename(get_permalink()); ?>
					
					<?php if (has_post_thumbnail( $post->ID )) : ?>
						<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
						<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
							
								<div class="entry-content" style="background-image: url('<?php echo $image[0]; ?>')" >
									<div class="poem" id="<?php echo $slug; ?>">
										<div class="innerWrapper">
											<div class="poem-title">
												<?php the_title(); ?>
											</div>
											<?php 
												$subtitle = get_post_meta($post->ID, 'subtitle', true);
												if (strlen($subtitle) > 1) {
													echo '<div class="subtitle">';
													echo $subtitle;
													echo '</div>';
												}
												$quote = get_post_meta($post->ID, 'quote', true);
												if (strlen($quote) > 1) {
													echo '<div class="quote">';
													echo $quote;
													echo '</div>';
												}
												$author = get_post_meta($post->ID, 'author', true);
												if (strlen($author) > 1) {
													echo '<div class="author">';
													echo $author;
													echo '</div>';
												}	
											?>
											<div class="poem-body-home">
												<div class="poem-body">
													<?php the_content(); ?>
												</div>
											</div>
										</div>
									</div>
								</div>
							
						</article><!-- #post-<?php the_ID(); ?> -->
					<?php endif; ?>
				<?php endwhile;
				// Reset Post Data
				wp_reset_postdata();
				?>
			</div><!-- #content -->
		</div><!-- #primary -->
		<div id="secondary">
			
			<div id="table-of-contents" class="table-of-contents page-light-box">
				<div class="innerWrapper">
					<div class="section-header">
						Table of Contents
					</div>
					<ul class="poem-titles">
			
						<?php $args = array(
							'category__not_in' => 3,
							'posts_per_page' => -1,
							'order' => 'ASC'
						);
			
						// The Query
						$the_query = new WP_Query( $args );

						// The Loop
						while ( $the_query->have_posts() ) : $the_query->the_post(); 
							$slug = basename(get_permalink());
							$author = get_post_meta($post->ID, 'author', true); 
							
							if (strlen($author) > 1) { ?>
								<li><a href="#<?php echo $slug; ?>"><?php the_title(); ?> - <?php echo $author;?></a></li>
							<?php
							} else { ?>
								<li><a href="#<?php echo $slug; ?>"><?php the_title(); ?></a></li>
							<?php }?> 

						<?php endwhile;
						// Reset Post Data
						wp_reset_postdata();
						?>
					</ul>
				</div><!--.innerWrapper-->
			</div><!--.table-of-contents-->
			
			<div id="bios" class="bios page-light-box">
				<div class="innerWrapper">
					<div class="section-header">
						Author's Bios
					</div>
				
			
						<?php $args = array(
							'posts_per_page' => -1,
							'order' => 'ASC'
						);
			
						// The Query
						$the_query = new WP_Query( $args );

						// The Loop
						while ( $the_query->have_posts() ) : $the_query->the_post(); 
						
							$author = get_post_meta($post->ID, 'author', true);
							if (strlen($author) > 1) {
								echo '<div class="author_name">';
								echo $author;
								echo '</div>';
							}
							$bio = get_post_meta($post->ID, 'author_bio', true);
							if (strlen($bio) > 1) {
								echo '<div class="bio_info">';
								echo $bio;
								echo '</div>';
							}
																		
						endwhile;
						// Reset Post Data
						wp_reset_postdata();
						?>
					
				</div><!--.innerWrapper-->
				
			</div>
			
			<div id="gallery" class="gallery page-light-box">
					<div class="innerWrapper">
						<div class="section-header">
							Image Gallery
						</div>
						
						<?php $args = array(
							'cat' => 5
						);
			
						// The Query
						$the_query = new WP_Query( $args );
						while ( $the_query->have_posts() ) : $the_query->the_post();?>
						
						<div class='isotope img_container'><?php the_content(); ?></div>
						
						<?php
						endwhile;
						// Reset Post Data
						wp_reset_postdata();
						?>
					
						
							

						
					</div><!--.innerWrapper-->
			</div>
			
		</div><!-- #secondary -->
		<?php }?> <!-- End ismobile Else section -->
<?php get_footer(); ?>