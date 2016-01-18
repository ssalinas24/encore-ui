/**
 * @namespace
 */
exports.rxFloatingHeader = {
    /**
     * @deprecated Use rxMisc.scrollToElement
     * @description
     * **ALIASED**: Plese use {@link rxMisc.scrollToElement} instead.
     * This function will be removed in a future release of the framework.
     */
    scrollToElement: function (elem) {
        return encore.rxMisc.scrollToElement(elem);
    },

    /**
     * @deprecated Use rxMisc.compareYLocations
     * @description
     * **ALIASED**: Plese use {@link rxMisc.compareYLocations} instead.
     * This function will be removed in a future release of the framework.
     */
    compareYLocations: function (e1, e2) {
        return encore.rxMisc.compareYLocations(e1, e2);
    },

    /**
     * @deprecated Use rxMisc.compareXLocations
     * @description
     * **ALIASED**: Plese use {@link rxMisc.compareXLocations} instead.
     * This function will be removed in a future release of the framework.
     */
    compareXLocations: function (e1, e2) {
        return encore.rxMisc.compareXLocations(e1, e2);
    },

    /**
     * @deprecated Use rxMisc.transformLocation
     * @description
     * **ALIASED**: Plese use {@link rxMisc.transformLocation} instead.
     * This function will be removed in a future release of the framework.
     */
    transformLocation: function (elementOrLocation, attribute) {
        return encore.rxMisc.transformLocation(elementOrLocation, attribute);
    }
};
