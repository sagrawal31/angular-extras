'use strict';

/* Specific to our personal use across projects */

angular.module('angular.extras.thirdparty.services').factory('SweetAlertService', ['SweetAlert', function (SweetAlert) {

  return {
    swal: SweetAlert.swal,
    success: SweetAlert.success,
    error: SweetAlert.error,
    warning: SweetAlert.warning,
    info: SweetAlert.info,
    showInputError: SweetAlert.showInputError,
    close: SweetAlert.close,
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
    },
    confirmDanger: function (title, config, onConfirm, onFailure) {
      config = angular.extend({}, {type: 'error', confirmButtonClass: 'btn-danger'}, config);
      this.confirm(title, config, onConfirm, onFailure);
    }
  };
}]);