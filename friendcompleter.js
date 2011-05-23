/************************************************************************
 * @name:  friendcompleter
 * @author: (c) Rafi Jacoby
 * @version: 0.2
 * @depends: Facebook JSDK, jQuery UI
 ************************************************************************/

function convertFriendListToCompletable(){
  if (window.fbFriendList && !(window.fbFriendList[0].label)) {
    // We have a friendlist, but it's missing the 'label' field that
    // autocomplete likes.
    $.each(window.fbFriendList, function(idx, item) {
      window.fbFriendList[idx].label = item.name;
    });
    // Sort it so list makes sense in autocomplete results
    window.fbFriendList.sort(function(a, b) {
      var compA = a.name.toUpperCase();
      var compB = b.name.toUpperCase();
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
  }
}

function populateFriendList() {
  if (!window.fbFriendList) {
    FB.api('/me/friends', function(response) {
      window.fbFriendList = response.data;
      convertFriendListToCompletable();
    });
  }
}

function setupFriendCompleter(inputDivId) {
  // Look for an existing global 'fbFriendList', either from a previous
  // run of the function, or set into the page at generation time.
  if (!(window.fbFriendList)) {
    populateFriendList();
  } else {
    // Make sure the pre-existing friend list is autocomplete-friendly
    convertFriendListToCompletable();
  }

  // Make sure we can put our hidden ID somewhere
  if ($('input#fbFriendId').length == 0) {
    $('#fb-root').append("<input id='fbFriendId' name='fbFriendId' type='hidden' value=''/>");
  }

  // Add the custom source and select functions to the autocompleter.
  $(inputDivId).autocomplete({
    source: function(request, response) {
      var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
      var suggestions = [];
      $.each(fbFriendList, function(idx, item) {
        friendName = item.name || item;
        if (matcher.test(friendName)) {
          suggestions.push(item);
        }
      });
      response(suggestions);
    },
    select: function(event, ui) {
      var selectedObj = ui.item;
      $('input#fbFriendId').val(selectedObj.id);
      $(this).val(selectedObj.label);
      return false;
    }
  });
}
