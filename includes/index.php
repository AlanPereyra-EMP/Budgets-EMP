<?php
// Plugin base
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

// Plugin modes
$src = plugins_url( 'includes/js/bemp-cars.js', __DIR__ );
wp_register_script( 'bemp_cars_js', $src );
function add_bemp_cars_script(){
  wp_enqueue_script( 'bemp_cars_js', $src);
}
$src = plugins_url( 'includes/js/bemp-awe.js', __DIR__ );
wp_register_script( 'bemp_awe_js', $src );
function add_bemp_awe_script(){
  wp_enqueue_script( 'bemp_awe_js', $src);
}

$src = plugins_url( 'includes/js/bemp-somi.js', __DIR__ );
wp_register_script( 'bemp_somi_js', $src );
function add_bemp_somi_script(){
  wp_enqueue_script( 'bemp_somi_js', $src);
}
$src = plugins_url( 'includes/js/bemp-realstate.js', __DIR__ );
wp_register_script( 'bemp_realstate_js', $src );
function add_bemp_realstate_script(){
  wp_enqueue_script( 'bemp_realstate_js', $src);
}
$src = plugins_url( 'includes/js/bemp-bojko.js', __DIR__ );
wp_register_script( 'bemp_bojko_js', $src );
function add_bemp_bojko_script(){
  wp_enqueue_script( 'bemp_bojko_js', $src);
}
$src = plugins_url( 'includes/js/bemp-breycon.js', __DIR__ );
wp_register_script( 'bemp_breycon_js', $src );
function add_bemp_breycon_script(){
  wp_enqueue_script( 'bemp_breycon_js', $src);
}
$src = plugins_url( 'includes/js/bemp-accountant.js', __DIR__ );
wp_register_script( 'bemp_accountant_js', $src );
function add_bemp_accountant_script(){
  wp_enqueue_script( 'bemp_accountant_js', $src);
}
$src = plugins_url( 'includes/js/bemp-example.js', __DIR__ );
wp_register_script( 'bemp_example_js', $src );
function add_bemp_example_script(){
  wp_enqueue_script( 'bemp_example_js', $src);
}
$src = plugins_url( 'includes/js/bemp-hotel.js', __DIR__ );
wp_register_script( 'bemp_hotel_js', $src );
function add_bemp_hotel_script(){
  wp_enqueue_script( 'bemp_hotel_js', $src);
}
$src = plugins_url( 'includes/js/bemp-emp.js', __DIR__ );
wp_register_script( 'bemp_emp_js', $src );
function add_bemp_emp_script(){
  wp_enqueue_script( 'bemp_emp_js', $src);
}

// Add Ajax support
wp_localize_script('bemp_cars_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_awe_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_bojko_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_realstate_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_breycon_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_accountant_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_example_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('bemp_hotel_js', 'bempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
?>
