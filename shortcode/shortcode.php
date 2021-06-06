<?php
// [budgets-emp terms="https://link" poli="https://link"]
if(!shortcode_exists('budgets-emp')) {

  function bemp_shortcode($atts) {
    $atributes = shortcode_atts( array(
      'wsp'   => '541149472377',
      'msj'   => '',
      'type'  => 'cars',
      'max_km'=> 200000
    ), $atts );

    // Save necessary data on JS global variables
    $wsp = $atributes['wsp'];
    $msj = $atributes['msj'];
    $url = plugins_url('', __DIR__ );
    $max_km = $atributes['max_km'];
    $js_variables = '<script>'.
                      'var bempWsp = "'. $wsp .'"; '.
                      'var bempMsj = "'. $msj .'";'.
                      'var bempUrl = "'. $url .'";'.
                      'var bempMaxKm = "'. $max_km .'";'.
                    '</script>';

    // Enqueue basic Js and Css
    add_action('wp_enqueue_scripts','add_bemp_styles', 9, 1);
    add_action('wp_enqueue_scripts','add_bemp_script', 9, 1);

    // Enqueue specific Js and Css
    $type = $atributes['type'];
    if($type == 'cars'){
      add_action('wp_enqueue_scripts','add_bemp_cars_script', 9, 1);
    }

    // Components
    return '<div style="height:100vh;"></div>
            <div id="bemp-page">
              <div class="emp-background-image1"></div>
              <div id="bemp-div" class="bemp-fade-in" style="opacity:0;height:0">
                <h1 id="bemp-h1" class="text-mobile"></h1>
                <div id="bemp-breadcrumbs"></div>
                <div id="bemp-container-options" class="border-30px">
                  <ul id="bemp-options"></ul>
                </div>
                <div id="bemp-buttons">
                  <button id="bemp-btn-prev" class="bemp-btn bemp-btn-disabled" onclick="bempPrevStep()">Anterior</button>
                  <button id="bemp-btn-next" class="bemp-btn bemp-btn-disabled" onclick="bempNextStep()">Siguiente</button>
                </div>
              </div>
            </div>'.
            $js_variables;
  }
  add_shortcode('budgets-emp', 'bemp_shortcode');
}
?>
