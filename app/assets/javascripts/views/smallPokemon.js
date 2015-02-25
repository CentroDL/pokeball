var attachSmallPokemonTemplate = function(attributes, $elementAppendedTo) {
  var $template = $templatePokemonSmall(attributes);
  $template.appendTo($elementAppendedTo);
}
var $templatePokemonSmall = function(attributes) {
  // <div class="pokemon template small animated zoomIn" data-rid="25" data-pkdx-id="25">
  //   <h4>Pikachu</h4>
  //   <img class="poke-sprite" width="120" src="http://pokeapi.co/media/img/25.png">
  // </div>
  var $template = $('<div class="pokemon template small animated zoomIn">')
                    .attr('data-rid', attributes.id)
                    .attr('data-pkdx-id', attributes.pkdx_id)
  $('<h4>').text(attributes.name).appendTo($template);
  $('<img class="poke-sprite" width="120">').attr('src', attributes.image_url)
    .appendTo($template);

  return $template;
}
