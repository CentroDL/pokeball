console.log('loaded, bru.');

var $randomPokemon, // page element references (set on load below...)
    $newPokeball,
    $pokeballs,
    $pokeballListEl,
    $pokemon;

// Attach and template methods for new pokeballs and new pokemon in pokeballs!
var attachPokeball = function(attributes) {
  // call your pokeball template and then append it where it should go
}
var $templatePokeball = function(attributes) {
  // create a small jQuery template for pokéballs
}

$(document).ready(function() {
  $randomPokemon = $('#show-random-poke');
  $newPokeball   = $('#add-pokeball');
  $pokeballs     = $('.panel');
  $pokeballListEl = $('.pokeballs');

  $('#generate-random-poke').on('click', function(e) {
    $.ajax({
      url:  '/pokemons?random=true',
      type: 'GET',
      // data: { id: ... },
      dataType: 'json'
    }).done(function(data){
      // console.log(data);
      attachLargePokemonTemplate(data);
    });
  });

  loadPokeballs();
});

// Utility function!

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
