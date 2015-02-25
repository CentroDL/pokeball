var currentPokemonData = function() {
  return {
    id: $pokemon.data('rid'),
    pkdx_id: $pokemon.data('pkdx-id'),
    name: $pokemon.find('h4').text(),
    image_url: $pokemon.find('img').attr('src')
  };
}

var currentPlayer = function($chosen) {
  return $chosen.children().first().data('name');
}

// Click methods 
var catchPokemon = function(e) {
  var $chosen_player = $('.chosen').children().first();
  var $pokemon       = $(e.target).parent();
  var data           = currentPokemonData();

  // tell the DB to add this pokemon to the pokeball
  $.ajax({
    url:  'pokeballs/' + $chosen_player.data('rid') + '/pokemons',
    type: 'POST',
    data: {pokemon_id: data.id}
  }).done(function (success) {
    console.log(success);
    clearRandomPokemon();
    attachSmallPokemonTemplate(data, $chosen_player.find('.panel-body'));
  });

  console.log($chosen_player.data('name') + ' --> ' + $pokemon.data('rid'));
}

var removePokemon = function(e) {
  $pokemon = $(e.target).parent();
  $current_player = $pokemon.parent().parent()
  $.ajax({
    url: '/pokeballs/' + $current_player.data('rid') + '/pokemons/' + $pokemon.data('rid'),
    type: 'DELETE'
  }).done(function() {
    $pokemon.remove();
  })
}

// these methods change the chosen pokeball and return whose pokeball it is
var iChoseNext = function() {
  $col    = $('.pokeball-col');
  $chosen = $('.chosen');
  if ($chosen.length != 0) { // if there is a chosen pokeball!
    $next   = $chosen.next();
    if ($next.hasClass('new-pokeball')) { // start over
      $next = $next.siblings().first();
    }
    $chosen.removeClass('chosen');
    $next.addClass('chosen');

    return currentPlayer($next);
  } else if ($col.length != 0) { // no one chosen yet!
    $chosen = $col.first().addClass('chosen');

    return currentPlayer($chosen);
  } else { // no pokeballs!
    return null;
  }
}

var loadPokeballs = function () {
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
}
