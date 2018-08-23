const helpers = {
    cssActive: function (applies) {
        return applies ? "active" : "";
    },
    cssDisabled: function (applies) {
        return applies ? "disabled" : "";
    },
    cssLoading: function (applies) {
        return applies ? "show-loader" : "";
    }
};

export default helpers;
