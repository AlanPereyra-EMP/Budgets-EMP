<?php
$src = plugins_url( 'includes/css/bemp.css', __DIR__ );
wp_register_style( 'bemp_css', $src );
function add_bemp_styles(){
  wp_enqueue_style( 'bemp_css', $src);
}
$src = plugins_url( 'includes/js/bemp.js', __DIR__ );
wp_register_script( 'bemp_js', $src );
function add_bemp_script(){
  wp_enqueue_script( 'bemp_js', $src);
}
$src = plugins_url( 'includes/js/bemp-cars.js', __DIR__ );
wp_register_script( 'bemp_cars_js', $src );
function add_bemp_cars_script(){
  wp_enqueue_script( 'bemp_cars_js', $src);
}

// Add Ajax support
wp_localize_script('bemp_cars_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
?>
