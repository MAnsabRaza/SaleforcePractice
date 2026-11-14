'use strict';

var activeRequest;

function getModal() {
    var $modal = $('#miniDetailsModal');

    if (!$modal.length) {
        $('body').append(
            '<div class="modal fade" id="miniDetailsModal" tabindex="-1" role="dialog" aria-labelledby="miniDetailsTitle" aria-hidden="true">'
            + '<div class="modal-dialog" role="document"><div class="modal-content">'
            + '<div class="modal-header"><h5 class="modal-title" id="miniDetailsTitle">Details</h5>'
            + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            + '<div class="modal-body" aria-live="polite"></div>'
            + '</div></div></div>'
        );
        $modal = $('#miniDetailsModal');
    }

    return $modal;
}

function showMiniDetails() {
    $('body').on('click', '.mini-details', function () {
        var $button = $(this);
        var $modal = getModal();
        var $body = $modal.find('.modal-body');
        var request;

        if (activeRequest) {
            activeRequest.abort();
        }

        $body.text($button.data('loading-text'));
        $modal.modal('show');

        request = $.ajax({
            url: $button.data('url'),
            method: 'GET',
            dataType: 'html'
        }).done(function (html) {
            var $confirmation = $('<div class="alert alert-success" role="status"></div>');
            $confirmation.text($button.data('confirmation-text'));
            $body.empty().append($confirmation).append(html);
        }).fail(function (xhr, status) {
            if (status === 'abort') {
                return;
            }

            var message = xhr.status === 404
                ? $button.data('not-found-text')
                : $button.data('error-text');
            $body.text(message);
        }).always(function () {
            if (activeRequest === request) {
                activeRequest = null;
            }
        });

        activeRequest = request;
    });
}

module.exports = {
    showMiniDetails: showMiniDetails
};
