"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotExpired = isNotExpired;
function isNotExpired(expiryMonth, expiryYear) {
    if (!expiryMonth || !expiryYear)
        return true;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var now = currentYear * 100 + currentMonth;
    var expiry = expiryYear * 100 + expiryMonth;
    return expiry >= now;
}
