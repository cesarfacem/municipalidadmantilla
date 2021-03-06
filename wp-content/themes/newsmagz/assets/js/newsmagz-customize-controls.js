jQuery(document).ready(function () {
    'use strict';
    /* Widget accordion */

    jQuery('#customize-theme-controls').on('click', '.newsmagz-ad-widget-top', function () {
        jQuery(this).next().slideToggle();
    });

    jQuery('#customize-theme-controls').on('change', '.newsmagz-small-ad-type', function () {
        var th = jQuery(this);
        if (th.is(':checked')) {

            if (th.val() === 'image') {
                th.parent().next().show();
                th.parent().next().next().hide();
            } else {
                th.parent().next().hide();
                th.parent().next().next().show();
            }
        }
    });

 

    /* Banner control */

    jQuery('#customize-theme-controls').on('change', '.newsmagz-a-d-v-select', function () {
        var value = jQuery(this).val();

        if (value === 'code') {
            jQuery(this).parent().children('.newsmagz-a-d-v-choice-code').show();
            jQuery(this).parent().children('.newsmagz-a-d-v-choice-image').hide();
        } else {
            jQuery(this).parent().children('.newsmagz-a-d-v-choice-image').show();
            jQuery(this).parent().children('.newsmagz-a-d-v-choice-code').hide();
        }
        newsmagz_refresh_banner_control();
        return false;
    });

    jQuery('#customize-theme-controls').on('change', '.newsmagz-a-d-v-position', function () {
        newsmagz_refresh_banner_control();
        return false;
    });


    jQuery('#customize-theme-controls').on('change', '.custom_media_url', function () {
        newsmagz_refresh_banner_control();
        return false;
    });

    jQuery('#customize-theme-controls').on('keyup', '.newsmagz-a-d-v-link', function () {
        newsmagz_refresh_banner_control();
        return false;
    });

    jQuery('#customize-theme-controls').on('keyup', '.newsmagz-a-d-v-settings-text-control', function () {
        newsmagz_refresh_banner_control();
        return false;
    });


});
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
};


function newsmagz_escapeHtml(string) {
    'use strict';
    //noinspection JSUnresolvedFunction
    string = String(string).replace(new RegExp('\r?\n', 'g'), '<br />');
    string = String(string).replace(/\\/g, '&#92;');
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });

}

function newsmagz_refresh_banner_control() {
    'use strict';
    var values = {};
    var th = jQuery('.newsmagz-a-d-v-settings-container');

    var banner_choice = th.find('.newsmagz-a-d-v-select:checked').val();
    var banner_position = th.find('.newsmagz-a-d-v-position:checked').val();
    var img_url = th.find('.custom_media_url').val();
    var link = th.find('.newsmagz-a-d-v-link').val();
    var code = th.find('.newsmagz-a-d-v-settings-text-control').val();
    if (( banner_choice === 'code' && code !== '' ) || ( banner_choice === 'image' && img_url !== '' ) || ( banner_position !== '' )) {
        values = {
            'choice': banner_choice,
            'position': banner_position,
            'image_url': img_url,
            'link': link,
            'code': newsmagz_escapeHtml(code)
        };
    }
    th.find('.newsmagz-a-d-v-colector').val(JSON.stringify(values));
    th.find('.newsmagz-a-d-v-colector').trigger('change');

}
