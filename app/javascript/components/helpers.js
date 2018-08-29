const helpers = {
    cssActive: function (applies) {
        return applies ? "active" : "";
    },
    cssDisabled: function (applies) {
        return applies ? "disabled" : "";
    },
    cssShowLoader: function (applies) {
        return applies ? "show-loader" : "";
    },
    handlePlural(value) {
        return value === 1 ? "" : "s";
    }
};

export default helpers;
