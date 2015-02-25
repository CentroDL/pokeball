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

  // on the page load
  // get the list of pokeballs in the database
  $.ajax({
    url: '/pokeballs',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(list_of_pokeballs) {
    console.log(list_of_pokeballs);

    // iterate of the list of pokeballs
    for(var i=0, len=list_of_pokeballs.length;i<len;i++) {

      // get the pokeball list id
      var id = list_of_pokeballs[i].id;

      // with that id, make another AJAX call to the pokeball list of pokemons
      $.ajax({
        url: '/pokeballs/' + id,
        type: 'GET',
        dataType: 'JSON'
      }).done(function(pokeball_detail) {
        console.log(pokeball_detail);

        // given all of a pokeball's detailed information
        // get the pokeballs pokemons
        var pokemons = pokeball_detail.pokemons;
        // get the name of the pokeball's owner (as lowercase)
        var name = pokeball_detail.pokeball.name.toLowerCase();

        // given the owner's name, we grab the HTML element that shows their pokemon
        var $list = $('[data-name=' + name + ']');

        // iterate over the list of pokemon
        for (var j=0,len=pokemons.length;j<len;j++){
          // append each pokemon to the DOM
          attachSmallPokemonTemplate(pokemons[j], $list.find('.panel-body'));
        }
      });
    }
  });
});

// Utility function!

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
