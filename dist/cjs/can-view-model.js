/*can-view-model@4.0.0-pre.0#can-view-model*/
'use strict';
var domData = require('can-util/dom/data/data');
var SimpleMap = require('can-simple-map');
var ns = require('can-namespace');
var getDocument = require('can-util/dom/document/document');
var isArrayLike = require('can-util/js/is-array-like/is-array-like');
var canReflect = require('can-reflect');
module.exports = ns.viewModel = function (el, attr, val) {
    var scope;
    if (typeof el === 'string') {
        el = getDocument().querySelector(el);
    } else if (isArrayLike(el) && !el.nodeType) {
        el = el[0];
    }
    if (canReflect.isObservableLike(attr) && canReflect.isMapLike(attr)) {
        return domData.set.call(el, 'viewModel', attr);
    }
    scope = domData.get.call(el, 'viewModel');
    if (!scope) {
        scope = new SimpleMap();
        domData.set.call(el, 'viewModel', scope);
    }
    switch (arguments.length) {
    case 0:
    case 1:
        return scope;
    case 2:
        return canReflect.getKeyValue(scope, attr);
    default:
        canReflect.setKeyValue(scope, attr, val);
        return el;
    }
};