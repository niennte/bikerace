const helpers = {
    cssActive: function (applies) {
        return applies ? "active" : "";
    },
    cssDisabled: function (applies) {
        return applies ? "disabled" : "";
    },
    cssInvalid: function (applies) {
        return applies ? "alert alert-warning" : "";
    },
    cssValidation: function (applies) {
        return applies ? "is-invalid" : "is-valid";
    },
    cssShowLoader: function (applies) {
        return applies ? "show-loader" : "";
    },
    handlePlural(value) {
        return value === 1 ? "" : "s";
    }
};

export default helpers;
