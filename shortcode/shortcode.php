<?php
// [budgets-emp type="cars" msj="Hello this is a final message" wsp="12345678"]
if(!shortcode_exists('budgets-emp')) {

  function bemp_shortcode($atts) {
    $atributes = shortcode_atts( array(
      'wsp'   => '541149472377',
      'msj'   => '',
      'type'  => 'cars',
      'bg'  => '',
      'img'  => '',
      'max_km'=> 200000
    ), $atts );

    // Save necessary data on JS global variables
    $wsp = $atributes['wsp'];
    $msj = $atributes['msj'];
    $bg = $atributes['bg'];
    $img = $atributes['img'];
    $url = plugins_url('', __DIR__ );
    $max_km = $atributes['max_km'];
    $js_variables = '<script>'.
                      'var bempWsp = "'. $wsp .'"; '.
                      'var bempMsj = "'. $msj .'";'.
                      'var bempBg = "'. $bg .'";'.
                      'var bempImg = "'. $img .'";'.
                      'var bempUrl = "'. $url .'";'.
                      'var bempMaxKm = "'. $max_km .'";'.
                    '</script>';

    // Enqueue basic Js and Css
    add_action('wp_enqueue_scripts','add_bemp_styles', 9, 1);
    add_action('wp_enqueue_scripts','add_bemp_script', 9, 1);

    // Enqueue specific Js and Css
    $type = $atributes['type'];
    if($type == 'emp'){
      add_action('wp_enqueue_scripts','add_bemp_emp_script', 9, 1);
    }else if($type == 'cars'){
      add_action('wp_enqueue_scripts','add_bemp_cars_script', 9, 1);
    }else if($type == 'awe'){
      add_action('wp_enqueue_scripts','add_bemp_awe_script', 9, 1);
    }else if($type == 'bojko'){
      add_action('wp_enqueue_scripts','add_bemp_realstate_script', 9, 1);
      add_action('wp_enqueue_scripts','add_bemp_bojko_script', 8, 1);
    }else if($type == 'breycon'){
      add_action('wp_enqueue_scripts','add_bemp_breycon_script', 9, 1);
    }else if($type == 'accountant'){
      add_action('wp_enqueue_scripts','add_bemp_accountant_script', 9, 1);
    }else if($type == 'example'){
      add_action('wp_enqueue_scripts','add_bemp_example_script', 9, 1);
    }else if($type == 'hotel'){
      add_action('wp_enqueue_scripts','add_bemp_hotel_script', 9, 1);
    }else if($type == 'somi'){
      add_action('wp_enqueue_scripts','add_bemp_somi_script', 9, 1);
    }

    // Components
    return '<div style="height:100vh;"></div>
            <div id="bemp-page">
              <div id="bemp-background"></div>
              <div id="bemp-section">
                <div id="bemp-div" class="bemp-fade-in">
                  <div class="m-auto w-100">
                    <h1 id="bemp-h1"></h1>
                    <div id="bemp-breadcrumbs"></div>
                    <div id="bemp-container-options">
                      <ul id="bemp-options"></ul>
                    </div>
                  </div>
                  <div id="bemp-buttons">
                    <button id="bemp-btn-prev" class="bemp-btn bemp-btn-disabled btn-outline-light" onclick="bempPrevStep()">Anterior</button>
                    <button id="bemp-btn-next" class="bemp-btn bemp-btn-disabled" onclick="bempNextStep()">Siguiente</button>
                  </div>
                </div>
              </div>
            </div>'.
            $js_variables;
  }
  add_shortcode('budgets-emp', 'bemp_shortcode');
}
?>
