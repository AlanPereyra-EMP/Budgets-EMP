# Budgets-EMP
A budgets generator plugin for WordPress.

## Functionality
The plugin gererate a shortcode, using this shortcode on a page, that page displays an interactive fullscreen form. Then the user could select different options. Finally with the selected options, the phone number and the final message generates a WhastApp message using de WhastApp API.

## Shortcode
The next is a shortcode example:
>[budgets-emp type="cars" msj="Hello this is a final message" wsp="12345678"]

It has three attributes:

### wsp (required)
A phone number with a valid WhatsApp account.

### type (optional)
The type of budget that the plugin return. This could be:
* cars (default value)
(In nexts versions could have more types)

### msj (optional)
This could include a final message on WhatsApp.

### max_km (optional)
Only with the cars mode
