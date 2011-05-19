/************************************************************************
 * @name:  fb-friendcompleter
 * @author: (c) Rafi Jacoby
 * @version: 0.0.1
 * @depends: Facebook JSDK, jQuery UI
 ************************************************************************/

var fbFriendList;

function populateFriendList() {
  if (!fbFriendList) {
    FB.api('/me/friends', function(response) {
      fbFriendList = response.data;
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
            // value: item.id,
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
