'use strict';

/* Specific to our personal use across projects */

angular.module('angular.extras.thirdparty.services').factory('SweetAlertService', ['SweetAlert', function (SweetAlert) {

  return {
    // Common method to show a confirmation dialog
    confirm: function (title, config, onConfirm, onFailure) {
      var baseConfig = {
        title: title,
        type: 'info',
        showCancelButton: true,
        confirmButtonClass: 'btn-info',
        confirmButtonText: 'Yes'
      };

      angular.extend(baseConfig, config);

      SweetAlert.swal(baseConfig, function (confirmed) {
        if (confirmed && onConfirm) {
          onConfirm();
        } else if (!confirmed && onFailure) {
          onFailure();
        }
      });
    }
  };
}]);