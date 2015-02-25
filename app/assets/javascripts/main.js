console.log('loaded, bru.');

var $randomPokemon, // page element references (set on load below...)
    $newPokeball,
    $pokeballs,
    $pokeballListEl;

// Below are the functions necessary to create the HTML for a Pokemon
// object on the screen. You need to call the first function with a
// JS object that has the attributes id, name, pkdx_id, and image_url
// (at least), and a string name of who can catch it

var attachLargePokemonTemplate = function(attributes) {
  clearRandomPokemon();
  $randomPokemon.removeClass('empty');
  $pokemon = $templatePokemonLarge(attributes, capitalize(iChoseNext()));
  $randomPokemon.append($pokemon);
}
var clearRandomPokemon = function() {
  $randomPokemon.children().fadeOut().remove();
}
var $templatePokemonLarge = function(attributes, person) {
  $template = $('<div class="pokemon template large animated zoomIn">')
                .attr('data-rid',     attributes.id) // rails id
                .attr('data-pkdx-id', attributes.pkdx_id);
  $('<h4>').text(attributes.name).appendTo($template);
  $image = $('<img class="poke-sprite" width="120"/>')
             .attr('src', attributes.image_url);
  $('<div class="sprite-canvas">')
    .append($image)
    .appendTo($template);
  $('<br>').appendTo($template);
  $('<button type="button" class="btn btn-md btn-default" id="catch-pokemon">')
    .text('Catch for ' + person + '!')
    .on('click', catchPokemon)
    .appendTo($template);
  return $template;
}

// Attach and template methods for new pokeballs and new pokemon in pokeballs!
var attachPokeball = function(attributes) {
  // call your pokeball template and then append it where it should go
}
var $templatePokeball = function(attributes) {
  // create a small jQuery template for pokéballs
}
var attachSmallPokemonTemplate = function(attributes, elementAppendedTo) {
  // call your small template and then append it where it should go
}
var $templatePokemonSmall = function(attributes) {
  // create a small jQuery template for Pokémon
  // to insert into your Poké ball!
}

// Click methods
var catchPokemon = function(e) {
  $chosen_player = $('.chosen').children().first();
  $pokemon       = $(e.target).parent();

  // this is a stub...
  // fires when you click the catch button (see large template above)

  console.log($chosen_player.data('name') + ' --> ' + $pokemon.data('rid'));
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
var currentPlayer = function($chosen) {
  return $chosen.children().first().data('name');
}

$(document).ready(function() {
  $randomPokemon = $('#show-random-poke');
  $newPokeball   = $('#add-pokeball');
  $pokeballs     = $('.panel');
  $pokeballListEl = $('.pokeballs');

  $('#generate-random-poke').on('click', function(e) {
    // get a random pokemon from the database and
    // attach it to the DOM (with the large template)
    e.preventDefault();

    $.ajax({
      url: '/pokemons',
      data: { random: 'true'},
      type: 'get',
      dataType: 'json'
    }).done(function(data){
      attachLargePokemonTemplate(data);
    });

  });
});

// Utility function!

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
