/*
 * Copyright (C) 2011  JTalks.org Team
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

function deleteMessages(identifiers) {
	// add identifiers of the checked private messages for deletion
	var deleteForm = $("#deleteForm")[0];
	var field = document.createElement("input");
	field.setAttribute("type", "hidden");
	field.setAttribute("name", "pmIdentifiers");
	field.setAttribute("value", identifiers + "");
	deleteForm.appendChild(field);
}

// enable/disable delete button
function setDeleteCheckedPmEnabled(isEnabled) {
	if (isEnabled) {
		$('#deleteCheckedPM').removeAttr('disabled');
		$('#deleteCheckedPM').removeClass('disabled');
	} else {
		$('#deleteCheckedPM').attr('disabled', 'disabled');
		$('#deleteCheckedPM').addClass('disabled');
	}
}

// setup enable/disable state of delete button based on number of 
// selected messages
function setDeleteCheckedPmState() {
	numberOfSelectedMessages = $('.checker:checked').length;		
	setDeleteCheckedPmEnabled(numberOfSelectedMessages > 0);
}



$(document).ready(function () {
	var numberOfSelectedMessages = 0;
	
	setDeleteCheckedPmEnabled(false);
	
	// collect checked private messages
    $("#deleteCheckedPM").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            var messages = $(".check");
            var identifiers = [];
            $.each(messages, function(index, value) {
            	identifiers[index] = value.id;
            });
			
			if (identifiers.length > 0) {
				var deletePath = $(this)[0].href;
				var deletePmPromt = $labelDeletePmGroupConfirmation.replace('%s', identifiers.length);
				$.prompt(deletePmPromt,
					{
						buttons:{ Ok:true, Cancel:false },
						persistent:false,
						submit:function (confirmed) {
							if (confirmed) {
								deleteMessages(identifiers);
								var deleteForm = $('#deleteForm')[0];
								deleteForm.action = deletePath;
								deleteForm.submit();
							}
						}
					}
				);
			}	
        });
    });
    // get private message identifier
    $("#deleteOnePM").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            var identifiers = [];
           	identifiers[0] = $("#PMId").val();
            deleteMessages(identifiers);
        });
    });
	
	
	
	// count number of checked checkboxes
	$('.checker').on('click', setDeleteCheckedPmState);	
	$('.check_all').on('click', setDeleteCheckedPmState);
    
});
