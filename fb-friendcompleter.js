/************************************************************************
 * @name:  fb-friendcompleter
 * @author: (c) Rafi Jacoby
 * @version: 0.0.1
 * @depends: Facebook JSDK, jQuery UI
 ************************************************************************/

function populateFriendList() {
  // Look for an existing global 'fbFriendList', either from a previous
  // run of the function, or set into the page at generation time.
  if (!window.fbFriendList) {
    FB.api('/me/friends', function(response) {
      window.fbFriendList = response.data;
    });
  }
}

function setupFbAutocompleter() {
  $('#fb-root').append("<input id='fbFriendId' name='fbFriendId' type='hidden' value=''/>");

  $('#footer').append("<div id='picker'><input id='fbFriend'/></div>");
  populateFriendList();

  $("input#fbFriend").autocomplete({
    source: function(request, response) {
      var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
      var suggestions = [];
      $.each(fbFriendList, function(idx, item) {
        friendName = item.name || item;
        if (matcher.test(friendName)) {
          suggestions.push({
            label: friendName,
            fbId: item.id
          });
        }
      });
      response(suggestions);
    },
    select: function(event, ui) {
      var selectedObj = ui.item;
      $('input#fbFriendId').val(selectedObj.fbId);
      $(this).val(selectedObj.label);
      return false;
    }
  });

}
